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

            // .render method accepts a boolean argument whether to display dice or not
            const isPlayer = player.isPlayer
            if (isPlayer || this.#currentPlayerTurn == ind) {
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
        const myBidContainer = document.getElementById('my-bid-container');

        // create a bid options for player
        const bidOptions = document.createElement('div');
        bidOptions.setAttribute('id', 'bid-options');
        myBidContainer.appendChild(bidOptions);

        // create individual bid options for player to select
        const indBidOptions = document.createElement('div');
        indBidOptions.setAttribute('class', 'ind-bid-option');
        indBidOptions.setAttribute('dice-count', 1);
        indBidOptions.setAttribute('dice-face', 1);

        bidOptions.appendChild(indBidOptions)
        
        indBidOptions.innerHTML = 
            `<span>1 x </span>
            <img src ="./../Images/Dice1.png"/>
            `

        

        

        // `<div id='bid-options'>
        //     <div data-face='1' data-count='1'>
        //         <span>1 x </span> (same as data count)
        //         <i data-i="1" (same as data-face) data-ri class="dice die-6 small" (image)></i>
        //     </div>
        // </div>`
    }
    

    //     return `
    //     <div class="player-container">
    //         <figure class="img-container">
    //             <img src="${this.#user.imgUrl}" alt="${this.#user.name}" style="width:100%">
    //             <figcaption>${this.#user.name}</figcaption>
    //         </figure>
    //         <div class="dice-container">
    //             ${this.#user.dice.map(die => {
    //                 if(toDisplayDieFace) {
    //                     return `<img src="../../Images/Dice${die.face}.png"/>`
    //                 } else {
    //                     return `<img src="../../Images/Diceqm.png"/>`
    //                 }
    //             }).join('')}
    //         </div>
    //     </div>
    //     `
}