const fs = require("fs");

const parseData = (data) => {
  const seeds = data[0]
    .split(": ")[1]
    .split(" ")
    .map((x) => parseInt(x));
  const seedToSoil = [];
  const soilToFertilizer = [];
  const fertilizerToWater = [];
  const waterToLight = [];
  const lightToTemperature = [];
  const temperatureToHumidity = [];
  const humidityToLocation = [];

  const stringToMap = {
    "seed-to-soil map:": seedToSoil,
    "soil-to-fertilizer map:": soilToFertilizer,
    "fertilizer-to-water map:": fertilizerToWater,
    "water-to-light map:": waterToLight,
    "light-to-temperature map:": lightToTemperature,
    "temperature-to-humidity map:": temperatureToHumidity,
    "humidity-to-location map:": humidityToLocation,
  };

  let currentMap = null;
  for (const line of data.slice(1)) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }
    if (trimmed.endsWith(":")) {
      currentMap = stringToMap[trimmed];
    } else {
      currentMap.push(trimmed.split(" ").map((x) => parseInt(x)));
    }
  }

  return {
    seeds,
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  };
};

const mapNumber = (number, map) => {
  for (let i = 0; i < map.length; i++) {
    const [dstStart, srcStart, length] = map[i];
    if (number >= srcStart && number < srcStart + length) {
      return dstStart + (number - srcStart);
    }
  }
  return number;
};

const getLocation = (maps, seed) => {
  let value = seed;
  for (const map of maps) {
    value = mapNumber(value, map);
  }
  return value;
};

function part1(data) {
  const {
    seeds,
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  } = parseData(data);

  const maps = [
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  ];

  let currentMin = Number.MAX_SAFE_INTEGER;
  for (const seed of seeds) {
    currentMin = Math.min(currentMin, getLocation(maps, seed));
  }
  return currentMin;
}

// slow as hell, but works
function part2(data) {
  const {
    seeds,
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  } = parseData(data);

  const maps = [
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  ];

  let currentMin = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < seeds.length; i += 2) {
    const start = seeds[i];
    const length = seeds[i + 1];
    console.log("iteration:", start, length);
    for (let j = 0; j < length; j++) {
      currentMin = Math.min(currentMin, getLocation(maps, start + j));
    }
  }
  return currentMin;
}

const testData = fs
  .readFileSync("./test.txt", { encoding: "utf-8" })
  .split("\n");
const realData = fs
  .readFileSync("./input.txt", { encoding: "utf-8" })
  .split("\n");

console.log(part1(testData));
console.log(part1(realData));
console.log(part2(testData));
console.log(part2(realData));
