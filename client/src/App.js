import React from 'react';

import useData from './useData';
import Loading from './Loading';
import Map from './Map';

import maxDistanceFilter from './filters/maxDistanceFilter';

function App() {
  const { isLoading, total, loaded, data } = useData();

  if (isLoading) {
    return <Loading progress={{ total, loaded }} />;
  }

  if (!data) {
    return null;
  }

  const transformedData = maxDistanceFilter(data);

  return <Map data={transformedData} />;
}

export default App;
