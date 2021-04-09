const Player1 = {
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['knife'],
    attack: function () {
        console.log(this.name + ' Fight...');
    }
}

const Player2 = {
    name: 'Sub-zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['gun'],
    attack: function () {
        console.log(this.name + ' Fight...');
    }

}

function createPlayer(playerNum, playerObj) {
    const $player = document.createElement('div');
    $player.classList.add(playerNum);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');

    const $character = document.createElement('div');
    $character.classList.add('character');

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = '100%';
    $life.innerText = playerObj.hp;

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = playerObj.name;

    const $img = document.createElement('img');
    $img.src = playerObj.img;

    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);

    // console.log($player);

    document.querySelector('.arenas').appendChild($player);
}

// createPlayer('player1', Player1.hp, Player1.name, Player1.img)
// createPlayer('player2', Player2.hp, Player2.name, Player2.img)
createPlayer('player1', Player1);
createPlayer('player2', Player2);

