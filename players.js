export const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['knife'],
    attack: function () {
        console.log(this.name + ' Fight...');
    },
    changeHP,
    elHP,
    renderHP
}
export const player2 = {
    player: 2,
    name: 'Sub-zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['ice sword'],
    attack: function () {
        console.log(this.name + ' Fight...');
    },
    changeHP,
    elHP,
    renderHP

}

function changeHP(randomVar) {
    this.hp -= randomVar;
    if (this.hp <= 0) {
        this.hp = 0;
    }
    console.log(this.name + ' ' + this.hp);
    return this.hp;
}

function elHP() {
    return document.querySelector(`.player${this.player} .life`)
}

function renderHP(getDiv) {
    return getDiv.style.width = `${this.hp}%`;
}