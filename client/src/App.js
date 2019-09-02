import React, { useState } from 'react';

import useData from './useData';
import Loading from './Loading';
import Map from './Map';

import lineLayer from './layers/lineLayer';
import scatterplotLayer from './layers/scatterplotLayer';

import maxDistanceFilter from './filters/maxDistanceFilter';

const layers = {
  lineLayer,
  scatterplotLayer,
};

function App() {
  const { isLoading, total, loaded, data } = useData();

  const [layersState] = useState(
    Object.keys(layers).reduce((previous, layerKey) => {
      const { optionsSchema } = layers[layerKey];
      return {
        ...previous,
        [layerKey]: Object.keys(optionsSchema).reduce(
          (previous, optionKey) => ({
            ...previous,
            [optionKey]: optionsSchema[optionKey].default,
          }),
          {}
        ),
      };
    }, {})
  );

  if (isLoading) {
    return <Loading progress={{ total, loaded }} />;
  }

  if (!data) {
    return null;
  }

  const transformedData = maxDistanceFilter(data);

  const mapLayers = Object.keys(layers).map(layerKey =>
    layers[layerKey].layerFunction(data, layersState[layerKey])
  );

  return (
    <>
      <Map data={transformedData} layers={mapLayers} />
    </>
  );
}

export default App;
