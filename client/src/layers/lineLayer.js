import { LineLayer } from 'deck.gl';

const lineLayer = data => {
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
    getWidth: 1.5,
    getColor: [0, 123, 255, 255],
  });
};

export default lineLayer;
