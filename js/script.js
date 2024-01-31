window.onload = function () {
    const startButton = document.getElementById('start-button');
    const splashScreen = document.getElementById('splash-screen');
    const gameScreen = document.getElementById('game-screen');

    let monkey;

    startButton.addEventListener('click', function () {
        startGame();
    });

    function startGame() {
        splashScreen.style.display = 'none';
        gameScreen.style.display = 'flex';


        gameScreen.style.backgroundImage = "url('../images/jungle2.png')";

        monkey = new Monkey(20);

        startButton.style.display = 'none';

        const arrowKeysContainer = document.getElementById('arrow-keys-container');
        arrowKeysContainer.style.display = 'none';


        monkey.show();
        setInterval(() => {
            monkey.moveEnemies();

        }, 100);

        setInterval(() => {
            monkey.moveFood();

        }, 100);

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
                // case 'key_SPACE':
                //     monkey.jump();
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
};
