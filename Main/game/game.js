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

        // let myTableDiv = document.getElementById('myDynamicTable')
        // let table = document.createElement('table')
        // let tableBody = document.createElement('tBody')
        // table.appendChild(tableBody)
        
        for (let i = 1; i <= totalBidChoices; i++) {
            // let tr = document.createElement('tr');
            
            // tableBody.appendChild(tr)

            for (let j = 1; j <= this.totalDiceFace; j++) {

                // let td = document.createElement('td');
                // td.appendChild(document.createTextNode("Bids " + i + "x" + j));
                // tr.appendChild(td);
                // const btn = document.createElement('button')
                // // document.getElementsByTagName('td').appendChild(btn)

                const diceBid = {
                    numOfDice: i,
                    dieFace: j,
                    // if already selected, dont want it to be selected again
                    isSelected: false
                }
                bidChoices.push(diceBid);
            }
        }

        // myTableDiv.appendChild(table)

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

    showBidChoices() {
        const myBidContainer = document.getElementById('bid-options');
        
        // filter out isSelected and showBidChoices available
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
        
        // on selecting and clicking a bid, function updateBid() is called
        document.querySelectorAll('.ind-bids')
            .forEach(bid => {
                bid.addEventListener('click', this.updateBid)
                bid.addEventListener('click', this.isComputerTurn)
            })

        // console.log(this.#players[0].name)
    }

    updateBid(event) {

        console.log('updateBid')

        console.log(event.target.dataset.bidDiceCount)
        console.log(event.target.dataset.bidDiceValue)

        // hide bid options for player after bid selected
        const hideBidOptions = document.getElementById('bid-options')

        if (hideBidOptions.style.display === 'none') {
            hideBidOptions.style.display = 'block';
        } else {
            hideBidOptions.style.display = 'none';
        }

        // show selected bid
        const showSelectedBid = document.getElementById('show-selected-bid')
        showSelectedBid.innerHTML = `
            <div class="selected-bid">
                <span>${event.target.dataset.bidDiceCount} x </span>
                <img src="./../Images/Dice${event.target.dataset.bidDiceValue}.png"/>
            </div> 
        `

        // find the correct choice in this.bidChoices and update the isSelected boolean value
    }

    isComputerTurn(event, maxBid, maxDie) {

        const playerBid = event.target.dataset.bidDiceCount

        const returnMap = new Map()

        const computerBidOnCountOfDice = Math.floor(Math.random() * 11) // to fix to have a range
        console.log('computerBidOnCountOfDice: ', computerBidOnCountOfDice)
        // let the lower limit of this be the currentBid's bid
        // let the upper limit of this be the maxBid + 1
        const diceFace = Math.floor(Math.random() * 7) // to excl 0

        if (computerBidOnCountOfDice === (maxBid + 1)) {
            returnMap.set('computerBidOnCountOfDice', 0)
            returnMap.set('diceFace', 0)
            returnMap.set('callLiar', true)
            return returnMap
        } else {
            returnMap.set('computerBidOnCountOfDice', computerBidOnCountOfDice)
            // lower limit = 1
            // upper limit = max Die
            returnMap.set('diceFace', diceFace)
            returnMap.set('callLiar', false)
        }

        console.log(returnMap)

        // const showSelectedBid = document.getElementById('show-selected-bid')
        // showSelectedBid.innerHTML = `
        //     <div class="selected-bid">
        //         <span>${computerBidOnCountOfDice} x </span>
        //         <img src="./../Images/Dice${diceFace}.png"/>
        //     </div> 
        // `

        // create liar button after computer bid
        // const liar = document.getElementById('liar')
        // liar.disabled = false
    }

    // updateDiceState(numOfDice, dieFace) {
    //     const choice = bidChoices.find(choice => choice.numOfDice === numOfDice && choice.dieFace === dieFace)
    //     console.log(choice)
    //     choice.isSelected = true;
    //     // return choice?


}