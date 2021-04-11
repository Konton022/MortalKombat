const $arenas = document.querySelector('.arenas');
const $button = document.querySelector('button');

const Player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['knife'],
    attack: function () {
        console.log(this.name + ' Fight...');
    }
}

const Player2 = {
    player: 2,
    name: 'Sub-zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['gun'],
    attack: function () {
        console.log(this.name + ' Fight...');
    }

}
function createElem(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

function createPlayer(playerObj) {
    const $player = createElem('div', 'player' + playerObj.player);
    const $progressbar = createElem('div', 'progressbar');
    const $character = createElem('div', 'character');
    const $life = createElem('div', 'life');
    const $name = createElem('div', 'name');
    const $img = createElem('img');

    $life.style.width = playerObj.hp + '%';
    $img.src = playerObj.img;
    $name.innerText = playerObj.name;

    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);

    return $player;
}

function changeHP(player) {
    const $playerLife = document.querySelector(`.player${player.player} .life`);
    player.hp -= Math.ceil(Math.random() * 20);
    $playerLife.style.width = player.hp + '%';
    console.log(player.name + ' ' + player.hp);

    if (player.hp <= 0) {
        return true;
    }
}

function playerWins(name) {
    const $winTitle = createElem('div', 'loseTitle');
    console.log($winTitle);
    $winTitle.innerText = `${name} WINS!`;
    return $winTitle;
}
function playerLose(name) {
    const $loseTitle = createElem('div', 'loseTitle');
    console.log($loseTitle);
    $loseTitle.innerText = `${name} lose!`;
    return $loseTitle;

}

$button.addEventListener('click', function () {
    console.log('CLICK!!!');
    const isLose1 = changeHP(Player1);
    const isLose2 = changeHP(Player2);
    if (isLose1) {
        $arenas.appendChild(playerWins(Player2.name))
        $button.disabled = true;
    }
    else if (isLose2) {
        $arenas.appendChild(playerWins(Player1.name));
        $button.disabled = true;
    }

})

$arenas.appendChild(createPlayer(Player1))
$arenas.appendChild(createPlayer(Player2))


