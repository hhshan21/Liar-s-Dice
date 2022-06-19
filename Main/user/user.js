export default class User {
    #diceObj;
    constructor(name, imgUrl, isNpc, diceObj) {
        this.name = name;
        this.imgUrl = imgUrl;
        this.isNpc = isNpc
        this.#diceObj = diceObj;
        this.dice = [];
    }

    shuffleDice() {
        this.dice.length = 0; // remove all item from dice array

        for(let i=0; i<6; i++) {
            const die = this.#diceObj.getRandomDie();
            this.dice.push(die);
        }
    }
}
