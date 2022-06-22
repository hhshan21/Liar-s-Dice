export default class PlayerComponent {
    #user
    constructor(user) {
        this.#user = user;
    }
  
    render(toDisplayDieFace) {
        console.log(this.#user.dice)
        return `
            <div class="player-container">
                <figure class="img-container">
                    <img src="${this.#user.imgUrl}" alt="${this.#user.name}" style="width:100%">
                    <figcaption>${this.#user.name}</figcaption>
                </figure>
                <div class="dice-container">
                    ${this.#user.dice.map(die => {
                        if(toDisplayDieFace) {
                            return `<img src="../../Images/Dice${die.face}.png"/>`
                        } else {
                            return `<div class="die">-</div>`
                        }
                    }).join('')}
                </div>
            </div>
        `
    }
}