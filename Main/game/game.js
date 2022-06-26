import PlayerComponent from "../player-component/player-component.js";

export default class Game {
    #players = [];
    #currentPlayerTurn = 0; // Index of this.#players

    constructor() {
        this.numOfDicePerPlayer = 5;
        this.totalDiceFace = 6;
        this.bidChoices = this.createBidChoices();
        this.numOfPlayers = this.#players.length;
    }

    // func is called once when an instance of object Game is called (based on above ppty)
    createBidChoices() {
        const bidChoices = [];

        const dicePerPlayer = this.numOfDicePerPlayer;
        const numOfPlayers = 2;

        const totalBidChoices = dicePerPlayer * numOfPlayers;

        let myTableDiv = document.getElementById('myDynamicTable')
        let table = document.createElement('table')
        let tableBody = document.createElement('tBody')
        table.appendChild(tableBody)
        
        for (let i = 1; i <= totalBidChoices; i++) {
            let tr = document.createElement('tr');
            
            tableBody.appendChild(tr)

            for (let j = 1; j <= this.totalDiceFace; j++) {

                let td = document.createElement('td');
                td.appendChild(document.createTextNode("Bids " + i + "x" + j));
                tr.appendChild(td);
                const btn = document.createElement('button')
                // document.getElementsByTagName('td').appendChild(btn)


                const diceBid = {
                    numOfDice: i,
                    dieFace: j,
                    // if already selected, dont want it to be selected again
                    isSelected: false
                }
                bidChoices.push(diceBid);
            }
        }

        myTableDiv.appendChild(table)

        return bidChoices;
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

    showMyAvailableBid() {
        const myBidContainer = document.getElementById('bid-options');
        
        const bidChoicesMarkup = this.bidChoices
            .filter((choice) => !choice.isSelected)
            .map(choice => `
                <div class="ind-bids">
                    <span>${choice.numOfDice} x </span>
                    <img src="./../Images/Dice${choice.dieFace}.png" data-bid-dice-count="${choice.numOfDice}" data-bid-dice-value="${choice.dieFace}"/>
                </div> 
            `)
            .join('');

        myBidContainer.innerHTML = bidChoicesMarkup;
        
        document.querySelectorAll('.ind-bids')
            .forEach(bid => {
                bid.addEventListener('click', this.updateBid)
            })

        // onclick="updateDiceState(1,2)"

    }

    // updateDiceState(numOfDice, dieFace) {
    //     const choice = bidChoices.find(choice => choice.numOfDice === numOfDice && choice.dieFace === dieFace)
    //     console.log(choice)
    //     choice.isSelected = true;
    //     // return choice?

    updateBid(event) {
        console.log('updating bid');
        // console.log(event)
        // console.log(event.target.dataset)
        console.log(event.target.dataset.bidDiceCount)
        console.log(event.target.dataset.bidDiceValue)
        
        const dicePerPlayer = this.numOfDicePerPlayer;
        const numOfPlayers = 2;

        const totalBidChoices = dicePerPlayer * numOfPlayers;

        for (let i = 1; i <= totalBidChoices; i++) {
            for (let j = 1; j <= this.totalDiceFace; j++) {

                if ( i < bidDiceValue && j < bidDiceValue) {

                } 
        
        // find the correct choice in this.bidChoices and update the isSelected boolean value
        // this.showMyAvailableBid()
            }
    }

    // displayBid(name, chosen) {
    //   const dom = document.getElementById('bid-container');
    //   const str = `${name} bid: ${chosen}`
    //   dom.innerHTML = str
    // }
    }


}