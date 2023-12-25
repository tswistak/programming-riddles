function organizeChristmasDinner(dishes) {
  const ingredientToDish = new Map();
  for (const [name, ...ingredients] of dishes) {
    for (const ingredient of ingredients) {
      const arr = ingredientToDish.get(ingredient) || [];
      arr.push(name);
      ingredientToDish.set(ingredient, arr);
    }
  }
  const result = [];
  for (const [ingredient, dishesList] of ingredientToDish) {
    if (dishesList.length > 1) {
      result.push([ingredient, ...dishesList.sort()]);
    }
  }
  result.sort((a, b) => a[0].localeCompare(b[0]));
  return result;
}

const dishes = [
  ["christmas turkey", "turkey", "sauce", "herbs"],
  ["cake", "flour", "sugar", "egg"],
  ["hot chocolate", "chocolate", "milk", "sugar"],
  ["pizza", "sauce", "tomato", "cheese", "ham"],
];

organizeChristmasDinner(dishes);

/*

"sauce" is in 2 dishes: "christmas turkey" and "pizza".
"sugar" is in 2 dishes: "cake" and "hot chocolate".
The rest of the ingredients only appear in one dish, so we do not show them.

We show "sauce" first because alphabetically it comes before "sugar".
And the dishes of each ingredient are also alphabetically ordered.

[
  ["sauce", "christmas turkey", "pizza"],
  ["sugar", "cake", "hot chocolate"]
]
*/
