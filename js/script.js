
//Function to make sure the html is rendered and just then js intereacts
document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start-button');
    const splashScreen = document.getElementById('splash-screen');
    const gameScreen = document.getElementById('game-screen');

    //Declare a variable that will hold an instanc of the Monkey class
    let monkey;

    //Listens for a click button to start the game
    startButton.addEventListener('click', function () {
        startGame();
    });

    //Function to hide the splash screen and it's element and display the game-screen

    function startGame() {
        splashScreen.style.display = 'none';
        gameScreen.style.display = 'flex';
        gameScreen.style.backgroundImage = "url('./images/jungle1.png')";

        monkey = new Monkey(20, handleGameOver);

        startButton.style.display = 'none';

        const arrowKeysContainer = document.getElementById('arrow-keys-container');
        arrowKeysContainer.style.display = 'none';
        //Shows the monkey in the game
        monkey.show();
        //Sets certain interval to move the enemies
        setInterval(() => {
            monkey.moveEnemies();
        }, 100);

        setInterval(() => {
            monkey.moveFood();
        }, 100);
        //Listens for keyboard events
        window.addEventListener('keydown', function (event) {
            switch (event.key) {
                case 'ArrowLeft':
                    monkey.moveLeft();
                    break;
                case 'ArrowRight':
                    monkey.moveRight();
                    break;
                case 'ArrowUp':
                    monkey.moveUp();
                    break;
                case 'ArrowDown':
                    monkey.moveDown();
                    break;
            }
        });

        monkey.startCreatingEnemies();
        monkey.startCreatingFood();

        setInterval(changeArrowColors, 1000);

        function changeArrowColors() {
            const arrowKeys = document.querySelectorAll('.arrow-key');
            arrowKeys.forEach((arrowKey) => {
                arrowKey.style.color = getRandomColor();
            });
        }

        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }


    }
    //Function to handle the gam over logic, using localStorage to store the score and the lives
    function handleGameOver() {
        localStorage.setItem('lives-remaining', monkey.lives);
        localStorage.setItem('score', monkey.bananaCounter);

        window.location.href = 'game-over.html';
    }


});
