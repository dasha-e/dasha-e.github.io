const basket1 = document.getElementById("basket1");
const basket2 = document.getElementById("basket2");
const basket3 = document.getElementById("basket3");
let images = document.getElementsByClassName("element");

basket1.ondragover = allowDrop;
basket2.ondragover = allowDrop;
basket3.ondragover = allowDrop;

for (img of images) {
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
    checkCategories();
}

function rotateImage(event) {
    var image = event.target;
    var currentRotation = image.getAttribute("data-rotation") || 0;
    var newRotation = (parseInt(currentRotation) + 90) % 360;
    image.setAttribute("data-rotation", newRotation);
    image.style.transform = "rotate(" + newRotation + "deg)";
}

function checkCategories() {
    const baskets = document.querySelectorAll(".basket");
    let isSameType = false;
    for (const basket of baskets) {
        const imagesInBasket = basket.querySelectorAll("img");
        isSameType = true;
        const type = imagesInBasket[0].getAttribute("type");
        
        for (const image of imagesInBasket) {
            if (type !== image.getAttribute("type")) {
                isSameType = false;
                break;
            }
        }
        if(!isSameType) break;
    }
    if (isSameType) {
        alert("Вы успешно распределили элементы на группы!");
    }
}




