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
        document.body.appendChild(this.element);

        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.enemies = [];
        this.food = [];
        this.bananaCounter = 0;
        this.lives = 3;
        this.gameOverCallback = gameOverCallback;


    }
    //Function to reset the position of the monkey to the starting point
    resetPosition() {
        this.x = window.innerWidth / 2 - 25;
        this.y = window.innerHeight - 50;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.show();

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
            console.log('Collision detected');
            this.hide();
            this.gameOverCallback();


        }
        return isCollision;
    }
    //Function to handle the logic when the game is over
    gameOver() {
        console.log("Game Over");
        this.lives--;

        const livesTotal = document.getElementById("lives-remaining");
        livesTotal.innerText = this.lives;

        if (this.lives === 0) {
            if (this.gameOverCallback) {

                this.gameOverCallback(this.lives, this.bananaCounter);
            }
        } else {
            this.resetPosition();
        }
    }
    //moves the monkey to the left
    moveLeft() {
        this.x -= this.speed;
        this.element.style.left = `${this.x}px`;
    }
    //moves the monkey to the right
    moveRight() {
        this.x += this.speed;
        this.element.style.left = `${this.x}px`;
    }
    //moves the monkey up
    moveUp() {
        this.y -= this.speed;
        this.element.style.top = `${this.y}px`;
    }
    //moves the monkey down
    moveDown() {
        this.y += this.speed;
        this.element.style.top = `${this.y}px`;
    }
    //Shows the monkey

    show() {
        this.element.style.display = 'block';
    }
    //Function used to create enenemies at a specific rate
    startCreatingEnemies() {
        let enemiesCreated = 0;
        const maxEnemiesPerMinute = 10;
        const creationInterval = 60000 / maxEnemiesPerMinute;

        const createEnemy = () => {
            const newEnemy = new Enemy(2);
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
    //Function to position enemies item on the screen
    positionEnemies() {
        this.enemies.forEach((enemy) => {

            enemy.y = window.innerHeight - Math.random() * (window.innerHeight / 4);
            enemy.direction = Math.random() < 0.5 ? 'right' : 'left';
            enemy.element.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
            enemy.element.style.top = `${enemy.y}px`;
            enemy.show();
        });
    }
//Function to position food item on the screen
    positionFood() {
        this.food.forEach((banana) => {

            banana.y = window.innerHeight - Math.random() * (window.innerHeight / 2);
            banana.direction = Math.random() < 0.8 ? 'right' : 'left';
            banana.element.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
            banana.element.style.top = `${banana.y}px`;
            banana.show();
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
        const bananaRect = this.element.getBoundingClientRect();
        const monkeyRect = banana.element.getBoundingClientRect();

        const isCollision = (
            bananaRect.x < monkeyRect.x + monkeyRect.width &&
            bananaRect.x + bananaRect.width > monkeyRect.x &&
            bananaRect.y < monkeyRect.y + monkeyRect.height &&
            bananaRect.y + bananaRect.height > monkeyRect.y
        );

        if (isCollision) {
            console.log('Collision detected');
            banana.hide();
            banana.reset();
            this.bananaCounter++;
            console.log(`You have collected ${this.bananaCounter} !`);
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


