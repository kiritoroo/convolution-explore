Math.clamp = (value: number, min: number, max: number): number => {
  if (value < min) {
    return min
  } else if (value > max) {
    return max;
  }
  return value;
}

Math.lerp = (start: number, end: number, amt: number): number => {
  return (1 - amt) * start + amt * end;
}

Math.median = (arr: Array<number>): number => {
  arr = arr.filter(val => val !== undefined);
  arr.sort(function(a, b) {
    return a - b;
  });
  let mid = Math.floor(arr.length / 2);
  if (arr.length % 2 === 0) {
    return (arr[mid - 1] + arr[mid]) / 2;
  } else {
    return arr[mid];
  }
}

Math.mularr = (arr1: Array<number>, arr2: Array<number>): Array<number> => {
  if (arr1.length !== arr2.length) {
    throw new Error('Arrays must have same length');
  }
  const result = [];
  for (let i = 0; i < arr1.length; i++) {
    result.push(arr1[i] * arr2[i]);
  }
  return result;
}

Math.minMaxScale = (value: number, min: number, max: number, new_min: number, new_max: number): number => {
  return (value - min) / (max - min) * (new_max - new_min) + new_min
}

Math.randSample = (list: Array<any>, count: number): Array<any> => {
  const _copyList = list.slice();
  const shuffled = _copyList.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

Math.indices1DCenter2Outside = (w: number, h: number): number[] => {
  const center: [number, number] = [Math.floor(w / 2), Math.floor(h / 2)];
  const distances: number[] = [];
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      const distance = Math.sqrt(Math.pow((x - center[0]), 2) + Math.pow((y - center[1]), 2));
      distances.push(distance);
    }
  }
  return distances.map((_, i) => i).sort((a, b) => distances[a] - distances[b]);
}

Math.indices2DCenter2Outside = (w: number, h: number): number[][] => {
  const indices1D = Math.indices1DCenter2Outside(w,h)
  return indices1D.map((index) => [
    Math.floor(index / h),
    index % w,
  ]);
}

Math.indices1DOutsideCenter = (w: number, h: number): number[] => {
  const center: [number, number] = [Math.floor(w / 2), Math.floor(h / 2)];
  const distances: number[] = [];
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      const distance = Math.sqrt(Math.pow((x - center[0]), 2) + Math.pow((y - center[1]), 2));
      distances.push(distance);
    }
  }
  return distances.map((_, i) => i).sort((a, b) => distances[b] - distances[a]);
}

Math.indices2DOutsideCenter = (w: number, h: number): number[][] => {
  const indices1D = Math.indices1DOutsideCenter(w,h)
  return indices1D.map((index) => [
    Math.floor(index / h),
    index % w,
  ]);
}

Math.getIndicesByDistance = (n: number, x: number, y: number, diagonal: boolean): number[] => {
  interface Point {
    x: number;
    y: number;
  }

  function getDistance(a: Point, b: Point): number {
    return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
  }

  const coords: Point[] = Array.from({ length: n * n }, (_, i) => ({
    x: i % n,
    y: Math.floor(i / n),
  }));
  const distances = coords.map((coord, index) => ({
    index,
    distance: diagonal ? getDistance({x, y}, coord) * Math.SQRT2 : getDistance({x, y}, coord),
  }));
  distances.sort((a, b) => a.distance - b.distance);
  return distances.map((d) => d.index);
}

export {};