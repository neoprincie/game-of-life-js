let pageWidth = () => {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
};

let running = false;

let createTable = () => {
  let numberWide = document.querySelector(`#numberOfCellsWide`).value;
  let numberHigh = document.querySelector(`#numberOfCellsHigh`).value;
  createTableWith(numberWide, numberHigh);
};

let step = () => {
  for (i in Grid) {
    for (j in Grid[i]) {
      Grid[i][j].step(Grid);
    }
  }

  for(i in Grid) {
      for(j in Grid[i]) {
          Grid[i][j].apply();
      }
  }
};

let flipElement = (element) => {
    let liveOrDie = element.className.indexOf(`live`) > -1 ? `die` : `live`;
    element.setAttribute("class", liveOrDie);
};

let randomAssign = (element) => {
  var sparseness = Number(document.querySelector(`#sparseness`).value);
  let set = Math.random() < sparseness / 100;
  if (set) element.setAttribute("class", "live");
  else element.setAttribute("class", "dead");
};

let createTableWith = (x, y) => {
  let table = document.querySelector(`#conwayTable`);
  let tableBody = table.querySelector(`tbody`);
  let widthPerCell = (pageWidth() * 0.8) / x;

  table.removeChild(tableBody);

  let newTableBody = document.createElement(`tbody`);
  table.appendChild(newTableBody);

  Grid = [];

  range(y, i => {
    let row = document.createElement(`tr`);
    newTableBody.appendChild(row);

    Grid[i] = [];

    range(x, j => {
      let newCell = document.createElement(`td`);
      newCell.setAttribute(`id`, `${j}_${i}_cell`);
      newCell.setAttribute(
        `style`,
        `width:${widthPerCell}px; height:${widthPerCell}px`
      );
      let cell = row.appendChild(newCell);
      Grid[i][j] = new Cell(j, i, cell);
      newCell.onclick = () => {
        flipElement(cell);
      };
      randomAssign(newCell);
    });
  });

  Grid = transpose(Grid);
};


let randomlyGenerateBoard = () => {
  for (i in Grid) {
    for (j in Grid[i]) {
      randomAssign(Grid[i][j].element);
    }
  }
};

let range = (num, func) => Array.from({ length: Number(num) }, (a, i) => func(i));
let transpose = (anArray) => anArray[0].map((col, i) => anArray.map(row => row[i]));
let start = () => { running = true; };
let pause = () => { running = false; };
let sleep = ms => new Promise(r => setTimeout(r, ms));

let runGame = async () => {
  while (1) {
    if (running) {
      step();
    }
    let userSpeed = (100 / Number(document.querySelector("#speed").value)) * 20;

    await sleep(userSpeed);
  }
};

runGame();
