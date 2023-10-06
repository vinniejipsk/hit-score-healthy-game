# Get Healthy Stay Healthy
You want to know how to get and stay healthy? 

Play this game to find out what kind of food or drinks to avoid and you must score the points that are healthy for you!

Those nasty food will deduct your hitpoint so beware of it. The game is tough as more and more unhealthy food and drinks will spawn throughout the game.

For now, this game is good for web browser. So enjoy to the fullest!

# Screenshots of the game

This is how it looks like at the start of the game:
![Screenshot1](https://github.com/vinniejipsk/hit-score-healthy-game/blob/main/assets/image/screenshot/screenshot1.jpg)

The nasty food chasing after you:
![Screenshot2](https://github.com/vinniejipsk/hit-score-healthy-game/blob/main/assets/image/screenshot/screenshot2.jpg)

After hitting the timer, this is how you win with your total score accumulated:
![Screenshot3](https://github.com/vinniejipsk/hit-score-healthy-game/blob/main/assets/image/screenshot/screenshot3.jpg)

If your hitpoint goes 0, you will lose:
![Screenshot4](https://github.com/vinniejipsk/hit-score-healthy-game/blob/main/assets/image/screenshot/screenshot4.jpg)

# Technologies Used

- JavaScript, CSS, HTML
- Github for storing my data/codes.

# Getting Started

Link of the game:
https://vinniejipsk.github.io/hit-score-healthy-game/

This is the basic instruction of the game:
Press your direction keys ( ↑ ↓ → ← ) on your keyboard.

Resetting of the game:
Click on the "Reset Button" after you win or you lose.

# Biggest Challenges

1. Draw out a single projectile:

```
function drawEnemyProjectile() {
    for (let i = 0; i < enemyProjectiles.length; i++) {
        const projectile = enemyProjectiles[i];

        // Load the projectile image
        const projectileImage = document.getElementById('projectileImage');

        // Calculate the position to draw the projectile image
        const projectileX = projectile.x - cameraX - projectile.radius;
        const projectileY = projectile.y - cameraY - projectile.radius;

        // Draw the projectile image
        ctx.drawImage(
            projectileImage, 
            projectileX, 
            projectileY, 
            projectile.radius * 10, projectile.radius * 10);
    }
}
```
2. Create single and generator functions:

```
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
    for (let i = 0; i < 40; i++) {
        enemyProjectiles.push(singleEnemyProjectile());
    }
    return enemyProjectiles;
}
```
3. Create a specific update function:

```
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
```
4. Bring into this main update function:

```
function update() {

    ///// other codes.... ///////

    drawPlayer();
    drawPointSpawn();
    drawEnemyProjectile(); // <<<<< //
    updateProjectiles(); // <<<<< //
    requestAnimationFrame(update); // <<<< IMPORTANT!!! ///

}
```
5. Clear intervals to avoid initial stacking and after:
   
```
resetbutton.addEventListener('click', () => {

    ///// other codes.... ///////

    // Clear the previous timer interval
    clearInterval(timerInterval);

    // Reset the game over state
    initialize();
    if (gamePause) {
        gamePause = false;
        update();
    }
});
```
# What I have learnt

- Complete the basic requirement of the project before going for the hard ones. (Tried to coded homing projectile for a few days)
- Make use of Pseudocode more. Use contructor, classes and name the functions properly. (Easier to read and convenient. class.js file)
- Think and throw out the simple game logic first. (There's where functions comes after)

# Next Steps for my game

- Add more variety of food and drinks for both the healthy and unhealthy images. (Randomise all.)
- Enchance the visuals. (More animations such as the opacity and etc. Try to avoid looking like Windows XP games.)
- Power Ups after player hitting certain number of points. (Using image, increase speed and etc.)
- Add Homing Projectiles.
- Adjust the game for mobile platforms.
