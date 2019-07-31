import React, { Component } from 'react';

import Loading from './Loading';
import Map from './Map';

const API_ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? '/api'
    : process.env.REACT_APP_API_ENDPOINT;

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

    this.setState({
      isLoading: false,
      progress: undefined,
      data,
    });
  }

  render() {
    const { isLoading, progress, data } = this.state;

    return (
      <div className="container">
        {isLoading && <Loading progress={progress} />}
        {data && <Map data={data} />}
      </div>
    );
  }
}

export default App;
