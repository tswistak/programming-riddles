const fs = require("fs");

const tree = new Map(
  fs
    .readFileSync("./everybody_codes_e2024_q06_p2.txt", {
      encoding: "utf-8",
    })
    .split("\n")
    .map((x) => {
      const [key, children] = x.split(":");
      return [key, children.split(",")];
    }),
);

const routes = [];

function dfs(currentRoute) {
  const last = currentRoute.at(-1);
  if (last === "@") {
    routes.push([...currentRoute]);
    return;
  }
  const children = tree.get(last);
  if (children && children.length) {
    for (const child of children) {
      dfs([...currentRoute, child]);
    }
  }
}

dfs(["RR"]);

const byLength = Object.groupBy(routes, (x) => x.length);

const singleRoute = Object.values(byLength)
  .filter((x) => x.length === 1)
  .flat(2)
  .map((x) => x[0])
  .join("");
console.log(singleRoute);
