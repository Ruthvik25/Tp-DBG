const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d")
const box = 25;
const canvasSize = 20;

let snake = [];
snake[0] = {
    x : 1*box,
    y : 1*box
}

let dir;
document.addEventListener('keydown', direction);

let food = {
    x: Math.floor(1 + (Math.random() * (canvasSize-1))) * box,
    y: Math.floor(1 + (Math.random() * (canvasSize-1))) * box
}

function direction(event) {
    if(event.keyCode == 37 && dir != "Right")
        dir = "Left";
    if(event.keyCode == 38 && dir != "Down")
        dir = "Up";
    if(event.keyCode == 39 && dir != "left")
        dir = "Right";
    if(event.keyCode == 40 && dir != "Up")
        dir = "Down";
}

let score = 0;

function draw() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(box, box, canvasSize*box - box, canvasSize*box - box);

    for(let i=0; i<snake.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    let snakeX =snake[0].x;
    let snakeY =snake[0].y;

    if(dir == "Left")
        snakeX -= box;
    if(dir == "Up")
        snakeY -= box;
    if(dir == "Right")
        snakeX += box;
    if(dir == "Down")
        snakeY += box;
    
    ctx.fillStyle = "red";
    ctx.font = "25px";
    ctx.fillRect(food.x, food.y, box, box);

    if(snakeX == food.x && snakeY == food.y)
    {
        score += 1;
        food = {
            x: Math.floor(1 + (Math.random() * (canvasSize-1))) * box,
            y: Math.floor(1 + (Math.random() * (canvasSize-1))) * box
        }
    }
    else {
        snake.pop();
    }

    let newHead = {
        x : snakeX,
        y : snakeY
    };

    function collision(head, array) {
        for(let i=0; i<array.length; i++) {
            if(head.x == array[i].x  &&  head.y == array[i].y) {
                return 1;
            }
        }
        return 0;
    }
    if (snakeX<box || snakeX>(canvasSize-1)*box || snakeY<box || snakeY>(canvasSize-1)*box || collision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "25px Changa one"
    ctx.clearRect(0,0,50,25);
    ctx.fillText(score, box, 0.8*box);
}

let game = setInterval(draw, 100);

function refresh() {
    location.reload();
}
