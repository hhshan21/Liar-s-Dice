import PlayerComponent from "../player-component/player-component.js";

export default class Game {
    #players = [];
    #currentPlayerTurn = 0; // Index of this.#players

    constructor() {
        this.numOfDicePerPlayer = 5;
        this.totalDiceFace = 6;
        this.bidChoices = this.createBidChoices()
    }

    createBidChoices() {
        const bidChoices = [];
        for (let i = 1; i <= this.numOfDicePerPlayer; i++) {
            for (let j = 1; j <= this.totalDiceFace; j++) {
                const diceBid = {
                    numOfDice: i,
                    dieFace: j,
                    // if already selected, dont want it to be selected again
                    isSelected: false
                }
                bidChoices.push(diceBid);
            }
        }
        return bidChoices
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

        const bidChoicesMarkup = this.bidChoices
            .filter((choice) => !choice.isSelected)
            .map(choice => `
                <div class="ind-bids">
                    <span>${choice.numOfDice} x </span>
                    <img src="./../Images/Dice${choice.dieFace}.png"/>
                </div> 
            `)
            .join('')

        myBidContainer.innerHTML = bidChoicesMarkup


        console.log(document.getElementsByClassName('ind-bids'))
        console.log(document.getElementsByClassName('ind-bids')[0])
        // .forEach(element => {
        //     element.addEventListener('click', this.updateBid)
        // })
        document.getElementsByClassName('ind-bids')[0].addEventListener('click', this.updateBid)

        // onclick="updateDiceState(1,2)"

        // function updateDiceState(numOfDice, dieFace) {
        //     const choice = bidChoices.find(choice => choice.numOfDice === numOfDice && choice.dieFace === dieFace)
        //     choice.isSelected = true;
        //     return choice?
    }

    updateBid() {
        console.log('updating bid')
        // find the correct choice in this.bidChoices and update the isSelected boolean value
        // this.showMyAvailableBid()
    }


}