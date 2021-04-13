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
    },
    changeLife: changeHP,
    elhp: elHP,
    renderhp: renderHP

}

const Player2 = {
    player: 2,
    name: 'Sub-zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['gun'],
    attack: function () {
        console.log(this.name + ' Fight...');
    },
    changeLife: changeHP,
    elhp: elHP,
    renderhp: renderHP

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
function getRandom(numb) {
    return Math.ceil(Math.random() * numb)
}
// передаем случайное число урона и возвращаем остаток количества жизней игрока или ноль если ушли в минус 
function changeHP(randomVar) {
    this.hp -= randomVar;
    if (this.hp <= 0) {
        this.hp = 0;
    }
    console.log(this.name + ' ' + this.hp);
    return this.hp;
}
//возвращаем <div> <class ='.player1-2 .live' </div> 
function elHP() {
    return document.querySelector(`.player${this.player} .life`)
}
//рисуем уровень жизней в текущий <div>
function renderHP(getDiv) {
    return getDiv.style.width = `${this.hp}%`;
}

function playerWins(name) {
    const $winTitle = createElem('div', 'loseTitle');
    // console.log($winTitle);
    if (name) {
        $winTitle.innerText = `${name} WINS!`;
    }
    else {
        $winTitle.innerText = `DRAW!`;
    }
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
    Player1.changeLife(getRandom(20));
    Player2.changeLife(getRandom(20));
    Player1.renderhp(Player1.elhp());
    Player2.renderhp(Player2.elhp());


    if (Player1.hp === 0 || Player2.hp === 0) {
        $button.disabled = true;
    }
    if (Player1.hp === 0 && Player1.hp < Player2.hp) {
        $arenas.appendChild(playerWins(Player2.name))
    } else if (Player2.hp === 0 && Player2.hp < Player1.hp) {
        $arenas.appendChild(playerWins(Player1.name))
    } else if (Player1.hp === 0 && Player2.hp === 0) {
        $arenas.appendChild(playerWins())
    }

})

$arenas.appendChild(createPlayer(Player1))
$arenas.appendChild(createPlayer(Player2))


