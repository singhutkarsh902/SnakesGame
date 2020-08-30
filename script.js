var canvas = document.getElementById("snake");
var ctx = canvas.getContext("2d");
//console.log(canvas);

const grid = 32;
let snake = [];

const foodImg = new Image();
foodImg.src = "food.png";

snake[0] = {
    x : 9 * grid,
    y : 8 * grid
};

let food = {
    x : Math.floor(Math.random()*17 + 1) * grid,
    y : Math.floor(Math.random()*15 + 1) * grid
}

let d;
document.addEventListener("keydown", (e) => {
    let key = e.keyCode;
    if(key == 37 && d != "right") d="left";
    else if (key == 38 && d != "down") d = "up";
    else if (key == 39 && d != "left") d = "right";
    else if(key == 40 && d != "up") d = "down";
    console.log(d);
});

setInterval(() => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 608, 544);
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, 608, 32);
    ctx.fillRect(0, 0, 32, 544);
    ctx.fillRect(576, 0, 32, 544);
    ctx.fillRect(0, 512, 608, 32);

    for (let i = 0; i < snake.length; i++) {
        if (i == 0) ctx.fillStyle = "red";
        else ctx.fillStyle = "black";

        ctx.fillRect(snake[i].x, snake[i].y, grid, grid);

        ctx.strokeStyle = "white";
        ctx.strokeRect(snake[i].x, snake[i].y, grid, grid);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    let headX = snake[0].x;
    let headY = snake[0].y;
    if (d === "left") headX -= grid;
    if (d == "up") headY -= grid;
    if (d == "right") headX += grid;
    if (d == "down") headY += grid;     
    
    if(headX == food.x && headY == food.y) {
        food = {
            x: Math.floor(Math.random() * 17 + 1) * grid,
            y: Math.floor(Math.random() * 15 + 1) * grid
        }
    }
    else
        snake.pop();
    let newPos = {
        x : headX,
        y : headY
    }
    snake.unshift(newPos);
}, 100);