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
        setInterval(() => {
            const newEnemy = new Enemy(5);
            this.enemies.push(newEnemy);
            this.positionEnemies(); // Call positionEnemies after adding a new enemy
        }, 2000);
    }

    positionEnemies() {
        this.enemies.forEach((enemy) => {
            enemy.element.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
            enemy.element.style.top = `${Math.random() * -100}px`;
        });
    }

    moveEnemies() {
        this.enemies.forEach((enemy) => {
            enemy.y += enemy.speed;
            enemy.element.style.top = `${enemy.y}px`;

            if (this.checkCollision(enemy)) {
                console.log('Collision with enemy!');
                enemy.element.style.display = 'none';
                setTimeout(() => {
                    enemy.y = Math.random() * -100;
                    enemy.element.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
                    enemy.element.style.display = 'block';
                }, 5000);
            }

            if (enemy.y > window.innerHeight) {
                enemy.y = Math.random() * -100;
                enemy.element.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
            }
        });
    }

    checkCollision(enemy) {
       
    }
}

      




  
  class Enemy {
    constructor(speed) {
      this.x = 0;
      this.y = 0;
      this.speed = speed;
  
      this.element = document.createElement('img');
      this.element.src = '../images/enemy1.png';
      this.element.style.position = 'absolute';
      this.element.style.width = '50px';
      this.element.style.height = '50px';
      document.body.appendChild(this.element);
  
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;
    }
  }
  
  