import React from 'react';

import { StaticMap } from 'react-map-gl';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import DeckGL from 'deck.gl';

import lineLayer from './layers/lineLayer';
import scatterplotLayer from './layers/scatterplotLayer';

import 'mapbox-gl/dist/mapbox-gl.css';

const initialViewState = {
  latitude: 51.507222,
  longitude: -0.1275,
  zoom: 10,
};

class Map extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <AutoSizer>
        {({ height, width }) => (
          <DeckGL
            initialViewState={initialViewState}
            controller={true}
            width={width}
            height={height}
            layers={[lineLayer(data), scatterplotLayer(data)]}
          >
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
