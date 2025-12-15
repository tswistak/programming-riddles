/**
 * @param {Array<Object>} data - The data to draw the table
 * @param {string} sortBy - The field to sort the table
 * @returns {string}
 */
function drawTable(data, sortBy) {
  const sortedData = data.toSorted((a, b) => {
    if (typeof a[sortBy] === "number" && typeof b[sortBy] === "number") {
      return a[sortBy] - b[sortBy];
    }
    return String(a[sortBy]).localeCompare(String(b[sortBy]));
  });
  const maxLengths = data.reduce((acc, curr) => {
    for (const [key, value] of Object.entries(curr)) {
      const currLength = acc.get(key) ?? 0;
      const valLength = String(value).length;
      if (currLength < valLength) {
        acc.set(key, valLength);
      }
    }
    return acc;
  }, new Map());
  const nameToLetterMapping = new Map();
  let currentLetter = 65;
  for (const key of Object.keys(data[0])) {
    nameToLetterMapping.set(String.fromCharCode(currentLetter), key);
    currentLetter++;
  }
  const sortedNames = [...nameToLetterMapping].sort((a, b) => a[0] - b[0]);
  const divider =
    "+" +
    sortedNames.map((x) => "-".repeat(maxLengths.get(x[1]) + 2)).join("+") +
    "+";
  const header =
    "|" +
    sortedNames
      .map((x) => " " + x[0] + " ".repeat(maxLengths.get(x[1])))
      .join("|") +
    "|";
  const result = [divider, header, divider];
  for (const row of sortedData) {
    const rowStr = [];
    for (const [letter, key] of sortedNames) {
      const value = String(row[key]);
      rowStr.push(
        " " + value + " ".repeat(maxLengths.get(key) - value.length) + " ",
      );
    }
    result.push("|" + rowStr.join("|") + "|");
  }
  result.push(divider);
  return result.join("\n");
}

drawTable(
  [
    { name: "Charlie", city: "New York" },
    { name: "Alice", city: "London" },
    { name: "Bob", city: "Paris" },
  ],
  "name",
);
// +---------+----------+
// | A       | B        |
// +---------+----------+
// | Alice   | London   |
// | Bob     | Paris    |
// | Charlie | New York |
// +---------+----------+

drawTable(
  [
    { gift: "Book", quantity: 5 },
    { gift: "Music CD", quantity: 1 },
    { gift: "Doll", quantity: 10 },
  ],
  "quantity",
);
// +----------+----+
// | A        | B  |
// +----------+----+
// | Music CD | 1  |
// | Book     | 5  |
// | Doll     | 10 |
// +----------+----+
