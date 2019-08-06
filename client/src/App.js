import React, { Component } from 'react';

import turfDistance from '@turf/distance';

import Loading from './Loading';
import Map from './Map';

const API_ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? '/api'
    : process.env.REACT_APP_API_ENDPOINT;

const MAX_DISTANCE = 100;

class App extends Component {
  state = {};

  async componentDidMount() {
    this.setState({
      isLoading: true,
      progress: { total: 0, loaded: 0 },
    });

    const req = await fetch(`${API_ENDPOINT}/list`);
    const dates = await req.json();

    this.setState({ progress: { total: dates.length, loaded: 0 } });

    const data = await Promise.all(
      dates.map(date =>
        fetch(`${API_ENDPOINT}/get/${date}`)
          .then(dateReq => dateReq.json())
          .then(dateData => {
            this.setState({
              progress: {
                ...this.state.progress,
                loaded: this.state.progress.loaded + 1,
              },
            });
            return dateData;
          })
      )
    );

    const transformedData = []
      .concat(
        ...data.map(dateData =>
          dateData.features.map(feature => ({
            position: feature.geometry.coordinates,
            date: new Date(feature.properties.date),
          }))
        )
      )
      .sort((a, b) => a.date - b.date)
      .reduce((sections, currentLocation, index, locations) => {
        if (index === 0) {
          return [[currentLocation]];
        }

        const lastLocation = locations[index - 1];

        const distance = turfDistance(
          currentLocation.position,
          lastLocation.position
        );

        if (distance > MAX_DISTANCE) {
          return [...sections, [currentLocation]];
        }

        return [
          ...sections.slice(0, sections.length - 1),
          [...sections[sections.length - 1], currentLocation],
        ];
      }, []);

    this.setState({
      isLoading: false,
      progress: undefined,
      data: transformedData,
    });
  }

  render() {
    const { isLoading, progress, data } = this.state;

    if (isLoading) {
      return <Loading progress={progress} />;
    }

    if (data) {
      return <Map data={data} />;
    }

    return null;
  }
}

export default App;
