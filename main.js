const $arenas = document.querySelector('.arenas');
const $button = document.querySelector('button');
const $formFight = document.querySelector('.control')
const HIT = {
    head: 30,
    body: 25,
    foot: 20
};
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
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
const player2 = {
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
function createRealoadButton() {
    const $reloadButtonDiv = createElem('div', 'reloadWrap');
    const $reloadButton = createElem('button', 'button');
    $reloadButton.innerText = 'Reload';
    $reloadButton.addEventListener('click', function () {
        window.location.reload();
    })
    $reloadButtonDiv.appendChild($reloadButton);
    $arenas.appendChild($reloadButtonDiv);

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

// $button.addEventListener('click', function () {
//     console.log('CLICK!!!');
//     player1.changeHP(getRandom(20));
//     player2.changeHP(getRandom(20));
//     player1.renderHP(player1.elHP());
//     player2.renderHP(player2.elHP());


//     if (player1.hp === 0 || player2.hp === 0) {
//         $button.disabled = true;
//         createRealoadButton();
//     }
//     if (player1.hp === 0 && player1.hp < player2.hp) {
//         $arenas.appendChild(playerWins(player2.name))
//     } else if (player2.hp === 0 && player2.hp < player1.hp) {
//         $arenas.appendChild(playerWins(player1.name))
//     } else if (player1.hp === 0 && player2.hp === 0) {
//         $arenas.appendChild(playerWins())
//     }

// })

$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    console.log('####: hit', hit);
    console.log('####: defence', defence);

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

function compareHits(player, attack, enemy) {
    if (attack.hit != enemy.defence) {
        player.changeHP(attack.value);
        player.renderHP(player.elHP())
    }
}

$formFight.addEventListener('submit', function (event) {
    event.preventDefault();
    // console.dir($formFight);
    const enemy = enemyAttack();
    console.log('##### enemy:  ', enemy);

    const attack = {};
    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom (HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false;
    }
    console.log ('##### a', attack);
    console.log ('##### e', enemy );
    compareHits(player2, attack, enemy);
    compareHits(player1, enemy, attack);

    if (player1.hp === 0 || player2.hp === 0) {
                 $button.disabled = true;
                 createRealoadButton();
             }
             if (player1.hp === 0 && player1.hp < player2.hp) {
                 $arenas.appendChild(playerWins(player2.name))
             } else if (player2.hp === 0 && player2.hp < player1.hp) {
                 $arenas.appendChild(playerWins(player1.name))
             } else if (player1.hp === 0 && player2.hp === 0) {
                 $arenas.appendChild(playerWins())
             }
})




