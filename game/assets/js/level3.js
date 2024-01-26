const levelScores = 20;

var femaleNames = [
    'Анна',
    'Мария',
    'Екатерина',
    'Ольга',
    'София',
    'Алиса',
    'Елена',
    'Виктория',
    'Наталья'
];

var secret = getRandomInt(0, 8);
var isRed = false;
var isYellow = false;
var isOrange = false;
var found = false;
var help = 3;
var timeout = false;

function createRandomImages() {
    const imageContainer = document.getElementById('imageContainer');
    const shuffledImages = shuffleArray(images);
    femaleNames = shuffleArray(femaleNames);
    var i = 0;
    shuffledImages.forEach((image) => {
        const imageElement = document.createElement('img');
        imageElement.src = image.src;
        imageElement.className = 'image';
        imageElement.width = 100;
        imageElement.height = 100;
        imageElement.alt = femaleNames[i];
        if(secret === i){
            if(imageElement.src.indexOf("red") !== -1) {
                isRed = true;
            } else if(imageElement.src.indexOf("yellow") !== -1) {
                isYellow = true;
            } else if(imageElement.src.indexOf("orange") !== -1) {
                isOrange = true;
            }
        }
        imageElement.addEventListener('mousedown', (event) => {
            if (event.button === 0) {
                // Левая кнопка мыши
                if(imageElement.alt === femaleNames[secret] && !timeout){
                    addScores(levelScores + help * levelScores);
                    taskDoneCorrectly = true;
                    alert("Вы угадали! Вам начислено " + (levelScores + help * levelScores) + " очков.");
                } else {
                    alert("Какая жалость, вы не угадали! Попробуйте снова :)");
                    window.location.reload();
                }
            }
        });
        imageContainer.appendChild(imageElement);
        i++;
    });
}

document.addEventListener('DOMContentLoaded', createRandomImages);

var colorPhraseElement = document.getElementById("task");
colorPhraseElement.innerHTML = "Найдите матрешку по имени " + femaleNames[secret] + " и щелкните по ней левой кнопкой мыши. Помните, что у вас всего одна попытка, но также три подсказки (каждая использованная подсказка сокарщает баллы за задание на чтверть).";



function getHelp(){
    if(help === 3){
        if(isRed){
            alert("Подсказка: " + femaleNames[secret] +" красная.");
        } else {
            alert("Подсказка: " + femaleNames[secret] +" не красная.");
        }      
    }
    if(help === 2){
        if(isOrange){
            alert("Подсказка: " + femaleNames[secret] +" оранжевая.");
        } else {
            alert("Подсказка: " + femaleNames[secret] +" не оранжевая.");
        }
    }
    if(help === 1){
        if(isYellow){
            alert("Подсказка: " + femaleNames[secret] +" желтая.");
        } else {
            alert("Подсказка: " + femaleNames[secret] +" не желтая.");
        }
    }
    help--;
    alert("Осталось подсказок: " + help);
}

var timerElement = document.getElementById("timer");
var intervalId;
var remainingTime = 60;

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

function toMenu(){
    if(taskDoneCorrectly){
        alert("Поздравляю, вы прошли игру!");
    } else{
        alert("Игра еще не закончена...");
    }
    window.location.href = 'game_menu.html';
}