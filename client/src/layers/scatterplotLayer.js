import { ScatterplotLayer } from 'deck.gl';

const optionsSchema = {
  radiusMin: {
    type: 'number',
    default: 3,
  },
  radiusFactor: {
    type: 'radiusFactor',
    default: 100,
  },
  color: {
    type: 'color',
    default: [255, 0, 0, 32],
  },
};

const layerFunction = (data, { radiusMin, radiusFactor, color }) => {
  const layerData = [].concat(
    ...data.map(section =>
      section.map((point, index, points) => ({
        ...point,
        duration:
          points[index + 1] && (points[index + 1].date - point.date) / 1000,
      }))
    )
  );

  return new ScatterplotLayer({
    data: layerData,
    radiusMinPixels: radiusMin,
    getRadius: ({ duration }) => Math.min(duration / radiusFactor, 50),
    getFillColor: () => color,
  });
};

export default {
  optionsSchema,
  layerFunction,
};
