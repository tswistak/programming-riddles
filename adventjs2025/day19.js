/**
 * @param {string[][]} routes - Array of [origin, destination] pairs
 * @returns {string[]} The reconstructed route
 */
function revealSantaRoute(routes) {
  const neighbors = new Map(routes);
  let current = routes[0][0];
  const route = [];
  while (current) {
    route.push(current);
    current = neighbors.get(current);
  }
  return route;
}

revealSantaRoute([
  ["MEX", "CAN"],
  ["UK", "GER"],
  ["CAN", "UK"],
]);
// → ['MEX', 'CAN', 'UK', 'GER']

revealSantaRoute([
  ["USA", "BRA"],
  ["JPN", "PHL"],
  ["BRA", "UAE"],
  ["UAE", "JPN"],
  ["CMX", "HKN"],
]);
// → ['USA', 'BRA', 'UAE', 'JPN', 'PHL']

revealSantaRoute([
  ["STA", "HYD"],
  ["ESP", "CHN"],
]);
// → ['STA', 'HYD']
