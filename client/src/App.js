import React, { Component } from 'react';

import Map from './Map';

class App extends Component {
  state = {};

  async componentDidMount() {
    const req = await fetch('/api/list');
    const dates = await req.json();

    const data = await Promise.all(
      dates.map(date =>
        fetch(`/api/get/${date}`).then(dateReq => dateReq.json())
      )
    );

    this.setState({
      data,
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        {this.state.data && <Map data={this.state.data} />}
      </div>
    );
  }
}

export default App;
