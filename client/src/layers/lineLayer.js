import { LineLayer } from 'deck.gl';

const optionsSchema = {
  color: {
    type: 'color',
    default: [0, 123, 255, 255],
  },
  width: {
    type: 'number',
    default: 1.5,
  },
};

const layerFunction = (data, { color, width }) => {
  const layerData = [].concat(
    ...data.map(section =>
      section
        .map((point, index, points) => ({
          from: point.position,
          to: points[index + 1] && points[index + 1].position,
        }))
        .filter(({ from, to }) => from && to)
    )
  );

  return new LineLayer({
    id: 'line-layer',
    data: layerData,
    getSourcePosition: d => d.from,
    getTargetPosition: d => d.to,
    getWidth: width,
    getColor: color,
  });
};

export default {
  optionsSchema,
  layerFunction,
};
