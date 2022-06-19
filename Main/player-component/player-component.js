export default class PlayerComponent {
    #user
    constructor(user) {
      this.#user = user;
    }
  
    render(toDisplayDieFace=false) {
      return `
        <div class="player-container">
          <figure class="img-container">
            <img src="${this.#user.imgUrl}" alt="${this.#user.name}" style="width:100%">
            <figcaption>${this.#user.name}</figcaption>
          </figure>
          <div class="dice-container">
            ${this.#user.dice.map(die => {
              if(toDisplayDieFace) {
                return `<div class="die">${die.face}</div>`
              } else {
                return `<div class="die">-</div>`
              }
            }).join('')}
          </div>
        </div>
      `
    }
  }