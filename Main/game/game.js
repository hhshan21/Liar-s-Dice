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
        
        for (let i = 1; i <= totalBidChoices; i++) {
    
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

    showPlayerBidChoices() {
        const myBidContainer = document.getElementById('bid-options');
        
        // filter out isSelected and showPlayerBidChoices available
        const bidChoicesMarkup = this.bidChoices
            .filter((choice) => !choice.isSelected)
            .map(choice => `
                <div class="ind-bids" data-bid-dice-count="${choice.numOfDice}" data-bid-dice-value="${choice.dieFace}">
                    <span>${choice.numOfDice} x </span>
                    <img src="./../Images/Dice${choice.dieFace}.png"/>
                </div> 
            `)
            .join('');

        myBidContainer.innerHTML = bidChoicesMarkup;
        
        // on selecting and clicking a bid, function showSelectedBid() is called
        document.querySelectorAll('.ind-bids')
            .forEach(bid => {
                bid.addEventListener('click', (event) => {
                    const {bidDiceCount, bidDiceValue} = event.currentTarget.dataset
                    this.showSelectedBid(bidDiceCount, bidDiceValue)
                });
                bid.addEventListener('click', this.isComputerTurn)
            })

        // console.log(this.#players[0].name)
    }

    showSelectedBid(diceCount, diceValue) {

        console.log('diceCount: ', diceCount)
        console.log('diceValue: ', diceValue)

        // hide bid options for player after bid selected
        const bidOptions = document.getElementById('bid-options')

        if (bidOptions.style.display === 'none') {
            bidOptions.style.display = 'flex';
        } else {
            bidOptions.style.display = 'none';
        }

        // show player's bid in selected bid div
        const showSelectedBid = document.getElementById('show-selected-bid')
        showSelectedBid.innerHTML = `
            <div class="selected-bid">
                <p>${this.#players[0].name} selected </p>
                <span>${diceCount} x </span>
                <img src="./../Images/Dice${diceValue}.png"/>
            </div> 
        `

        const bidChoices = this.bidChoices
        const maxBid = 10
        console.log(bidChoices)
        const availableChoices = bidChoices
            .filter (choice => {
                if (choice.numOfDice > diceCount) {
                    return true
                } else {
                    if (choice.dieFace > diceValue) {
                        return true
                    }
                }
            }
        )
        console.log(availableChoices)

        // const ranNum = getRandomNum(0, availableChoices.length) // assuming this returns 1
        // const computerNextBid = availableChoices[1] // this gives { count: 2, face: 2 }
        // console.log(computerNextBid)
        
    }

    isComputerTurn(event) {
        console.log(this.isComputerTurn)
        const playerDiceCount = event.currentTarget.dataset.bidDiceCount

        const playerDiceFace = event.currentTarget.dataset.bidDiceValue

        const computerDiceCount = getRandomNum(playerDiceCount, 11)
        console.log('computerBidDiceCount: ', computerDiceCount)

        const computerDiceFace = getRandomNum(1, 7)
        console.log('computerBidDiceFace: ', computerDiceFace)

        // show computer's bid and liar button
        const showSelectedBid = document.getElementById('show-selected-bid')
        const computerBid = document.getElementById('computer-bid')
        const showBidOptions = document.getElementById('bid-options')

        setTimeout(function() {
            showSelectedBid.innerHTML = `
                <div class="selected-bid">
                    <span>${computerDiceCount} x </span>
                    <img src="./../Images/Dice${computerDiceFace}.png"/>
                </div> 
            `
            computerBid.innerHTML = `
                <button id="liar">Liar</button>
            `
            showBidOptions.style.display = 'flex'
        }, 3000)
        
    }

    // updateDiceState(numOfDice, dieFace) {
    //     const choice = bidChoices.find(choice => choice.numOfDice === numOfDice && choice.dieFace === dieFace)
    //     console.log(choice)
    //     choice.isSelected = true;
    //     // return choice?

}

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
    //The maximum is exclusive and the minimum is inclusive
}