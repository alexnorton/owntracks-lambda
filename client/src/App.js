import React, { Component } from 'react';

import Loading from './Loading';
import ScatterMap from './LineMap';
import LineMap from './LineMap';

class App extends Component {
  state = {};

  async componentDidMount() {
    this.setState({
      isLoading: true,
      progress: { total: 0, loaded: 0 },
      view: 'scatter',
    });

    const req = await fetch('/api/list');
    const dates = await req.json();

    this.setState({ progress: { total: dates.length, loaded: 0 } });

    const data = await Promise.all(
      dates.map(date =>
        fetch(`/api/get/${date}`)
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
      .sort((a, b) => a.date - b.date);

    this.setState({
      isLoading: false,
      progress: undefined,
      data: transformedData,
    });
  }

  render() {
    const { isLoading, progress, data, view } = this.state;

    if (isLoading) {
      return <Loading progress={progress} />;
    }

    if (data) {
      if (view === 'scatter') {
        return <LineMap data={data} />;
      }
      if (view === 'line') {
        return <ScatterMap data={data} />;
      }
    }

    return null;
  }
}

export default App;
