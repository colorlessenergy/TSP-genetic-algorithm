function calcFitness() {

  var currentRecord = Infinity;

  for (let i = 0; i < population.length; i++) {
    var d = calcDistance(cities, population[i]);
    if (d < recordDistance) {
      recordDistance = d;
      bestEver = population[i]
    }

    if (d < currentRecord) {
      currentRecord = d;
      currentBest = population[i]
    }

    fitness[i] = 1 / (d + 1);
  }
}

function normalizeFitness() {
  var sum = 0;
  for (let i = 0; i < fitness.length; i++) {
    sum += fitness[i]
  }

  for (let i = 0; i < fitness.length; i++) {
    fitness[i] = fitness[i] / sum
  }
}

function nextGeneration() {
  var newPopulation = [];
  for (let i = 0; i < population.length; i++) {
    var orderA = pickOne(population, fitness); 
    var orderB = pickOne(population, fitness);

    var order = crossOver(orderA, orderB)
    mutate(order, 0.01);
    newPopulation[i] = order;
  }

  population = newPopulation;
}

function pickOne(list, prob) {
  let index = 0;
  let r = Math.random();

  while (r > 0) {
    r = r - prob[index];
    index++;
  }
  index--;
  return list[index].slice();
}

function crossOver(orderA, orderB) {
  var start = Math.floor(Math.random() * orderA.length);
  var end = Math.floor(Math.random() * orderA.length) + (start + 1);

  neworder = orderA.slice(start, end);

  for (var i = 0; i < orderB.length; i++) {
    var city = orderB[i];
    if (!neworder.includes(city)) {
      neworder.push(city);
    }
  }

  return neworder;
}

function mutate(order, mutationRate) {
  for (let i = 0; i < totalCities; i++) {
    if (Math.random() < mutationRate) {
      var indexA = Math.floor(Math.random() * order.length);
      var indexB = (indexA + 1) % totalCities;
      swap(order, indexA, indexB);
    }
  }
}