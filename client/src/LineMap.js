import React from 'react';

import ReactMapGL from 'react-map-gl';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import DeckGL, { LineLayer } from 'deck.gl';

import 'mapbox-gl/dist/mapbox-gl.css';

class Map extends React.Component {
  constructor(props) {
    super(props);

    const data = props.data
      .map((point, index, points) => ({
        from: point.position,
        to: points[index + 1] && points[index + 1].position,
      }))
      .filter(({ from, to }) => from && to);

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
              <LineLayer
                data={data}
                getSourcePosition={d => d.from}
                getTargetPosition={d => d.to}
                getStrokeWidth={1.5}
                getColor={[0, 123, 255, 255]}
              />
            </DeckGL>
          </ReactMapGL>
        )}
      </AutoSizer>
    );
  }
}

export default Map;
