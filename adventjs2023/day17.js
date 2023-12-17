function optimizeIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const [firstInterval, ...rest] = intervals;
  const newIntervals = [firstInterval];
  for (const interval of rest) {
    const lastInterval = newIntervals.at(-1);
    if (interval[0] <= lastInterval[1]) {
      if (interval[1] > lastInterval[1]) {
        lastInterval[1] = interval[1];
      }
    } else {
      newIntervals.push(interval);
    }
  }
  return newIntervals;
}

optimizeIntervals([
  [5, 8],
  [2, 7],
  [3, 4],
]); // [[2, 8]]

optimizeIntervals([
  [1, 3],
  [8, 10],
  [2, 6],
]); // [[1, 6], [8, 10]]

optimizeIntervals([
  [3, 4],
  [1, 2],
  [5, 6],
]); // [[1, 2], [3, 4], [5, 6]]
