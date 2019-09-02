import React from 'react';

import { StaticMap } from 'react-map-gl';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import DeckGL from 'deck.gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const initialViewState = {
  latitude: 51.507222,
  longitude: -0.1275,
  zoom: 10,
};

function Map({ layers }) {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <DeckGL
          initialViewState={initialViewState}
          controller={true}
          width={width}
          height={height}
          layers={layers}
        >
          <StaticMap
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          />
        </DeckGL>
      )}
    </AutoSizer>
  );
}

export default Map;
