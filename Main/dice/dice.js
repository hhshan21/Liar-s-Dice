class Die {
    constructor(face) {
        this.face = face;
    }

    toHighlight(face) {
        this.isHighlighted = this.face === face
    }
}

// Holds info of a set of die
// Does the shuffling of the set of die for the die dace
export default class Dice {
    #dice = []
    constructor() {
        this.#seedDice();
    }
  
    getRandomDie() {
        return this.#dice[0];
    }
  
    #seedDice() {
        for(let i=1; i<= 6; i++) {
            const die = new Die(i);
            this.#dice.push(die);
        }
    }
}