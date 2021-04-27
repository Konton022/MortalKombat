import { createElem } from "../utils/index.js";

class Player {
    constructor(props) {
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.weapon = [props.weapon];
        this.selector = `player${this.player}`;
        this.rootSelector = props.rootSelector = 'arenas';
    }
    attack = () => console.log(`${this.name} fight.....`);
    changeHP = (randomVar) => {
        this.hp -= randomVar;
        if (this.hp <= 0) {
            this.hp = 0;
        }
        console.log(this.name + ' ' + this.hp);
        return this.hp;
    };

    elHP = () => {
        return document.querySelector(`.${this.selector} .life`)
    };

    renderHP = (getDiv) => {
        return getDiv.style.width = `${this.hp}%`;
    };
    createPlayer = () => {
        const $player = createElem('div', this.selector);
        const $progressbar = createElem('div', 'progressbar');
        const $character = createElem('div', 'character');
        const $life = createElem('div', 'life');
        const $name = createElem('div', 'name');
        const $img = createElem('img');

        $life.style.width = `${this.hp}%`;
        $img.src = this.img;
        $name.innerText = this.name;

        $player.appendChild($progressbar);
        $player.appendChild($character);
        $progressbar.appendChild($life);
        $progressbar.appendChild($name);
        $character.appendChild($img);
        const $root = document.querySelector(`.${this.rootSelector}`)
        $root.appendChild($player)
        return $player;
    }
}

export const player1 = new Player({
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: 'knife',
    // rootSelector: 'arenas'
})

export const player2 = new Player({
    player: 2,
    name: 'Sub-zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['ice sword'],
    // rootSelector: 'arenas'
})


console.log(player1, player2);