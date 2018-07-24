var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

var cities = [];

var totalCities = 12;
var popSize = 500;

var population = [];
var fitness = [];


var recordDistance = Infinity;
var bestEver;
var currentBest;

let finished = false;

function setup () {
  canvas.width = 800;
  canvas.height = 800;

  let order = [];

  for (let i = 0; i < totalCities; i++) {
    cities[i] = {
      x: Math.floor(Math.random() * canvas.width),
      y: Math.floor(Math.random() * canvas.height / 2)
    }
    order[i] = i;
  }

  for (let i = 0; i < popSize; i++) {
    population[i] = order.slice();

    shuffle(population[i], 100);
  }

  
}

function draw () {

  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height)

  // GA
  calcFitness();
  normalizeFitness();
  nextGeneration();


  // draw points on the canvas
  context.strokeStyle = "white";
  for (let i = 0; i < totalCities; i++) {
    context.beginPath();
    context.lineWidth = 1;
    context.arc(cities[i].x, 
      cities[i].y,
      8, 0, 2*Math.PI);
    context.stroke()
    context.closePath();
  }

  // draw the best line
  context.beginPath();
  context.strokeStyle = "purple";
  context.lineWidth = 5;
  context.moveTo(cities[0].x, cities[0].y);
  for (let i = 0; i < bestEver.length; i++) {
    var n = bestEver[i];
    context.lineTo(cities[n].x, cities[n].y)
    context.stroke()
  }
  context.closePath();

  // draw the current best line
  context.translate(0, canvas.height / 2)
  context.beginPath();
  context.strokeStyle = "white";
  context.lineWidth = 1;
  context.moveTo(cities[0].x, cities[0].y);
  for (let i = 0; i < currentBest.length; i++) {
    var n = currentBest[i];
    context.lineTo(cities[n].x, cities[n].y)
    context.stroke()
  }
  context.closePath();
  context.setTransform(1, 0, 0, 1, 0, 0);


  if (!finished) {
    window.requestAnimationFrame(draw);
  }
}


function shuffle(a, num) {
  for (var i = 0; i < num; i++) {
    var indexA = Math.floor(Math.random() * a.length)
    var indexB = Math.floor(Math.random() * a.length)
    swap(a, indexA, indexB);
  }
}

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

// return total distance between every
// point in the array
function calcDistance(points, order) {
  var sum = 0;
  for (let i = 0; i < order.length-1; i++) {
    var cityAIndex = order[i]
    var cityA = points[cityAIndex];
    var cityBIndex = order[i+1];
    var cityB = points[cityBIndex];

    var d = dist(
      cityA.x,
      cityA.y,
      cityB.x,
      cityB.y
    );

    sum += d;
  }
  return sum;
}

function dist (x1, y1, x2, y2) {
  return Math.sqrt(
    Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2)
  )
}

setup();

window.requestAnimationFrame(draw)
