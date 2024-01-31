class Monkey {
    constructor(speed) {
        this.x = window.innerWidth / 2 - 25;
        this.y = window.innerHeight - 50;
        this.speed = speed;
        this.element = document.createElement('img');
        this.element.src = '../images/monkey.png';
        this.element.style.position = 'absolute';
        this.element.style.width = '50px';
        this.element.style.height = '50px';
        document.body.appendChild(this.element);

        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;


        this.enemies = [];
        this.food = [];

    }

    moveLeft() {
        this.x -= this.speed;
        this.element.style.left = `${this.x}px`;
    }

    moveRight() {
        this.x += this.speed;
        this.element.style.left = `${this.x}px`;
    }

    moveUp() {
        this.y -= this.speed;
        this.element.style.top = `${this.y}px`;
    }

    moveDown() {
        this.y += this.speed;
        this.element.style.top = `${this.y}px`;
    }

    show() {
        this.element.style.display = 'block';
    }
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
    //FOOD
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
                setTimeout(foodCreate, creationInterval);
            }
        };

        createFood();
    }

    positionEnemies() {
        this.enemies.forEach((enemy) => {

            enemy.y = window.innerHeight - Math.random() * (window.innerHeight / 4);
            enemy.direction = Math.random() < 0.5 ? 'right' : 'left';
            enemy.element.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
            enemy.element.style.top = `${enemy.y}px`;
            enemy.show();
        });
    }

    positionFood() {
        this.food.forEach((banana) => {

            banana.y = window.innerHeight - Math.random() * (window.innerHeight / 2);
            banana.direction = Math.random() < 0.8 ? 'right' : 'left';
            banana.element.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
            banana.element.style.top = `${banana.y}px`;
            banana.show();
        });
    }

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




    checkCollision(enemy) {
        const monkeyLeft = this.x;
        const monkeyRight = this.x + 50;
        const monkeyTop = this.y;
        const monkeyBottom = this.y + 50;

        const enemyLeft = enemy.x;
        const enemyRight = enemy.x + 50;
        const enemyTop = enemy.y;
        const enemyBottom = enemy.y + 50;

        const collision =
            monkeyLeft < enemyRight &&
            monkeyRight > enemyLeft &&
            monkeyTop < enemyBottom &&
            monkeyBottom > enemyTop;

        if (collision) {
            this.hide();
        }

        return collision;
    }

    moveFood() {
        this.food.forEach((banana) => {
            if (banana.isVisible) {
                if (banana.direction === 'right') {
                    banana.x += banana.speed;
                    banana.element.style.left = `${banana.x}px`;


                    if (banana.x > window.innerWidth) {
                        banana.hide();
                        banana.reset();
                    }
                } else if (banana.direction === 'left') {
                    enbananaemy.x -= banana.speed;
                    banana.element.style.left = `${banana.x}px`;


                    if (banana.x + 50 < 0) {
                        banana.hide();
                        banana.reset();
                    }
                }
            }
        });
    }

    checkFoodCollision(banana) {
    }
}


class Enemy {
    constructor(speed) {
        this.x = 0;
        this.y = 0;
        this.speed = speed;
        this.isVisible = false;

        this.element = document.createElement('img');
        this.element.src = '../images/enemy1.png';
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


class Food {
    constructor(speed) {
        this.x = 0;
        this.y = 0;
        this.speed = speed;
        this.isVisible = false;

        this.element = document.createElement('img');
        this.element.src = '../images/food.png';
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