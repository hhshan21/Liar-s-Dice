import Dice from "./dice/dice.js";


// Starting whole game with a start notification
function startNoti(isShown) {
    const notiContainerDom = document.getElementById('start-noti');

    if(isShown) {
        notiContainerDom.style.display='';
    } else {
        document.getElementById('start-noti').style.display = 'none';
    }
}

// start game after clicking start notification btn
function startGame() {
    startNoti(false);
}

function addEventListeners() {
    document.getElementById('start-noti').addEventListener('click', () => {
        startGame();
    })
}


function init() {
    startNoti(true);
    addEventListeners();

    const dice = new Dice();
}

init();