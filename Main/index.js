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
    document.querySelector('.start-btn').addEventListener('click', () => {
        startGame();
    })
}


function init() {
    startNoti(true);
    addEventListeners();

    const dice = new Dice();

    const players = [
        new User(
            'You',
            './Images/Pirate.png',
            true,
            dice
        ),
        new User(
            'Davy Jones',
            './Images/Capn.png',
            false,
            dice
        ),
    ]

    const game = new Game();
    players.forEach(player => {
        game.addPlayer(player);
    });

    game.startGame();
    game.showPlayerBidChoices()

}

init();
