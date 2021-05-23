const GAME_PIXEL_COUNT = 40;
const SQUARE_OF_GAME_PIXEL_COUNT = Math.pow(GAME_PIXEL_COUNT, 2);
let totalFoodAte = 0;
const gameContainer = document.getElementById('gameContainer');
const createGameBoardPixels = () => {
    for (let i = 1; i <= SQUARE_OF_GAME_PIXEL_COUNT; ++i) 
        gameContainer.innerHTML = `${gameContainer.innerHTML} <div class="gameBoardPixel" id="pixel${i}"></div>`;
};
const gameBoardPixels = document.getElementsByClassName('gameBoardPixel');
let currentFoodPostion = 0;
const createFood = () => {
    gameBoardPixels[currentFoodPostion].classList.remove('food');
    currentFoodPostion = Math.random();
    currentFoodPostion = Math.floor(
        currentFoodPostion * SQUARE_OF_GAME_PIXEL_COUNT
    );
    gameBoardPixels[currentFoodPostion].classList.add('food');
};

const LEFT_DIR = 37;
const UP_DIR = 38;
const RIGHT_DIR = 39;
const DOWN_DIR = 40;
let snakeCurrentDirection = RIGHT_DIR;
const changeDirection = newDirectionCode => {
    if (newDirectionCode == snakeCurrentDirection) return;

    if (newDirectionCode == LEFT_DIR && snakeCurrentDirection != RIGHT_DIR) {
        snakeCurrentDirection = newDirectionCode;
    } else if (
        newDirectionCode == UP_DIR &&
        snakeCurrentDirection != DOWN_DIR
    ) {
        snakeCurrentDirection = newDirectionCode;
    } else if (
        newDirectionCode == RIGHT_DIR &&
        snakeCurrentDirection != LEFT_DIR
    ) {
        snakeCurrentDirection = newDirectionCode;
    } else if (
        newDirectionCode == DOWN_DIR &&
        snakeCurrentDirection != UP_DIR
    ) {
        snakeCurrentDirection = newDirectionCode;
    }
};
let currentSnakeHeadPosition = SQUARE_OF_GAME_PIXEL_COUNT / 2;
let snakeLength = 1000;
const moveSnake = () => {
    switch (snakeCurrentDirection) {
        case LEFT_DIR:
            --currentSnakeHeadPosition;
            const isSnakeHeadAtLastGameBoardPixelTowardsLeft =
                currentSnakeHeadPosition % GAME_PIXEL_COUNT ==
                    GAME_PIXEL_COUNT - 1 || currentSnakeHeadPosition < 0;
            if (isSnakeHeadAtLastGameBoardPixelTowardsLeft) {
                currentSnakeHeadPosition =
                    currentSnakeHeadPosition + GAME_PIXEL_COUNT;
            }
            break;
        case UP_DIR:
            currentSnakeHeadPosition =
                currentSnakeHeadPosition - GAME_PIXEL_COUNT;
            const isSnakeHeadAtLastGameBoardPixelTowardsUp =
                currentSnakeHeadPosition < 0;
            if (isSnakeHeadAtLastGameBoardPixelTowardsUp) {
                currentSnakeHeadPosition =
                    currentSnakeHeadPosition + SQUARE_OF_GAME_PIXEL_COUNT;
            }
            break;
        case RIGHT_DIR:
            ++currentSnakeHeadPosition;
            const isSnakeHeadAtLastGameBoardPixelTowardsRight =
                currentSnakeHeadPosition % GAME_PIXEL_COUNT == 0;
            if (isSnakeHeadAtLastGameBoardPixelTowardsRight) {
                currentSnakeHeadPosition =
                    currentSnakeHeadPosition - GAME_PIXEL_COUNT;
            }
            break;
        case DOWN_DIR:
            currentSnakeHeadPosition =
                currentSnakeHeadPosition + GAME_PIXEL_COUNT;
            const isSnakeHeadAtLastGameBoardPixelTowardsDown =
                currentSnakeHeadPosition > SQUARE_OF_GAME_PIXEL_COUNT - 1;
            if (isSnakeHeadAtLastGameBoardPixelTowardsDown) {
                currentSnakeHeadPosition =
                    currentSnakeHeadPosition - SQUARE_OF_GAME_PIXEL_COUNT;
            }
            break;
        default:
            break;
    }
    let nextSnakeHeadPixel = gameBoardPixels[currentSnakeHeadPosition];
    if (nextSnakeHeadPixel.classList.contains('snakeBodyPixel')) {
        alert('Вы заработали ' + totalFoodAte + ' 🍎');
        window.location.reload();
    }
    nextSnakeHeadPixel.classList.add('snakeBodyPixel');
    setTimeout(() => {
        nextSnakeHeadPixel.classList.remove('snakeBodyPixel');
    }, snakeLength);
    if (currentSnakeHeadPosition == currentFoodPostion) {
        totalFoodAte++;
        document.getElementById('pointsEarned').innerHTML = totalFoodAte;
        snakeLength = snakeLength + 100;
        createFood();
    }
};
createGameBoardPixels();
createFood();
const moveSnakeInterval = setInterval(moveSnake, 80);
addEventListener('keydown', e => changeDirection(e.keyCode));
document.getElementById('leftButton').onclick = () => changeDirection(LEFT_DIR);
document.getElementById('rightButton').onclick = () => changeDirection(RIGHT_DIR);
document.getElementById('upButton').onclick = () => changeDirection(UP_DIR);
document.getElementById('downButton').onclick = () => changeDirection(DOWN_DIR);
console.log('%c 21-ИС19 ',`font-size: 15rem;display: block;text-align: center;height:90vh;color: #fcedd8;font-family: 'Niconne', cursive;font-weight: 700;text-shadow: 5px 5px 0px #eb452b, 10px 10px 0px #efa032, 15px 15px 0px #46b59b, 20px 20px 0px #017e7f, 25px 25px 0px #052939, 30px 30px 0px #c11a2b, 35px 35px 0px #c11a2b, 40px 40px 0px #c11a2b, 45px 45px 0px #c11a2b;`);