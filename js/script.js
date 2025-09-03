
//Function to make sure the html is rendered and just then js intereacts
document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start-button');
    const splashScreen = document.getElementById('splash-screen');
    const gameScreen = document.getElementById('game-screen');

    //Declare a variable that will hold an instanc of the Monkey class
    let monkey;
    let gamePaused = false;
    let gameIntervals = [];

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
        const enemyInterval = setInterval(() => {
            if (!gamePaused) {
                monkey.moveEnemies();
            }
        }, 100);

        const foodInterval = setInterval(() => {
            if (!gamePaused) {
                monkey.moveFood();
            }
        }, 100);

        // Store intervals for pause functionality
        gameIntervals = [enemyInterval, foodInterval];
        //Listens for keyboard events
        window.addEventListener('keydown', function (event) {
            // Handle pause functionality
            if (event.key === ' ' || event.key === 'Spacebar') {
                event.preventDefault();
                togglePause();
                return;
            }

            // Only allow movement when not paused
            if (!gamePaused) {
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
            }
        });

        monkey.startCreatingEnemies();
        monkey.startCreatingFood();
        
        // Start jungle atmosphere effects
        startJungleParticles();
        
        // Simple mobile support
        addBasicMobileControls();

        setInterval(changeArrowColors, 1000);

        function changeArrowColors() {
            const arrowKeys = document.querySelectorAll('.arrow-key');
            arrowKeys.forEach((arrowKey, index) => {
                // Synchronized color changes with bounce animations
                const hueRotation = (Date.now() / 10 + index * 90) % 360;
                arrowKey.style.filter = `hue-rotate(${hueRotation}deg) brightness(1.2)`;
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

        // Pause functionality - moved inside startGame function
        function togglePause() {
            gamePaused = !gamePaused;
            const pauseScreen = document.getElementById('pause-screen');
            
            if (gamePaused) {
                pauseScreen.style.display = 'flex';
            } else {
                pauseScreen.style.display = 'none';
            }
        }

    }
    //Function to handle the gam over logic, using localStorage to store the score and the lives
    function handleGameOver() {
        localStorage.setItem('lives-remaining', monkey.lives);
        localStorage.setItem('score', monkey.bananaCounter);
        
        // High score system
        const currentScore = monkey.bananaCounter;
        const highScore = localStorage.getItem('high-score') || 0;
        
        if (currentScore > highScore) {
            localStorage.setItem('high-score', currentScore);
            localStorage.setItem('is-new-record', 'true');
        } else {
            localStorage.setItem('is-new-record', 'false');
        }

        window.location.href = 'game-over.html';
    }

    // Display high score on splash screen
    function displayHighScore() {
        const highScore = localStorage.getItem('high-score') || 0;
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.textContent = highScore;
        }
    }

    // Load high score when page starts
    displayHighScore();
    
    // Enhanced arrow animations for splash screen
    function enhanceArrowAnimations() {
        const arrows = document.querySelectorAll('.arrow-key');
        
        arrows.forEach((arrow, index) => {
            // Add click animation to show it's interactive
            arrow.addEventListener('click', function() {
                this.style.animation = 'none';
                this.style.transform = 'scale(1.3) rotate(10deg)';
                this.style.filter = 'brightness(2) hue-rotate(90deg)';
                
                setTimeout(() => {
                    // Restore to static state
                    this.style.transform = '';
                    this.style.filter = '';
                }, 300);
            });
            
            // Simplified hover since there's no base animation to pause
            arrow.addEventListener('mouseenter', function() {
                // CSS handles the hover effects now
            });
            
            arrow.addEventListener('mouseleave', function() {
                // CSS handles the hover effects now  
            });
        });
        
        // Add instructional tooltips with mobile detection
        const arrowContainer = document.getElementById('arrow-keys-container');
        if (arrowContainer) {
            const tooltip = document.createElement('div');
            // Simple instruction text
            tooltip.innerHTML = '✨ Click arrows or use keyboard to move! ✨';
            tooltip.style.cssText = `
                margin-top: 15px;
                color: #FFD700;
                font-size: 0.9em;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
                animation: instructionsPulse 2s ease-in-out infinite;
                text-align: center;
                opacity: 0.9;
            `;
            arrowContainer.appendChild(tooltip);
                }
    }

    // Basic mobile support (junior level - simple but effective)
    function addBasicMobileControls() {
        // Simple click handlers for arrow buttons on mobile
        const upArrow = document.getElementById('up-arrow');
        const downArrow = document.getElementById('down-arrow');
        const leftArrow = document.getElementById('left-arrow');
        const rightArrow = document.getElementById('right-arrow');

        if (upArrow) upArrow.addEventListener('click', () => monkey && !gamePaused && monkey.moveUp());
        if (downArrow) downArrow.addEventListener('click', () => monkey && !gamePaused && monkey.moveDown());
        if (leftArrow) leftArrow.addEventListener('click', () => monkey && !gamePaused && monkey.moveLeft());
        if (rightArrow) rightArrow.addEventListener('click', () => monkey && !gamePaused && monkey.moveRight());
    }

    // Initialize enhanced arrows
    enhanceArrowAnimations();

    // Function to create floating jungle particles
    function startJungleParticles() {
        const leafEmojis = ['🍃', '🌿', '🍀', '🌱'];
        
        function createLeaf() {
            const leaf = document.createElement('div');
            leaf.className = 'jungle-particle';
            leaf.textContent = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
            leaf.style.fontSize = (Math.random() * 20 + 15) + 'px';
            leaf.style.left = Math.random() * window.innerWidth + 'px';
            leaf.style.top = window.innerHeight + 'px';
            
            // Choose random animation
            const animations = ['floatLeaf1', 'floatLeaf2', 'floatLeaf3'];
            const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
            const duration = (Math.random() * 5 + 8) + 's'; // 8-13 seconds
            
            leaf.style.animation = `${randomAnimation} ${duration} linear`;
            
            document.body.appendChild(leaf);
            
            // Remove leaf after animation
            setTimeout(() => {
                if (leaf.parentNode) {
                    leaf.parentNode.removeChild(leaf);
                }
            }, 13000);
        }
        
        // Create leaves periodically
        setInterval(createLeaf, 2000); // New leaf every 2 seconds
        
        // Create initial leaves
        for (let i = 0; i < 3; i++) {
            setTimeout(createLeaf, i * 800);
        }
    }


});
