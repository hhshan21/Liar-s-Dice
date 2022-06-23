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
        
        for(let i=0; i<5; i++) {
            const die = this.#diceObj.getRandomDie();
            this.dice.push(die);
        }

        // to sort dice in ascending order
        this.dice.sort((prevVal, currentVal) => {
            return prevVal.face - currentVal.face
        })
    }
    
    
}
