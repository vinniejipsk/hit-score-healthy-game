/////// Define my constants ///////

// Create my canvas.
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext("2d");

// Bring in the score '0' from ther html as a variable.
let scoreboard = document.getElementById('score');

// Transfer the width and height from html into variables.
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Set the player character in the center of the screen.
    // Set the player size and movement speed.
const player = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    width: 30,
    height: 30,
    speed: 5,
    score: 0,
    hitpoint: 100,
};

// Set the camera position.
let cameraX = 0;
let cameraY = 0;

// Fill empty array into the projectiles variable.
const pointSpawn = [];


/////// Functions ///////

// Draw the player.
function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(
        player.x - cameraX - player.width / 2,
        player.y - cameraY - player.height / 2,
        player.width,
        player.height,
    );
}

// Draw the points
function drawPointSpawn() {
    ctx.fillStyle = "green";
    for (const point of pointSpawn) {
        // Calculate the distance between point and player and put into a variable. 
        const dx = point.x - player.x;
        const dy = point.y - player.y;
        // Using square root and calculate to determine the distance.
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < player.width / 2 + point.radius) {
            // Player score a point
            player.score++;
            // Remove point arc that is collided by player.
                // splice out the point index.
            const index = pointSpawn.indexOf(point);
            if (index !== -1) {
                pointSpawn.splice(index, 1);
            }
        } else {
            // Draw out the point arc
            ctx.beginPath();
            ctx.arc(
                point.x - cameraX,
                point.y - cameraY,
                point.radius,
                0,
                Math.PI * 2,
            );
            ctx.fill();
            ctx.closePath();
        }
    }
}

// Function to generate random projectiles on the canvas.
function generatePointSpawn() {
    const point = {
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      radius: 5,
    };
    pointSpawn.push(point);
}

function update() {
    // Move the player based on player input. Directional keys are set here.
    if (keyPress.ArrowUp) player.y -= player.speed;
    if (keyPress.ArrowDown) player.y += player.speed;
    if (keyPress.ArrowLeft) player.x -= player.speed;
    if (keyPress.ArrowRight) player.x += player.speed;

    // Update the camera position to follow the player.
    cameraX = player.x - canvasWidth / 2;
    cameraY = player.y - canvasHeight / 2;
    
    // Generate new projectiles as the number needed.
    while (pointSpawn.length < 25) {
        generatePointSpawn();
    }
  
    // Clear the artifacts of the player, previous frames.
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Add one number to player score if player hits a point.
    scoreboard.innerHTML = `${player.score}`;
  
    drawPlayer();
    drawPointSpawn();
    requestAnimationFrame(update);
}

////// Event Listensers //////

// function activates when the player presses a directional key button. 
const keyPress = {};
window.addEventListener("keydown", (event) => {
    keyPress[event.key] = true;
});
window.addEventListener("keyup", (event) => {
    keyPress[event.key] = false;
});

////// It will keep on updating the game constantly. //////
update();