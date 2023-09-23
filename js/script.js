/////// Define my constants ///////

// Create my canvas.
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext("2d");

// Transfer the width and height from html into variables.
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Set the player character in the center of the screen and movement speed.
const player = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    width: 30,
    height: 30,
    speed: 5
};

// Set the camera position.
let cameraX = 0;
let cameraY = 0;

// Fill empty array into the projectiles variable.
const projectiles = [];

/////// Functions ///////

// // Initialize.
// initialize();

// function initialize() {
    
// }

// Draw the player out.
function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(
        player.x - cameraX - player.width / 2,
        player.y - cameraY - player.height / 2,
        player.width,
        player.height
    );
}

// Draw the projectiles
function drawProjectiles() {
    ctx.fillStyle = "green";
    for (const proj of projectiles) {
        ctx.fillRect(
        proj.x - cameraX,
        proj.y - cameraY,
        proj.width,
        proj.height
        );
    }  
}

// Function to generate random projectiles
function generateProjectiles() {
    const proj = {
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      width: 20,
      height: 20,
    };
    projectiles.push(proj);
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
    
    // Generate new projectiles as the number needed
    while (projectiles.length < 25) {
        generateProjectiles();
    }
  
    // Clear the canvas to remove artifacts, previous frames.
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
    drawPlayer();
    drawProjectiles();
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