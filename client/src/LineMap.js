import React from 'react';

import { StaticMap } from 'react-map-gl';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import DeckGL, { LineLayer } from 'deck.gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const initialViewState = {
  latitude: 51.507222,
  longitude: -0.1275,
  zoom: 10,
};

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
    };
  }

  handleViewportChange = viewport => this.setState({ viewport });

  render() {
    const { data } = this.state;

    return (
      <AutoSizer>
        {({ height, width }) => (
          <DeckGL
            initialViewState={initialViewState}
            controller={true}
            width={width}
            height={height}
          >
            <LineLayer
              id="line-layer"
              data={data}
              getSourcePosition={d => d.from}
              getTargetPosition={d => d.to}
              getWidth={1.5}
              getColor={[0, 123, 255, 255]}
            />
            <StaticMap
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            />
          </DeckGL>
        )}
      </AutoSizer>
    );
  }
}

export default Map;
