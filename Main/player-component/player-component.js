export default class PlayerComponent {
    #user
    constructor(user) {
        this.#user = user;
    }
  
    render(toDisplayDieFace) {
        // add player info and show dice image
        return `
            <div class="player-container">
                <figure class="img-container">
                    <img src="${this.#user.imgUrl}" alt="${this.#user.name}">
                    <figcaption>${this.#user.name}</figcaption>
                </figure>
                <div class="dice-container">
                    ${this.#user.dice.map(die => {
                        if(toDisplayDieFace) {
                            return `<img class="dice-imgs" src="./Images/Dice${die.face}.png" data-player-dice-face="${die.face}"/>`
                        } else {
                            return `<img class="dice-imgs" src="./Images/Diceqm.png"/>`
                        }
                    }).join('')}
                </div>
            </div>
        `
    }
}
