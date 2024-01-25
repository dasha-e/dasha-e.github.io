const dnd = document.getElementById("imageContainer");
const dnd2 = document.getElementById("imageBasket");
let imgs = document.getElementsByClassName("dnd");

dnd.ondragover = allowDrop;
dnd2.ondragover = allowDrop;

for (img of imgs) {
    img.ondragstart = drag;
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("id", event.target.id);
}

function drop(event) {
    let itemId = event.dataTransfer.getData("id");
    event.target.appendChild(document.getElementById(itemId));
}

function rotateImage(event) {
    var image = event.target;
    var currentRotation = image.getAttribute("data-rotation") || 0;
    var newRotation = (parseInt(currentRotation) + 45) % 360;
    image.setAttribute("data-rotation", newRotation);
    image.style.transform = "rotate(" + newRotation + "deg)";
}

var rotations = [0, 45, 90, 135, 180, 225, 270, 315];
const levelScores = 20;

function setRandomRotation(image) {
    var randomRotation = rotations[getRandomInt(0, 7)];

    image.setAttribute("data-rotation", randomRotation);
    image.style.transform = "rotate(" + randomRotation + "deg)";
}

function shuffleImages() {
    const imageElements = document.getElementsByClassName("dnd");
    const imageCount = imageElements.length;

    // Проверяем, есть ли столько же изображений, сколько элементов контейнера
    if (imageCount === images.length) {
        // Перемешиваем пути до изображений в случайном порядке
        const shuffledImages = shuffleArray(images);

        // Присваиваем новые пути до изображений элементам контейнера
        for (let i = 0; i < imageCount; i++) {
            imageElements[i].src = shuffledImages[i].src;
            setRandomRotation(imageElements[i]);
        }
    } else {
        console.log("Количество изображений и элементов контейнера не совпадает");
    }

}

document.addEventListener('DOMContentLoaded', shuffleImages);

var timerElement = document.getElementById("timer");
var intervalId;
var remainingTime = 4 * 60;
var scoresAdded = false;
var timeout = false;

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

var startPos = getRandomInt(0, 7);
var amount = getRandomInt(0, 2);
var amountOf = [3, 5, 9];
var colorPhraseElement = document.getElementById("task");
colorPhraseElement.innerHTML = "Расположите в сром поле <span class='numb'>" + amountOf[amount] + "</span> матрешек как будто они кувыркаются, начиная с позиции <span class='numb'>" + rotations[startPos] + "</span> градусов до нее же с равным шагом.";

function getRotationAngle(element) {
    var style = window.getComputedStyle(element);
    var transform = style.getPropertyValue("transform");
    var matrix = transform.match(/^matrix\((.+)\)$/);

    if (matrix) {
        var values = matrix[1].split(",");
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        return (angle < 0) ? angle + 360 : angle; //диапазон 0-360 градусов
    }
    else {
        return 0;
    }
}


var buttonCheck = document.getElementById("checkButton");
buttonCheck.addEventListener("click", function checkTask() {
    var step = 360 / (amountOf[amount] - 1);
    var img = imageBasket.querySelectorAll("img");
    var imageArray = Array.from(img);
    var flag = true;
    if (imageArray.length === amountOf[amount]) {
        for (var i = 1; i < imageArray.length; i++) {
            console.log(getRotationAngle(imageArray[i]) + " " + getRotationAngle(imageArray[i-1]) + " " + step);
            if (!(Math.abs(getRotationAngle(imageArray[i]) - getRotationAngle(imageArray[i - 1])) === step)) {
                flag = false;
                continue;
            }
        }
        if(flag){
            taskDoneCorrectly = true;
            alert("Все верно!");
            if (!timeout && !scoresAdded) {
                addScores(levelScores);
                scoresAdded = true;
                alert("За задание начисленно " + levelScores + " очков.");
            }
            return;
        }
    }
    alert("Есть ошибки, попробуй еще разок!");
});