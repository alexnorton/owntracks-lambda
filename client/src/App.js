import React from 'react';

import turfDistance from '@turf/distance';

import useData from './useData';
import Loading from './Loading';
import Map from './Map';

const MAX_DISTANCE = 100;

function App() {
  const { isLoading, total, loaded, data } = useData();

  if (isLoading) {
    return <Loading progress={{ total, loaded }} />;
  }

  if (!data) {
    return null;
  }

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

  return <Map data={transformedData} />;
}

export default App;
