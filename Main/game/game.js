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
                    this.updateBidChoices(bidDiceCount, bidDiceValue);
                    this.invokeComputerTurn(bidDiceCount, bidDiceValue);
                });
            })
    }

    showSelectedBid(diceCount, diceValue) {

        console.log('diceCount: ', diceCount);
        console.log('diceValue: ', diceValue);

        // hide bid options for player after bid selected
        const bidOptions = document.getElementById('bid-options');

        if (bidOptions.style.display === 'none') {
            bidOptions.style.display = 'flex';
        } else {
            bidOptions.style.display = 'none';
        }

        // show player's bid in selected bid div
        const showSelectedBid = document.getElementById('show-selected-bid');
        showSelectedBid.innerHTML = `
            <div class="selected-bid">
                <p>${this.#players[0].name} selected </p>
                <span>${diceCount} x </span>
                <img src="./../Images/Dice${diceValue}.png"/>
            </div> 
        `;       
    }

    invokeComputerTurn() {

        // available computer choices
        const computerAvailableChoices = this.bidChoices.filter(
            (choice) => !choice.isSelected
        );

        console.log('availableChoices: ', computerAvailableChoices);
        const randInd = getRandomNum(0, computerAvailableChoices.length);
        const computerNextBid = computerAvailableChoices[randInd];
        console.log('computerNextBid: ', computerNextBid);

        const computerDiceCount = computerNextBid.numOfDice;
        console.log('computerBidDiceCount: ', computerDiceCount);

        const computerDiceFace = computerNextBid.dieFace;
        console.log('computerBidDiceFace: ', computerDiceFace);

        this.updateBidChoices(computerDiceCount, computerDiceFace);

        // show computer's bid and liar button
        const showSelectedBid = document.getElementById('show-selected-bid');
        const computerBid = document.getElementById('computer-bid');
        const showBidOptions = document.getElementById('bid-options');

        setTimeout(function() {
            showSelectedBid.innerHTML = `
                <div class="selected-bid">
                    <span>${computerDiceCount} x </span>
                    <img src="./../Images/Dice${computerDiceFace}.png"/>
                </div> 
            `;
            computerBid.innerHTML = `
                <button id="liar">Liar</button>
            `;
            showBidOptions.style.display = 'flex';
        }, 3000)

        this.showPlayerBidChoices();
        
    }

    updateBidChoices(diceCount, diceValue) {
        this.bidChoices = this.bidChoices.map((bidChoice) => {
            let updatedChoiceIsSelectedKey = false;

            // if numOfDice is the same as diceCount, then look at dieFace value
            if (bidChoice.numOfDice < diceCount) {
                updatedChoiceIsSelectedKey = true;
            }

            if (
                parseInt(bidChoice.numOfDice) === parseInt(diceCount) && 
                parseInt(bidChoice.dieFace) <= parseInt(diceValue)
            ) {
                updatedChoiceIsSelectedKey = true;
            }

            return {
                ...bidChoice,
                isSelected: updatedChoiceIsSelectedKey,
            };
        });
    }

    clickLiar() {
        // console.log(this.#players[0].name)
        // to update clickLiar function, only pseudo code have been entered here 
        
        const liarBtn = document.getElementById('id');
        const dicesImg = document.getElementsByClassName('dice-imgs');
        liarBtn.addEventListener('click', {
            // show DJ's dice and highlight the dice number
            // highlight "you's" dice number
            // if DJ call more dice count than actual dice count, DJ lose
            // if You call more dice count than actual dice count, You lose
            
            // alert("DJ/You win/lose!", window.location.reload())
        })
        
    }
}

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
    //The maximum is exclusive and the minimum is inclusive
}