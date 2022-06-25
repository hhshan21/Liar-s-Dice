export default class User {
    #diceObj;
    constructor(name, imgUrl, isPlayer, diceObj) {
        this.name = name;
        this.imgUrl = imgUrl;
        this.isPlayer = isPlayer
        this.#diceObj = diceObj;
        this.dice = [];
    }

    shuffleDice() {
        this.dice.length = 0; // remove all item from dice array
        
        // show 5 dices
        for(let i=0; i<5; i++) {
            const die = this.#diceObj.getRandomDie();
            this.dice.push(die);
        }

        // sort dice in ascending order
        this.dice.sort((prevVal, currentVal) => prevVal.face - currentVal.face)

        console.log(this.dice)
    }    
    
    
}
