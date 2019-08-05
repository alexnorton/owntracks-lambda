import { ScatterplotLayer } from 'deck.gl';

const scatterplotLayer = data => {
  const layerData = data.map((point, index, points) => ({
    ...point,
    duration: points[index + 1] && (points[index + 1].date - point.date) / 1000,
  }));

  return new ScatterplotLayer({
    data: layerData,
    radiusMinPixels: 3,
    getRadius: ({ duration }) => Math.min(duration / 100, 50),
    getFillColor: () => [255, 0, 0, 32],
  });
};

export default scatterplotLayer;
