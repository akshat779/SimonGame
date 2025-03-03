// const quadrants = {
//     green: document.getElementById('green'),
//     red: document.getElementById('red'),
//     yellow: document.getElementById('yellow'),
//     blue: document.getElementById('blue')
// };

// const colors = ['green', 'red', 'yellow', 'blue'];
// let gameSequence = [];
// let userSequence = [];
// let level = 0;
// let gameActive = false;
// let playerName = '';
// let soundEnabled = false;

// const scoreCount = document.getElementById('score-count');

// // Sound files
// const sounds = {
//     green: new Audio('./../assets/sounds/green.mp3'),
//     red: new Audio('./../assets/sounds/red.mp3'),
//     yellow: new Audio('./../assets/sounds/yellow.mp3'),
//     blue: new Audio('./../assets/sounds/blue.mp3')
// };

// function startGame() {
//     playerName = prompt('Enter your name:');
//     if (!playerName) {
//         alert('Name is required to start the game.');
//         return;
//     }
//     setTimeout(() => {
//         gameSequence = [];
//         userSequence = [];
//         level = 0;
//         gameActive = true;
//         nextLevel();
//     }, 1000)
// }

// function stopGame() {
//     gameActive = false;
//     gameSequence = [];
//     userSequence = [];
//     level = 0;
//     scoreCount.textContent = '0';
//     alert('Game stopped!');
// }

// function restartGame() {
//     if (!playerName) {
//         alert('Please start the game first to enter your name.');
//         return;
//     }
//     stopGame();
//     setTimeout(() => {
//         gameSequence = [];
//         userSequence = [];
//         level = 0;
//         gameActive = true;
//         nextLevel();
//     }, 1000); 
// }


// function nextLevel() {
//     if (!gameActive) return;
//     level++;
//     userSequence = [];
//     scoreCount.textContent = level;
//     const randomColor = colors[Math.floor(Math.random() * 4)];
//     gameSequence.push(randomColor);
//     playSequence(gameSequence);
// }

// function playSequence(sequence) {
//     sequence.forEach((color, index) => {
//         setTimeout(() => {
//             if (!gameActive) return;
//             lightUpQuadrant(color);
//         }, index * 1000);
//     });
// }

// function lightUpQuadrant(color) {
//     quadrants[color].style.filter = 'brightness(1.8)';
//     if(soundEnabled){
//         sounds[color].play().catch(error => {
//             console.log('Sound play error:', error);
//         });
//     }
//     setTimeout(() => {
//         quadrants[color].style.filter = 'brightness(1)';
//     }, 500);
// }

// Object.keys(quadrants).forEach(color => {
//     quadrants[color].addEventListener('click', () => {
//         if (!gameActive) return;
//         lightUpQuadrant(color);
//         userSequence.push(color);
//         checkSequence();
//     });
// });

// function checkSequence() {
//     const currentIndex = userSequence.length - 1;
//     if (userSequence[currentIndex] !== gameSequence[currentIndex]) {
//         alert('You lose!');
//         updateLeaderboard(playerName, level);
//         gameActive = false;
//         return;
//     }

//     if (userSequence.length === gameSequence.length) {
//         setTimeout(nextLevel, 1000);
//     }
// }


// function updateLeaderboard(player, score) {
//     const leaderboardData = JSON.parse(localStorage.getItem('leaderboardData')) || [];
//     leaderboardData.push({ player, score });
//     localStorage.setItem('leaderboardData', JSON.stringify(leaderboardData));
// }

// document.getElementById('soundToggle').addEventListener('change', (event) => {
//     soundEnabled = event.target.checked;
// });


// document.getElementById('startGame').addEventListener('click', startGame);


// document.getElementById('stopGame').addEventListener('click', stopGame);

// document.getElementById('restartGame').addEventListener('click', restartGame);

// __________________++++++++______________+++++++++++++_____________________________


class SimonGame {
    constructor() {
        this.quadrants = {
            green: document.getElementById('green'),
            red: document.getElementById('red'),
            yellow: document.getElementById('yellow'),
            blue: document.getElementById('blue')
        };
        this.colors = ['green', 'red', 'yellow', 'blue'];
        this.gameSequence = [];
        this.userSequence = [];
        this.level = 0;
        this.gameActive = false;
        this.playerName = '';
        this.soundEnabled = false;
        this.difficulty = 'easy'
        this.scoreCount = document.getElementById('score-count');
        this.sounds = {
            green: new Audio('./../assets/sounds/green.mp3'),
            red: new Audio('./../assets/sounds/red.mp3'),
            yellow: new Audio('./../assets/sounds/yellow.mp3'),
            blue: new Audio('./../assets/sounds/blue.mp3')
        };

        this.initEventListeners();
    }

    initEventListeners() {
        document.getElementById('soundToggle').addEventListener('change', (event) => {
            this.soundEnabled = event.target.checked;
        });
        
        document.getElementById('difficulty').addEventListener('change', (event) => {
            this.difficulty = event.target.value;
        });

        document.getElementById('startGame').addEventListener('click', () => this.startGame());
        document.getElementById('stopGame').addEventListener('click', () => this.stopGame());
        document.getElementById('restartGame').addEventListener('click', () => this.restartGame());

        Object.keys(this.quadrants).forEach(color => {
            this.quadrants[color].addEventListener('click', () => {
                if (!this.gameActive) return;
                this.lightUpQuadrant(color);
                this.userSequence.push(color);
                this.checkSequence();
            });
        });
    }

    startGame() {
        this.playerName = prompt('Enter your name:');
        if (!this.playerName) {
            alert('Name is required to start the game.');
            return;
        }
        setTimeout(() => {
            this.gameSequence = [];
            this.userSequence = [];
            this.level = 0;
            this.gameActive = true;
            this.nextLevel();
        }, 1000); 
    }

    stopGame() {
        this.gameActive = false;
        this.gameSequence = [];
        this.userSequence = [];
        this.level = 0;
        this.scoreCount.textContent = '0';
        alert('Game stopped!');
    }

    restartGame() {
        if (!this.playerName) {
            alert('Please start the game first to enter your name.');
            return;
        }
        this.stopGame();
        setTimeout(() => {
            this.gameSequence = [];
            this.userSequence = [];
            this.level = 0;
            this.gameActive = true;
            this.nextLevel();
        }, 1000); 
    }

    nextLevel() {
        if (!this.gameActive) return;
        this.level++;
        this.userSequence = [];
        this.scoreCount.textContent = this.level;
        const randomColor = this.colors[Math.floor(Math.random() * 4)];
        this.gameSequence.push(randomColor);
        this.playSequence(this.gameSequence);
    }

    playSequence(sequence) {
        const speed = this.getSpeed();
        sequence.forEach((color, index) => {
            setTimeout(() => {
                if (!this.gameActive) return;
                this.lightUpQuadrant(color);
            }, index * speed);
        });
    }

    getSpeed() {
        switch (this.difficulty) {
            case 'easy':
                return 1000;
            case 'medium':
                return 700;
            case 'hard':
                return 400;
            default:
                return 1000;
        }
    }

    lightUpQuadrant(color) {
        this.quadrants[color].style.filter = 'brightness(1.8)';
        if (this.soundEnabled) {
            this.sounds[color].play().catch(error => {
                console.log('Sound play error:', error);
            });
        }
        setTimeout(() => {
            this.quadrants[color].style.filter = 'brightness(1)';
        }, 500);
    }

    checkSequence() {
        const currentIndex = this.userSequence.length - 1;
        if (this.userSequence[currentIndex] !== this.gameSequence[currentIndex]) {
            alert('You lose!');
            this.updateLeaderboard(this.playerName, this.level);
            this.gameActive = false;
            return;
        }

        if (this.userSequence.length === this.gameSequence.length) {
            setTimeout(() => this.nextLevel(), 1000);
        }
    }

    updateLeaderboard(player, score) {
        const leaderboardData = JSON.parse(localStorage.getItem('leaderboardData')) || [];
        leaderboardData.push({ player, score });
        localStorage.setItem('leaderboardData', JSON.stringify(leaderboardData));
    }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    new SimonGame();
});


// _______________________________________________________

