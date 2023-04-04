const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const cellsHorizontal = 4;
const cellsVertical = 3;
const width = window.innerWidth;
const height = window.innerHeight;

const unitlengthX = width/cellsHorizontal;
const unitlengthY = height/cellsVertical; 

const engine = Engine.create();
engine.world.gravity.y =0;
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    width,
    height
  }
});
Render.run(render);
Runner.run(Runner.create(), engine);

//Walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 2, height, { isStatic: true })
];
World.add(world, walls);

// Maze generation

const shuffle = (arr) => {
    let counter = arr.length;

    while (counter > 0 ){
        const index = Math.floor(Math.random() * counter);

        counter--;

        const temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }

    return arr;
};

const grid = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

const verticals = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal - 1).fill(false));

const horizontal = Array(cellsVertical - 1)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);

const stepThroughCell = (row,col) => {
    //check if already visited
    if (grid[row][col]){
        return;
    }
    
    //mark that cell as visited
    grid[row][col] = true;
    
    //assemble randomly-ordered list of neighbours
    const neighbours = shuffle([
        [row-1,col,"up"],
        [row,col+1,'right'],
        [row+1,col,'down'],
        [row,col-1,'left']
    ]);
    //for each neighbour...
    for(let neighbour of neighbours){
        const [nextRow, nextColumn, dirction] = neighbour;

        //see if neighbour is out of bound
        if(nextRow < 0 || nextRow >= cellsVertical || nextColumn < 0 || nextColumn >= cellsHorizontal ){
            continue;
        }

        //if we have visited that neighbour then shift to next neighbour
        if(grid[nextRow][nextColumn]){
            continue;
        }
        //remove a wall

        if(dirction === 'left'){
            verticals[row][col-1] = true;
        }else if(dirction === 'right'){
            verticals[row][col] = true;
        }else if(dirction === 'up'){
            horizontal[row-1][col] =true;
        }else {
            horizontal[row][col] =true;
        }

        stepThroughCell(nextRow, nextColumn);
    }
};

stepThroughCell(startRow,startColumn);

horizontal.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if(open){
            return;
        }

        const wall = Bodies.rectangle(
            columnIndex * unitlengthX + unitlengthX/2,
            (rowIndex+1) * unitlengthY,
            unitlengthX,
            10,
            {
                label: 'wall',
                isStatic: true,
                render: {
                    fillStyle: 'red'
                }
            }
        );
        World.add(world, wall);
    });
});

verticals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if(open){
            return;
        }

        const wall = Bodies.rectangle(
            (columnIndex+1) * unitlengthX ,
            rowIndex * unitlengthY + unitlengthY/2,
            10,
            unitlengthY,
            {
                label: 'wall',
                isStatic: true,
                render: {
                    fillStyle: 'red'
                }
            }
        );
        World.add(world, wall);
    });
});


//goal
const goal = Bodies.rectangle(
    width - (unitlengthX/2),
    height - (unitlengthY/2),
    unitlengthX * 0.7,
    unitlengthY * 0.7,
    {
        label: 'goal',
        isStatic : true,
        render: {
            fillStyle: 'green'
        }
    }
);
World.add(world, goal);

//ball

const ballRadius = Math.min(unitlengthX, unitlengthY)/4;
const ball = Bodies.circle(
    unitlengthX/2,
    unitlengthY/2,
    ballRadius,
    {
        label: 'ball',
        render: {
            fillStyle: 'blue'
        }
    }
)
World.add(world,ball);

document.addEventListener('keydown', (event) => {
    const {x, y} = ball.velocity;
    if(event.key === 'ArrowUp'){
        Body.setVelocity(ball, {x,y: y-5})
    }
    if(event.key === 'ArrowRight'){
        Body.setVelocity(ball, {x: x+5,y})
    }
    if(event.key === 'ArrowDown'){
        Body.setVelocity(ball, {x,y: y+5})
    }
    if(event.key === 'ArrowLeft'){
        Body.setVelocity(ball, {x: x-5,y})
    }
})
// win
Events.on(engine, 'collisionStart', event => {
    event.pairs.forEach(collision => {
        const labels = ['ball', 'goal'];

        if(labels.includes(collision.bodyA.label) && labels.includes(collision.bodyB.label)){
            document.querySelector('.winner').classList.remove('hidden');
            world.gravity.y = 1;
            world.bodies.forEach(body => {
                if(body.label === 'wall'){
                    Body.setStatic(body, false);
                }
            })
        }
    })
})
