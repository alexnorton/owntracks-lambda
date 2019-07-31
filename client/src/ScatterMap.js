import React from 'react';

import ReactMapGL from 'react-map-gl';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import DeckGL, { ScatterplotLayer } from 'deck.gl';

import 'mapbox-gl/dist/mapbox-gl.css';

class Map extends React.Component {
  constructor(props) {
    super(props);

    const data = props.data.map((point, index, points) => ({
      ...point,
      duration:
        points[index + 1] && (points[index + 1].date - point.date) / 1000,
    }));

    this.state = {
      data,
      viewport: {
        latitude: 51.507222,
        longitude: -0.1275,
        zoom: 10,
      },
    };
  }

  handleViewportChange = viewport => this.setState({ viewport });

  render() {
    const { viewport, data } = this.state;

    return (
      <AutoSizer>
        {({ height, width }) => (
          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            onViewportChange={this.handleViewportChange}
            height={height}
            width={width}
          >
            <DeckGL {...viewport} width={width} height={height}>
              <ScatterplotLayer
                data={data}
                radiusMinPixels={3}
                getRadius={({ duration }) => Math.min(duration / 100, 50)}
                getColor={() => [255, 0, 0, 32]}
              />
            </DeckGL>
          </ReactMapGL>
        )}
      </AutoSizer>
    );
  }
}

export default Map;
