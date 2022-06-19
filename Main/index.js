import Dice from "./dice/dice.js";
import Game from "./game/game.js";
import User from "./user/user.js";

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

    const players = [
        new User(
            'Hui Shan',
            'https://media.istockphoto.com/photos/singapore-sky-line-picture-id505773333?k=20&m=505773333&s=612x612&w=0&h=vJAfrnRRgYVdYlcqoTxzKMCq6CWQCSncy4x-yaz_7Pg=',
            false,
            dice
        ),
        new User(
            'Davy Jones',
            'https://media.istockphoto.com/photos/singapore-sky-line-picture-id505773333?k=20&m=505773333&s=612x612&w=0&h=vJAfrnRRgYVdYlcqoTxzKMCq6CWQCSncy4x-yaz_7Pg=',
            true,
            dice
        ),
    ]

    const game = new Game();
    players.forEach(player => {
        game.addPlayer(player);
    });
}

init();