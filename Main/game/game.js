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
        
        // filter out isSelected and showBidChoices available
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
        
        // on selecting and clicking a bid, function updateBid() is called
        document.querySelectorAll('.ind-bids')
            .forEach(bid => {
                bid.addEventListener('click', this.updateBid)
                bid.addEventListener('click', this.isComputerTurn)
            })

        // console.log(this.#players[0].name)
        
    }

    updateBid(event) {

        console.log(event.currentTarget.dataset.bidDiceCount)
        console.log(event.currentTarget.dataset.bidDiceValue)

        // hide bid options for player after bid selected
        const hideBidOptions = document.getElementById('bid-options')

        if (hideBidOptions.style.display === 'none') {
            hideBidOptions.style.display = 'flex';
        } else {
            hideBidOptions.style.display = 'none';
        }

        // show player's selected bid
        const showSelectedBid = document.getElementById('show-selected-bid')
        showSelectedBid.innerHTML = `
            <div class="selected-bid">
                <span>${event.currentTarget.dataset.bidDiceCount} x </span>
                <img src="./../Images/Dice${event.currentTarget.dataset.bidDiceValue}.png"/>
            </div> 
        `

        // find the correct choice in this.bidChoices and update the isSelected boolean value
    }

    isComputerTurn(event) {
        
        const playerBidDiceCount = event.currentTarget.dataset.bidDiceCount

        const playerBidDiceFace = event.currentTarget.dataset.bidDiceValue

        const computerBidDiceCount = getRandomNum(playerBidDiceCount, 11)
        console.log('computerBidDiceCount: ', computerBidDiceCount)

        const computerBidDiceFace = getRandomNum(1, 7)
        console.log('computerBidDiceFace: ', computerBidDiceFace)


        // show computer's bid and liar button
        const showSelectedBid = document.getElementById('show-selected-bid')
        const computerBid = document.getElementById('computer-bid')
        const showBidOptions = document.getElementById('bid-options')

        setTimeout(function() {
            showSelectedBid.innerHTML = `
                <div class="selected-bid">
                    <span>${computerBidDiceCount} x </span>
                    <img src="./../Images/Dice${computerBidDiceFace}.png"/>
                </div> 
            `
            computerBid.innerHTML = `
                <button id="liar">Liar</button>
            `
            showBidOptions.style.display = 'flex'
        }, 3000)
        
    }

    isLiar () {
        const liar = document.getElementById('liar')
        liar.addEventListener('click', function() {
            document.getElementById('computer-bid').innerHTML = console.log('Hello')
        })
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