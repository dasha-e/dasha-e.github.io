document.addEventListener('contextmenu', (event) => {
    event.preventDefault(); // Отмена стандартного поведения
});

// Определение списка картинок
const path = 'assets/images/';
const images = [
    { src: path + 'red1.png' },
    { src: path + 'red2.png' },
    { src: path + 'red3.png' },
    { src: path + 'yellow1.png' },
    { src: path + 'yellow2.png' },
    { src: path + 'yellow3.png' },
    { src: path + 'orange1.png' },
    { src: path + 'orange2.png' },
    { src: path + 'orange3.png' }
];
var taskDoneCorrectly = false;

function addScores(levelScores) {
    localStorage.setItem(localStorage.key(0), parseInt(localStorage.getItem(localStorage.key(0))) + levelScores);
}


// Функция для получения случайного числа в заданном диапазоне
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для перемешивания элементов массива в случайном порядке
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = getRandomInt(0, i);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function nextLevel(path){
    buttonCheck.click();
    if(taskDoneCorrectly){
        window.location.href = path;
    } else{
        alert("Перейти на следующую хитростность можно только верно завершив текущую.");
    }
}
