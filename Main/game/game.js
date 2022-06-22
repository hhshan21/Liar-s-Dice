import PlayerComponent from "../player-component/player-component.js";

export default class Game {
    #players = [];
    #currentPlayerTurn = 0; // Index of this.#players
  
    constructor() {
      // 
    }
    
    // passed the whole class User into the addPlayer function
    addPlayer(user) {
        this.#players.push(user);
    }
  
    startGame() {
        const computer = document.getElementById('players-not-me');
        const playerMe = document.getElementById('player-me');
  
        let computerDiceMarkup = '';
        let playerDiceMarkup = '';
        
        this.#players.forEach((player, ind) => {
            player.shuffleDice();
            
            /* how come the /shuffleDice() function can be called here?
            how come the PlayerComponent receives an argument of player? 
            Is it because the PlayerCompanent class object received an argument from user that's why can perform "player.isNpc"?*/
            const playerComponent = new PlayerComponent(player);
            // if(player.isNpc || this.#currentPlayerTurn !== ind) {
            //     playersNotMeStr += playerComponent.render();
            // } else {
            //     playerMeStr += playerComponent.render(true);
            // }

            // isNpc is a boolean value
            // .render method accepts a boolean argument whether to display dice or not
            const isPlayer = player.isPlayer
            if (isPlayer) {
                playerDiceMarkup += playerComponent.render(isPlayer);
            } else {
                computerDiceMarkup += playerComponent.render(isPlayer);
            }
        })
  
        computer.innerHTML = computerDiceMarkup;
        playerMe.innerHTML = playerDiceMarkup;
    }
  
    // displayBid(name, chosen) {
    //   const dom = document.getElementById('bid-container');
    //   const str = `${name} bid: ${chosen}`
    //   dom.innerHTML = str
    // }

    showMyAvailableBid() {
        const myBidContainer = document.getElementById('my-bid-container')

    }
}