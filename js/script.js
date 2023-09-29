/////// Define my constants ///////

// Create my canvas.
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext("2d");

// Bring in reset button.
const resetbutton = document.querySelector('.resetButton');

// Bring in the score '0' from the html as a variable.
let scoreboard = document.getElementById('score');

// Transfer the width and height from html into variables.
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Create player variable.
    // Set player status on the start.
        // Set the player character in the center of the screen.
        // Set the player size, hitpoint, score and movement speed.
const player = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    width: 30,
    height: 30,
    speed: 5,
    score: 0,
    hitpoint: 100,
};
// Create enemy variable.
const enemyProjectiles = [];
const projectileSpeed = 2;
const projectileColor = 'red';

// Fill empty array into the projectiles variable.
const pointSpawn = [];

// Set the camera position.
let cameraX = 0;
let cameraY = 0;

/////// Functions ///////

// Draw the player.
function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x - cameraX - player.width / 2, player.y - cameraY - player.height / 2, player.width, player.height,
    );
}
// Draw enemy projectiles
function drawEnemyProjectile() {
    for (let i = 0; i < enemyProjectiles.length; i++) {
        const projectile = enemyProjectiles[i];
        ctx.fillStyle = projectileColor;
        ctx.beginPath();
        ctx.arc(projectile.x - cameraX, projectile.y - cameraY, projectile.radius, 0, Math.PI * 2);
        ctx.fill();
    }
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
            ctx.arc(point.x - cameraX, point.y - cameraY, point.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }
    }
}
function updateProjectiles() {
    for (let i = 0; i < enemyProjectiles.length; i++) {
        const projectile = enemyProjectiles[i];
        projectile.x += projectile.dx;
        projectile.y += projectile.dy;
    }
}
function generateEnemyProjectiles() {
    if (enemyProjectiles.length < 25) {
        const x = Math.random() * canvasWidth;
        const y = Math.random() * canvasHeight;
        const dx = (player.x - x) / canvasWidth * projectileSpeed;
        const dy = (player.y - y) / canvasHeight * projectileSpeed;

        enemyProjectiles.push({
            x,
            y,
            radius: 10,
            dx,
            dy
        });
    }
}
// Function to generate random projectiles on the canvas.
function generatePointSpawn() {
    const point = {
      x: Math.random() * canvasWidth * 8,
      y: Math.random() * canvasHeight * 8,
      radius: 5,
    };
    pointSpawn.push(point);
}
// Set spawnPorjectiles at a certain time.
setInterval(generateEnemyProjectiles, 2000);

// Initialize!
initialize() 

function initialize() {
    // Clear all points from previous game.
    pointSpawn.length = 0;

    // Generate how many points on the start.
    for (let i = 0; i < 1000; i++) {
        generatePointSpawn();
    }
    // Generate how many points on the start.
    for (let i = 0; i < 1000; i++) {
        generateEnemyProjectiles();
    }
    // Set back the text button.
    resetbutton.innerHTML = 'Start Game';
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
  
    // Clear the artifacts of the player, previous frames.
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Add one number to player score if player hits a point.
    scoreboard.innerHTML = `${player.score}`;
  
    drawPlayer();
    drawPointSpawn();
    drawEnemyProjectile();
    updateProjectiles();
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

// function for reset button.
resetbutton.addEventListener('click', () => {
    initialize();
});

////// It will keep on updating the game constantly. //////
update();