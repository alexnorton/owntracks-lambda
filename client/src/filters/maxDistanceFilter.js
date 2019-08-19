import turfDistance from '@turf/distance';

const MAX_DISTANCE = 100;

const maxDistanceFilter = data =>
  [].concat(
    ...data.map(section =>
      section.reduce((sections, currentLocation, index, locations) => {
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
      }, [])
    )
  );

export default maxDistanceFilter;
