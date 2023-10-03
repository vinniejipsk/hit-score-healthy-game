///////// d05v01 //////////

////// Define my constants ///////

// Create my canvas.
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext("2d");

// Bring in the HTML elements.
const hitpoint = document.getElementById('hitpointT');
const scoreboard = document.getElementById('scoreT');
const resetbutton = document.querySelector('.resetButton');

// Transfer the width and height from html into variables.
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Create player, enemy and point variable.
let player;
let enemyProjectiles = [];
let pointSpawn = [];

// Create variable for the reset interval (enemy projectile).
let enemySpawnInterval;

// Create a game over variable.
let gameOver = false;

// Set the camera position.
let cameraX = 0;
let cameraY = 0;

/// Functions ////

// Draw the player.
function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(
        player.x - cameraX - player.width / 2, 
        player.y - cameraY - player.height / 2,
        player.width, player.height,
    );
}
// Draw enemy projectiles.
function drawEnemyProjectile() {
    for (let i = 0; i < enemyProjectiles.length; i++) {
        const projectile = enemyProjectiles[i];
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(
            projectile.x - cameraX, 
            projectile.y - cameraY, 
            projectile.radius, 
            0, Math.PI * 2);
        ctx.fill();
    }
}
// Draw the points.
function drawPointSpawn() {
    for (const point of pointSpawn) {
    // For collision purpose:
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
            ctx.fillStyle = "green";
            ctx.beginPath();
            ctx.arc(
                point.x - cameraX, 
                point.y - cameraY, 
                point.radius, 
                0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }
    }
}

// Function to generate a single random projectile on the canvas.
function singleEnemyProjectile() {
    //Set the enemy speed.
    let projectileSpeed = 0.85;
    // Set the randomize spawn placement.
    const x = Math.random() * canvasWidth * 5;
    const y = Math.random() * canvasHeight * 5;
    const dx = (player.x - x) / canvasWidth * (Math.random() * projectileSpeed);
    const dy = (player.y - y) / canvasHeight * (Math.random() * projectileSpeed);

    // Set initial current time.
    const creationTime = Date.now();

    enemyProjectiles.push({
        x,
        y,
        radius: 5,
        dx,
        dy,
        creationTime,
    });
}
// Function to generate a random projectiles on the canvas.
function generateEnemyProjectiles() {
    const enemyProjectiles = [];
    for (let i = 0; i < 50; i++) {
        enemyProjectiles.push(singleEnemyProjectile());
    }
    return enemyProjectiles;
}

// Function to generate a single random point on the canvas.
function singlePointSpawn() {
    const point = {
      x: Math.random() * canvasWidth * 8,
      y: Math.random() * canvasHeight * 8,
      radius: 10,
    };
    pointSpawn.push(point);
}
// Function to generate mutiple random points on the canvas. 
function generatePointSpawn() {
    const pointSpawns = [];
    // Generate how many points on the start.
    for (let i = 0; i < 1000; i++) {
        pointSpawns.push(singlePointSpawn());
    }
    return pointSpawns;
}
// Function that helps to update every interval.
function updateProjectiles() {
    const currentTime = Date.now();

    for (let i = 0; i < enemyProjectiles.length; i++) {
        const projectile = enemyProjectiles[i];
        projectile.x += projectile.dx;
        projectile.y += projectile.dy;

        // Set the projectiles lifespan.
        const timeElapsed = currentTime - projectile.creationTime;

        if (timeElapsed >= 20000) {
            enemyProjectiles.splice(i, 1);
            i--;
        } else {
            // Check for collision with the player using Math square root.
            const dx = projectile.x - player.x;
            const dy = projectile.y - player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < player.width / 2 + projectile.radius) {
                // Player is hit by the projectile, minus 10 HP.
                player.hitpoint -= 10;

                // Remove the projectile that hit the player.
                enemyProjectiles.splice(i, 1);
                i--;
            }
        }
    }
}


////// Initialize! //////
initialize() 

function initialize() {
    player = {
        x: canvasWidth / 2,
        y: canvasHeight / 2,
        width: 30,
        height: 30,
        speed: 3,
        score: 0,
        hitpoint: 10,
    };

    // Clear all points from previous game.
    pointSpawn.length = 0;

    // Clear the enemy projectiles array.
    enemyProjectiles.length = 0;

    // Clear the previous enemy spawn interval if it exists.
    if (enemySpawnInterval) {
        clearInterval(enemySpawnInterval);
    }
    
    // Set up a new interval for generating enemy projectiles.
    enemySpawnInterval = setInterval(generateEnemyProjectiles, 2000);

    // Add in the total point spawns.
    generatePointSpawn();

    // Set back the text button.
    resetbutton.innerHTML = 'Reset Game';

    drawPlayer();
    drawPointSpawn();
    drawEnemyProjectile();
    updateProjectiles();

}

function update() {
    if (gameOver) {
        return;
    }
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

    // Minus 10 numbers to player hitpoint if player hits a enemy projectile.
    hitpoint.innerHTML = `${player.hitpoint}`

    // If player hitpoints becomes 0, the player loser text displayed.
    if (player.hitpoint <= 0) {
        // Set the game over to true.
        gameOver = true; 
        // Message of "You Lose! comes out"
        ctx.fillStyle = "red";
        ctx.font = "100px Arial";
        ctx.fillText('YOU LOSE', canvasWidth / 2 - 250, canvasHeight / 2 + 25);
        ctx.fillStyle = "grey";
        ctx.font = "25px Arial";
        ctx.fillText('Restart the game!', canvasWidth / 2 - 100, canvasHeight / 2 + 80);
        // Remove all enemies,points and player.

        return;
    }

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
 // Reset the game over state
    initialize();
    if (gameOver) {
        gameOver = false;
        update();
    }
});

////// It will keep on updating the game constantly. //////
update();