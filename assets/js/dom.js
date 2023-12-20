let latin = [
    "Consuetudo est altera natura",
    "Nota bene",
    "Nulla calamitas sola",
    "Per aspera ad astra",
    "Quid quid latine dictum sit, altum viditur"];
let russian = [
    "Привычка - вторая натура",
    "Заметьте хорошо!",
    "Беда не приходит одна",
    "Через тернии к звёздам",
    "Всё, что сказано на латыни, звучит как мудрость"];
let order = [0, 1, 2, 3, 4];
let currentIndex = 0;
let isClass1 = false; // начинаем с class2 тк нумерация с 0
let isBold = false;

function add() {
    if (currentIndex >= latin.length) {
        alert("Фразы закончились");
        return;
    }
    if (currentIndex === 0) {
        order = order.sort((a, b) => 0.5 - Math.random());
    }
    const p = document.createElement("p");
    p.classList.add(isClass1 ? "class1" : "class2")
    const rus = russian[order[currentIndex]];
    const lat = latin[order[currentIndex]];
    p.innerHTML = `n=${currentIndex}&nbsp<i>${lat}</i>&nbsp&nbsp${rus}`;

    document.getElementById("rand").appendChild(p);

    currentIndex++;
    isClass1 = !isClass1;
}

function boldEven() {
    const elements = document.querySelectorAll("#rand .class2");
    let newFontWeight;
    if (isBold) {
        newFontWeight = "normal";
    } else {
        newFontWeight = "bold"
    }
    for (const element of elements) {
        element.style.fontWeight = newFontWeight;
    }
    isBold = !isBold;
}