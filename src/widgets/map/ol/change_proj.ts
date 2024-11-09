interface Coordinates {
  longitude: number;
  latitude: number;
}

const earthRadius = 6378137;

export function fromEPSG4326toEPSG3857(coordinates: Coordinates): Coordinates {
  console.log(earthRadius * Math.PI);
  return {
    longitude: (coordinates.longitude * earthRadius * Math.PI) / 180,
    latitude:
      ((Math.log(Math.tan(((90 + coordinates.latitude) * Math.PI) / 360)) /
        (Math.PI / 180)) *
        earthRadius *
        Math.PI) /
      180,
  };
}

export function fromEPSG3857toEPSG4326(coordinates: Coordinates): Coordinates {
  return {
    longitude: (coordinates.longitude * 180) / (earthRadius * Math.PI),
    latitude:
      (Math.atan(
        Math.pow(
          Math.E,
          ((coordinates.latitude * 180) / (earthRadius * Math.PI)) *
            (Math.PI / 180),
        ),
      ) *
        360) /
        Math.PI -
      90,
  };
}

export function fromCoordsToArray(coordinates: Coordinates): number[] {
  return [coordinates.longitude, coordinates.latitude];
}

export function fromArrayToCoords(coordinates: number[]): Coordinates {
  return {
    latitude: coordinates[0],
    longitude: coordinates[1],
  };
}
