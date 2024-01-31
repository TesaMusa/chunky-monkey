window.onload = function () {
    const startButton = document.getElementById('start-button');
    const splashScreen = document.getElementById('splash-screen');
    const gameScreen = document.getElementById('game-screen');
    const gameContainer = document.getElementById('game-container');
    let monkey;

    startButton.addEventListener('click', function () {
        startGame();
    });

    function startGame() {
        splashScreen.style.display = 'none';
        gameScreen.style.display = 'flex';
        gameContainer.style.display = 'none';

        gameScreen.style.backgroundImage = "url('./images/jungle2.png')";

        monkey = new Monkey(5);

        startButton.style.display = 'none';

        const arrowKeysContainer = document.getElementById('arrow-keys-container');
        arrowKeysContainer.style.display = 'none';

      
        monkey.show();

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
