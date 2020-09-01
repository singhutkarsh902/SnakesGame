var canvas = document.getElementById("snake");
var ctx = canvas.getContext("2d");
var displayScore = document.querySelector(".score");
var resetButton = document.querySelector(".reset");
var easyButton = document.querySelector(".easy");
var medButton = document.querySelector(".medium");
var hardButton = document.querySelector(".hard");

const foodImg = new Image();
foodImg.src = "food.png";

const grid = 32;
var score;
let snake;
let food;
let d;
let t = 100;
var game;

document.addEventListener("keydown", (e) => {
    let key = e.keyCode;
    if (key == 37 && d != "right") d = "left";
    else if (key == 38 && d != "down") d = "up";
    else if (key == 39 && d != "left") d = "right";
    else if (key == 40 && d != "up") d = "down";
});


resetButton.addEventListener("click", () => {
    newGame(t);
})

easyButton.addEventListener("click", () => {
    removeSelected();
    easyButton.classList.add("selected");
    t = 125;
    newGame(t);
})

medButton.addEventListener("click", () => {
    removeSelected();
    medButton.classList.add("selected");
    t = 100;
    newGame(t);
})

hardButton.addEventListener("click", () => {
    removeSelected();
    hardButton.classList.add("selected");
    t = 75;
    newGame(t);
})

function newGame(param) {
    newFood();
    newSnake();
    d = null;
    score = 0;
    displayScore.innerHTML = score;
    console.log(param);
    game = setInterval(draw, param);
}
newGame(t);

function newSnake() {
    snake = [];
    snake[0] = {
        x: 9 * grid,
        y: 8 * grid
    };
}

function newFood() {
    food = {
        x: Math.floor(Math.random() * 17 + 1) * grid,
        y: Math.floor(Math.random() * 15 + 1) * grid
    }
}

function collision(array, head) {
    for(let i=0; i<array.length; i++) {
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function draw() {
    newBoard();
    drawSnake();

    let headX = snake[0].x;
    let headY = snake[0].y;
    if (d === "left") headX -= grid;
    if (d == "up") headY -= grid;
    if (d == "right") headX += grid;
    if (d == "down") headY += grid;

    if (headX == food.x && headY == food.y) {
        newFood();
        score++;
        displayScore.innerHTML = score;
    }
    else {
        snake.pop();
    }

    let newPos = {
        x: headX,
        y: headY
    }

    if(headX < grid || headX > 17 * grid || headY < grid || headY > 15 * grid || collision(snake, newPos)) {
        clearInterval(game);
    }

    snake.unshift(newPos);
}

function newBoard() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 608, 544);
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, 608, 32);
    ctx.fillRect(0, 0, 32, 544);
    ctx.fillRect(576, 0, 32, 544);
    ctx.fillRect(0, 512, 608, 32);
    ctx.drawImage(foodImg, food.x, food.y);
}

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        if (i == 0) {
            ctx.fillStyle = "red";
        }
        else {
            ctx.fillStyle = "black";
        }
        ctx.fillRect(snake[i].x, snake[i].y, grid, grid);
    }
}

function removeSelected() {
    easyButton.classList.remove("selected");
    medButton.classList.remove("selected");
    hardButton.classList.remove("selected");
}