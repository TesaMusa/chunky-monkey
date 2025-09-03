class Monkey {
    constructor(speed, gameOverCallback) {
        this.x = window.innerWidth / 2 - 25;
        this.y = window.innerHeight - 50;
        this.speed = speed;
        this.element = document.createElement('img');
        this.element.src = './images/monkey.png';
        this.element.style.position = 'absolute';
        this.element.style.width = '100px';
        this.element.style.height = '100px';
        this.element.style.transition = 'all 0.2s ease-out';
        this.element.style.animation = 'monkeyPulse 2s ease-in-out infinite';
        this.element.style.zIndex = '100';
        document.body.appendChild(this.element);

        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.enemies = [];
        this.food = [];
        this.bananaCounter = 0;
        this.lives = 3;
        this.gameOverCallback = gameOverCallback;
        this.enemySpeed = 2; // Simple enemy speed tracking
        this.updateHUD();


    }
    //Function to reset the position of the monkey to the starting point
    resetPosition() {
        this.x = window.innerWidth / 2 - 25;
        this.y = window.innerHeight - 50;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.show();
        console.log(`Lives remaining: ${this.lives}`);
    }
 //Function to hide the monkey
    hide() {
        this.element.style.display = 'none';
    }
    //Function to check the collision between the monkey and the enemy, if there is a collision it outputs in the console, hides the monkey and triger the gameOverCallback
    checkCollision(enemy) {
        const monkeyRect = this.element.getBoundingClientRect();
        const enemyRect = enemy.element.getBoundingClientRect();

        const isCollision = (
            monkeyRect.x < enemyRect.x + enemyRect.width &&
            monkeyRect.x + monkeyRect.width > enemyRect.x &&
            monkeyRect.y < enemyRect.y + enemyRect.height &&
            monkeyRect.y + monkeyRect.height > enemyRect.y
        );

        if (isCollision) {
            console.log('Collision detected - life lost!');
            this.gameOver();
        }
        return isCollision;
    }
    //Function to handle the logic when the game is over
    gameOver() {
        console.log("Game Over - Life Lost");
        this.lives--;
        this.updateHUD(); // Update the HUD to show new lives count
        console.log(`Lives remaining: ${this.lives}`);

        if (this.lives === 0) {
            console.log("All lives lost - going to game over screen");
            if (this.gameOverCallback) {
                this.gameOverCallback(this.lives, this.bananaCounter);
            }
        } else {
            console.log("Lives remaining, resetting position");
            // Small delay before resetting position for visual feedback
            setTimeout(() => {
                this.resetPosition();
            }, 500);
        }
    }

    //Function to update the live HUD display
    updateHUD() {
        const liveScore = document.getElementById('live-score');
        const liveLives = document.getElementById('live-lives');
        
        if (liveScore) {
            liveScore.textContent = `Score: ${this.bananaCounter}`;
        }
        if (liveLives) {
            liveLives.textContent = `Lives: ${this.lives}`;
            // Change color based on lives remaining
            if (this.lives <= 1) {
                liveLives.style.borderColor = '#ff1744';
                liveLives.style.backgroundColor = 'rgba(255, 23, 68, 0.2)';
            } else if (this.lives <= 2) {
                liveLives.style.borderColor = '#ff9800';
                liveLives.style.backgroundColor = 'rgba(255, 152, 0, 0.2)';
            } else {
                liveLives.style.borderColor = '#ff6b6b';
                liveLives.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            }
        }
    }

    //moves the monkey to the left
    moveLeft() {
        if (this.x - this.speed >= 0) {
            this.x -= this.speed;
            this.element.style.left = `${this.x}px`;
            // Add walking animation
            this.element.style.animation = 'monkeyWalkLeft 0.5s ease-in-out';
            // Reset to idle animation after movement
            setTimeout(() => {
                this.element.style.animation = 'monkeyPulse 2s ease-in-out infinite';
            }, 500);
        }
    }
    //moves the monkey to the right
    moveRight() {
        if (this.x + this.speed <= window.innerWidth - 100) {
            this.x += this.speed;
            this.element.style.left = `${this.x}px`;
            // Add walking animation
            this.element.style.animation = 'monkeyWalkRight 0.5s ease-in-out';
            // Reset to idle animation after movement
            setTimeout(() => {
                this.element.style.animation = 'monkeyPulse 2s ease-in-out infinite';
            }, 500);
        }
    }
    //moves the monkey up
    moveUp() {
        if (this.y - this.speed >= 0) {
            this.y -= this.speed;
            this.element.style.top = `${this.y}px`;
            // Add jumping animation
            this.element.style.animation = 'monkeyWalkUp 0.5s ease-in-out';
            // Reset to idle animation after movement
            setTimeout(() => {
                this.element.style.animation = 'monkeyPulse 2s ease-in-out infinite';
            }, 500);
        }
    }
    //moves the monkey down
    moveDown() {
        if (this.y + this.speed <= window.innerHeight - 100) {
            this.y += this.speed;
            this.element.style.top = `${this.y}px`;
            // Add squishing animation
            this.element.style.animation = 'monkeyWalkDown 0.5s ease-in-out';
            // Reset to idle animation after movement
            setTimeout(() => {
                this.element.style.animation = 'monkeyPulse 2s ease-in-out infinite';
            }, 500);
        }
    }
 
    //Function to show visual feedback when collecting bananas
    showBananaCollectedEffect(x, y) {
        const effect = document.createElement('div');
        effect.textContent = '+1 🍌';
        effect.style.position = 'absolute';
        effect.style.left = `${x + 25}px`;
        effect.style.top = `${y}px`;
        effect.style.color = '#FFD700';
        effect.style.fontSize = '28px';
        effect.style.fontWeight = 'bold';
        effect.style.textShadow = '3px 3px 6px rgba(0,0,0,0.8)';
        effect.style.pointerEvents = 'none';
        effect.style.zIndex = '1500';
        effect.style.animation = 'floatUp 1.5s ease-out forwards';
        effect.style.filter = 'drop-shadow(0 0 10px #FFD700)';
        
        document.body.appendChild(effect);
        
        // Remove the effect after animation
        setTimeout(() => {
            if (effect.parentNode) {
                effect.parentNode.removeChild(effect);
            }
        }, 1500);
    }

    //show the visual feedback when the enemy is hit
    showEnemyHitEffect(x, y) {
        const effect = document.createElement('div');
        effect.textContent = '💥';
        effect.style.position = 'absolute';
        effect.style.left = `${x + 25}px`;
        effect.style.top = `${y}px`;
    
        // Remove the effect after animation
        effect.style.position = 'absolute';
        effect.style.left = `${x + 25}px`;
        effect.style.top = `${y}px`;
        effect.style.color = '#FF0000';
        effect.style.fontSize = '28px';
        effect.style.fontWeight = 'bold';
        effect.style.pointerEvents = 'none';
        effect.style.zIndex = '1500';
        effect.style.animation = 'floatUp 1.5s ease-out forwards';
        effect.style.filter = 'drop-shadow(0 0 10px #FF0000)';
        
        document.body.appendChild(effect);
        
        // Remove the effect after animation
        setTimeout(() => {
            if (effect.parentNode) {
                effect.parentNode.removeChild(effect);
            }
        }, 1500);
    }

    //Function to add sparkle effect around the monkey
    addSparkleEffect(x, y) {
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.textContent = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.left = `${x + (Math.random() * 80) - 20}px`;
            sparkle.style.top = `${y + (Math.random() * 80) - 20}px`;
            sparkle.style.fontSize = '16px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1400';
            sparkle.style.animation = `sparkle 1s ease-out forwards`;
            sparkle.style.animationDelay = `${i * 0.1}s`;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1100);
        }
    }
    //Shows the monkey

    show() {
        this.element.style.display = 'block';
    }
    //Function used to create enemies at a specific rate (junior level game logic)
    startCreatingEnemies() {
        let enemiesCreated = 0;
        const maxEnemiesPerMinute = 8; // Simple fixed rate
        const creationInterval = 60000 / maxEnemiesPerMinute; // 7.5 seconds between enemies

        const createEnemy = () => {
            // Simple enemy creation with current speed
            const newEnemy = new Enemy(this.enemySpeed);
            this.enemies.push(newEnemy);
            this.positionEnemies();
            enemiesCreated++;

            if (enemiesCreated < maxEnemiesPerMinute) {
                setTimeout(createEnemy, creationInterval);
            }
        };

        createEnemy();
    }
    //Function used to create food in this game bananas at a specific rate
    startCreatingFood() {
        let foodCreate = 0;
        const maxFoodPerMinute = 10;
        const creationInterval = 60000 / maxFoodPerMinute;

        const createFood = () => {
            const newFood = new Food(2);
            this.food.push(newFood);
            this.positionFood();
            foodCreate++;

            if (foodCreate < maxFoodPerMinute) {
                setTimeout(createFood, creationInterval);
            }
        };

        createFood();
    }
    //Function to position enemies item on the screen with smart spawning
    positionEnemies() {
        this.enemies.forEach((enemy, index) => {
            // Smart spawning - avoid spawning near the monkey
            let safeDistance = 200;
            let attempts = 0;
            let x, y;
            
            do {
                x = Math.random() * (window.innerWidth - 100);
                y = Math.random() * (window.innerHeight * 0.6) + (window.innerHeight * 0.2);
                attempts++;
            } while (attempts < 5 && 
                     Math.abs(x - this.x) < safeDistance && 
                     Math.abs(y - this.y) < safeDistance);

            enemy.x = x;
            enemy.y = y;
            enemy.direction = Math.random() < 0.5 ? 'right' : 'left';
            
            // Add staggered spawn animation
            setTimeout(() => {
                enemy.element.style.left = `${enemy.x}px`;
                enemy.element.style.top = `${enemy.y}px`;
                enemy.element.style.animation = 'spawnIn 0.8s ease-out, bounceEnemy 3s ease-in-out infinite';
                enemy.show();
            }, index * 200); // Stagger spawning
        });
    }
//Function to position food item on the screen with smart spawning
    positionFood() {
        this.food.forEach((banana, index) => {
            // Smart banana placement - prefer upper areas and avoid enemies
            let x = Math.random() * (window.innerWidth - 50);
            let y = Math.random() * (window.innerHeight * 0.7) + 50;
            
            banana.x = x;
            banana.y = y;
            banana.direction = Math.random() < 0.7 ? 'right' : 'left';
            
            // Add staggered spawn with beautiful animation
            setTimeout(() => {
                banana.element.style.left = `${banana.x}px`;
                banana.element.style.top = `${banana.y}px`;
                banana.element.style.animation = 'spawnIn 0.6s ease-out, floatBanana 4s ease-in-out infinite';
                banana.element.style.filter = 'drop-shadow(0 0 8px rgba(255, 255, 0, 0.6))';
                banana.show();
            }, index * 150); // Stagger spawning
        });
    }
    //Moves enemies  on the screen and checks for collision with the main character in this case with the monkey, hides and removes enemies 
    moveEnemies() {
        this.enemies.forEach((enemy) => {
            if (enemy.isVisible) {
                if (enemy.direction === 'right') {
                    enemy.x += enemy.speed;
                    enemy.element.style.left = `${enemy.x}px`;
                } else if (enemy.direction === 'left') {
                    enemy.x -= enemy.speed;
                    enemy.element.style.left = `${enemy.x}px`;
                }

                if (this.checkCollision(enemy)) {

                    console.log('Collision with enemy!');
                    enemy.hide();
                    enemy.reset();
                }

                if (enemy.x > window.innerWidth || enemy.x + 50 < 0) {
                    enemy.hide();
                    enemy.reset();
                }
            }
        });
    }
    //Moves food  on the screen and checks for collision with the main character in this case with the monkey, hides and removes food accordingly 
    moveFood() {
        this.food.forEach((banana) => {
            if (banana.isVisible) {
                if (banana.direction === 'right') {
                    banana.x += banana.speed;
                    banana.element.style.left = `${banana.x}px`;
                } else if (banana.direction === 'left') {
                    banana.x -= banana.speed;
                    banana.element.style.left = `${banana.x}px`;
                }

                if (this.checkFoodCollision(banana)) {
                    console.log('Collision with banana!');
                    banana.hide();
                    banana.reset();
                }

                if (banana.x > window.innerWidth || banana.x + 50 < 0) {
                    banana.hide();
                    banana.reset();
                }
            }
        });
    }

    checkFoodCollision(banana) {
        const monkeyRect = this.element.getBoundingClientRect();
        const bananaRect = banana.element.getBoundingClientRect();

        const isCollision = (
            monkeyRect.x < bananaRect.x + bananaRect.width &&
            monkeyRect.x + monkeyRect.width > bananaRect.x &&
            monkeyRect.y < bananaRect.y + bananaRect.height &&
            monkeyRect.y + monkeyRect.height > bananaRect.y
        );

        if (isCollision) {
            console.log('Collision detected');
            banana.hide();
            banana.reset();
            this.bananaCounter++;
            console.log(`You have collected ${this.bananaCounter} bananas!`);
            
            // Simple difficulty increase - junior level game logic
            if (this.bananaCounter % 10 === 0 && this.enemySpeed < 5) {
                this.enemySpeed += 0.5; // Increase enemy speed every 10 bananas
                console.log(`Game getting harder! Enemy speed: ${this.enemySpeed}`);
            }
            
            this.updateHUD();
            this.showBananaCollectedEffect(banana.x, banana.y);
            this.addSparkleEffect(this.x, this.y);
        }
        return isCollision;
    }



}
class Enemy {
    constructor(speed) {
        this.x = 0;
        this.y = 0;
        this.speed = speed;
        this.isVisible = false;

        this.element = document.createElement('img');
        this.element.src = './images/enemy1.png';
        this.element.style.position = 'absolute';
        this.element.style.width = '100px';
        this.element.style.height = '100px';
        this.element.style.transition = 'all 0.3s ease';
        this.element.style.filter = 'drop-shadow(0 0 8px rgba(255, 0, 0, 0.4))';
        this.element.style.zIndex = '50';
        document.body.appendChild(this.element);
        this.hide();

    }
    show() {
        this.isVisible = true;
        this.element.style.display = 'block';
    }
    hide() {
        this.isVisible = false;
        this.element.style.display = 'none';
    }
    reset() {
        this.x = Math.random() * (window.innerWidth - 50);
        this.y = Math.random() * -100;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.show();
    }
    checkCollision(monkey) {
        const monkeyRect = monkey.element.getBoundingClientRect();
        const enemyRect = this.element.getBoundingClientRect();

        const isCollision = (
            monkeyRect.x < enemyRect.x + enemyRect.width &&
            monkeyRect.x + monkeyRect.width > enemyRect.x &&
            monkeyRect.y < enemyRect.y + enemyRect.height &&
            monkeyRect.y + monkeyRect.height > enemyRect.y
        );

        if (isCollision) {
            console.log('Collision detected');
            this.hide();
            monkey.gameOver();
        }
        return isCollision;
    }

}

class Food {
    constructor(speed) {
        this.x = 0;
        this.y = 0;
        this.speed = speed;
        this.isVisible = false;

        this.element = document.createElement('img');
        this.element.src = './images/food.png';
        this.element.style.position = 'absolute';
        this.element.style.width = '50px';
        this.element.style.height = '50px';
        this.element.style.transition = 'all 0.3s ease';
        this.element.style.filter = 'drop-shadow(0 0 8px rgba(255, 255, 0, 0.6))';
        this.element.style.zIndex = '60';
        document.body.appendChild(this.element);
        this.hide();
    }
    show() {
        this.isVisible = true;
        this.element.style.display = 'block';
    }

    hide() {
        this.isVisible = false;
        this.element.style.display = 'none';
    }

    reset() {
        this.x = Math.random() * (window.innerWidth - 50);
        this.y = Math.random() * -100;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.show();
    }
}


