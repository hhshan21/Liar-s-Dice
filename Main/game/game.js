import PlayerComponent from "../player-component/player-component.js";

export default class Game {
    #players = [];
    #currentPlayerTurn = 0; // Index of this.#players
  
    constructor() {
      // 
    }
  
    addPlayer(user) {
        this.#players.push(user);
    }
  
    startGame() {
        const playersNotMe = document.getElementById('players-not-me');
        const playerMe = document.getElementById('player-me');
  
        let playersNotMeStr = '';
        let playerMeStr = '';
        this.#players.forEach((player, ind) => {
        player.shuffleDice();
  
        const playerComponent = new PlayerComponent(player);
        if(player.isNpc || this.#currentPlayerTurn !== ind) {
            playersNotMeStr += playerComponent.render();
        } else {
            playerMeStr += playerComponent.render(true);
        }
    })
  
        playersNotMe.innerHTML = playersNotMeStr;
        playerMe.innerHTML = playerMeStr;
    }
  
    // displayBid(name, chosen) {
    //   const dom = document.getElementById('bid-container');
    //   const str = `${name} bid: ${chosen}`
    //   dom.innerHTML = str
    // }
  }