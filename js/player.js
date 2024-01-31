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
}
