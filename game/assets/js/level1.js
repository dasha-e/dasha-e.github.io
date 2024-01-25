

const imageScales = [50, 100, 150];
const levelScores = 10;

function roundToNearestFifty(number) {
    return Math.round(number / 50) * 50;
}


// Создание и размещение случайных картинок в контейнере
function createRandomImages() {
    const imageContainer = document.getElementById('imageContainer');
    const shuffledImages = shuffleArray(images);

    shuffledImages.forEach((image) => {
        const imageElement = document.createElement('img');
        imageElement.src = image.src;
        imageElement.className = 'image';
        var scale = imageScales[getRandomInt(0, 2)];
        imageElement.width = scale;
        imageElement.height = scale;
        imageElement.addEventListener('mousedown', (event) => {
            if (event.button === 0 && roundToNearestFifty(imageElement.width) < 150) {
                // Левая кнопка мыши
                imageElement.width = roundToNearestFifty(imageElement.width + 50);
                imageElement.height = roundToNearestFifty(imageElement.height + 50);
            } else if (event.button === 2 && roundToNearestFifty(imageElement.width) > 50) {
                // Правая кнопка мыши
                imageElement.width = roundToNearestFifty(imageElement.width - 50);
                imageElement.height = roundToNearestFifty(imageElement.height - 50);
            }
        });
        imageContainer.appendChild(imageElement);
    });
}

var colors = ["красны", "оранжевы", "желты"];
var colorsOrder = [0, 1, 2];
colorsOrder = shuffleArray(colorsOrder);
var colorPhraseElement = document.getElementById("task");
colorPhraseElement.innerHTML = "Измените размер матрешек так чтобы все " + colors[colorsOrder[0]] + "е матрешки были больше " + colors[colorsOrder[1]] + "х. <br>Управление: увеличение - левой кнопкой мыши, уменьшение - правой.";


var buttonCheck = document.getElementById("checkButton");
var scoresAdded = false;
var timeout = false;

buttonCheck.addEventListener("click", function () {
    var imageContainer = document.getElementById("imageContainer");
    var images = imageContainer.querySelectorAll("img");
    var imageArray = Array.from(images);
    var col = ["red", "orange", "yellow"];
    var minCol1 = 200;
    var maxCol2 = 0;

    imageArray.forEach((image) => {
        if (image.src.indexOf(col[colorsOrder[0]]) !== -1) {
            if (image.width < minCol1) {
                minCol1 = image.width;
            }
        }
        if (image.src.indexOf(col[colorsOrder[1]]) !== -1) {
            if (image.width > maxCol2) {
                maxCol2 = image.width;
            }
        }
    });
    if (maxCol2 < minCol1) {
        taskDoneCorrectly = true;
        alert("Все верно!");
        if (!timeout && !scoresAdded) {
            addScores(levelScores);
            scoresAdded = true;
            alert("За задание начисленно " + levelScores + " очков.");
        }
    } else {
        alert("Есть ошибки, попробуй еще разок!");
    }

});

document.addEventListener('DOMContentLoaded', createRandomImages);

var timerElement = document.getElementById("timer");
var intervalId;
var remainingTime = 2 * 60;

function updateTimer() {
    var minutes = Math.floor(remainingTime / 60);
    var seconds = remainingTime % 60;

    var formattedTime =
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds);

    timerElement.innerHTML = formattedTime;

    if (remainingTime <= 0) {
        clearInterval(intervalId);
        if (!taskDoneCorrectly) {
            alert("Время вышло! Очки за это задание начисляться не будут.");
            timeout = true;
        }
    } else {
        remainingTime--;
    }
}
intervalId = setInterval(updateTimer, 1000);
