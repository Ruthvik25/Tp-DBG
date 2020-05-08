const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d")
const box = 25;
const canvasSize = 20;
let score = 0;
let scoreSound = new Audio();
let moveSound = new Audio();
let overSound = new Audio();

scoreSound.src = "music/move.mp3"
moveSound.src = "music/score.mp3"
overSound.src = "music/game-over.mp3"

window.addEventListener("resize", resizeW);
function resizeW() {
    if(window.innerWidth < 550) {
        canvas.style.width = "252px";
        canvas.style.height = "252px";
    }
    else {
        canvas.style.width = "525px";
        canvas.style.height = "525px";
    }
}

let snake = [];
snake[0] = {
    x : 1*box,
    y : 1*box
}

let food = {
    x: Math.floor(1 + (Math.random() * (canvasSize-1))) * box,
    y: Math.floor(1 + (Math.random() * (canvasSize-1))) * box
}

let maze = [];
for(let i=0; i<20; i++) {
    if(i<5) {
        maze[i] = {
            x : box*(3),
            y : box*(10+i)
        }
    }
    else if(i<10) {
        maze[i] = {
            x : box*(3+(i-5)),
            y : box*(15)
        }
    }
    else if(i<15) {
        maze[i] = {
            x : box*(17),
            y : box*(10-(i-10))
        }
    }
    else {
        maze[i] = {
            x : box*(17-(i-15)),
            y : box*(5)
        }
    }
}

let dir;
document.addEventListener('keydown', direction);

function up() {
    if(dir != "Down") {
        dir = "Up";
        moveSound.play();
    }
}
function left() {
    if(dir != "Right") {
        dir = "Left";
        moveSound.play();
    }
}
function down() {
    if(dir != "Up") {
        dir = "Down";
        moveSound.play();
    }
}
function right() {
    if(dir != "Left") {
        dir = "Right";
        moveSound.play();
    }
}

function direction(event) {
    if(event.keyCode == 37)
        left();
    if(event.keyCode == 38)
        up();
    if(event.keyCode == 39)
        right();
    if(event.keyCode == 40)
        down();
}

let speedBtn = document.getElementById("speedBtn");
let displaySpeed = document.getElementById("displaySpeed");
let selected, speedBtnClk = true;
let game;

speedBtn.addEventListener("click", speed);

function speed() {
    let selected = document.querySelector('input[type="radio"]:checked');
    displaySpeed.innerText = "Speed : " + selected.value;

    game = gameSpeed();
}

function gameSpeed() {
    selected = document.querySelector('input[type="radio"]:checked');
    if(selected.value == "8x") {
        game = setInterval(draw, 25);
    }
    else if(selected.value == "4x") {
        game = setInterval(draw, 50);
    }
    else if(selected.value == "2x") {
        game = setInterval(draw, 100);
    }
    else {
        game = setInterval(draw, 200);
    }
    speedBtnClk = false;
    return game;
}

if(speedBtnClk === true) {
    game = gameSpeed();
}

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
    ctx.fillRect(food.x, food.y, box, box);

    for(let j=0; j<20; j++) {
        ctx.fillStyle = "black";
        ctx.fillRect(maze[j].x, maze[j].y, box, box);
    }

    if(snakeX == food.x && snakeY == food.y)
    {
        score += 1;
        scoreSound.play();
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

    let c = collision(food, maze);
    if(c) {
        food = {
            x: Math.floor(1 + (Math.random() * (canvasSize-1))) * box,
            y: Math.floor(1 + (Math.random() * (canvasSize-1))) * box
        }
    }

    
    if (snakeX<box || snakeX>(canvasSize-1)*box || snakeY<box || snakeY>(canvasSize-1)*box || collision(newHead, snake) || collision(newHead, maze)) {
        clearInterval(game);
		game = 1;
		clearInterval(game);
        overSound.play();

    }

    snake.unshift(newHead);

    document.getElementById("displayScore").innerHTML = "Score : " + score;
}
    
        
        
const reload = document.querySelector("#reload");
reload.addEventListener("click", refresh);

function refresh() {
    location.reload();
}
