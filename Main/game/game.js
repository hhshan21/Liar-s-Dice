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
    // initial bid choices available for player
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
        console.log(bidChoices)
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
                    <img src="./Images/Dice${choice.dieFace}.png"/>
                </div> 
            `)
            .join('');

        myBidContainer.innerHTML = bidChoicesMarkup;
        
        // on selecting and clicking a bid, functions below are being called
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
                <p>${this.#players[0].name} bid </p>
                <span>${diceCount} x </span>
                <img src="./Images/Dice${diceValue}.png"/>
            </div> 
        `;       
    }

    invokeComputerTurn() {
        // available computer choices
        const computerAvailableChoices = this.bidChoices.filter(
            (choice) => !choice.isSelected
        );

        // computer's next bid
        const randInd = getRandomNum(0, computerAvailableChoices.length);
        const computerNextBid = computerAvailableChoices[randInd];

        const computerDiceCount = computerNextBid.numOfDice;

        const computerDiceFace = computerNextBid.dieFace;

        this.updateBidChoices(computerDiceCount, computerDiceFace);

        // show computer's bid and liar button
        const showSelectedBid = document.getElementById('show-selected-bid');
        const computerBid = document.getElementById('computer-bid');
        const showBidOptions = document.getElementById('bid-options');

        const { name } = this.#players[1];
        
        showSelectedBid.innerHTML = `
            <div class="selected-bid">
                <p>${ name } bid </p>
                <span id="final-dice-count" data-dice-count="${computerDiceCount}">${computerDiceCount} x </span>
                <img id="final-dice-face" src="./Images/Dice${computerDiceFace}.png" data-dice-face="${computerDiceFace}"/>
            </div> 
        `;
        computerBid.innerHTML = `
            <button id="liar">Liar</button>
        `;
        this.clickLiar();
        showBidOptions.style.display = 'flex';
        
        this.showPlayerBidChoices();
    }

    updateBidChoices(diceCount, diceValue) {

        // logic of bid choices available to player
        this.bidChoices = this.bidChoices.map((bidChoice) => {
            let updatedChoiceIsSelectedKey = false;

            // if numOfDice is the same as diceCount, then look at dieFace value.
            // Logic is based on isSelected key in createBidChoices() func
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
        const clickLiarBtn = document.querySelector('#liar');
        const bidOptionsAfterLiarClicked = document.getElementById('bid-options');

        let dJCont = document.getElementById('players-not-me').getElementsByClassName('dice-container')[0];
        
        const dJDice = this.#players[1].dice;
        
        // what happens when liar button is clicked
        clickLiarBtn.addEventListener('click', () => {
            
            // change the dice image from question mark to show the actual dice image
            Array.from(dJCont.children).forEach((imgElement, index) => {
                imgElement.src = `./Images/Dice${dJDice[index]['face']}.png`
            });

            bidOptionsAfterLiarClicked.style.display = 'none';

            const finalDiceCount = parseInt(document.querySelector('#final-dice-count').dataset.diceCount);
            
            const finalDiceFace = parseInt(document.querySelector('#final-dice-face').dataset.diceFace);

            let count = 0;
            
            // counting the total number of dices based on diceFace
            this.#players.forEach(person => {
                const diceFaces = person.dice
                diceFaces.forEach(dice => {
                    if (finalDiceFace === dice.face) {
                        count++
                    }
                })
            })

            // winning logic
            function winning() { 
                if (finalDiceCount <= count) {
                    alert(("Davy Jones won! You lost!"), window.location.reload());
                } else {
                    alert(("You won! Davy Jones lost!"), window.location.reload());
            }};

            setTimeout(winning, 2000);
            
        })
    }
}

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
    //The maximum is exclusive and the minimum is inclusive
}
