import { player1, player2 } from './players.js';
import { createElem, createPlayer, getRandom } from './utils.js';
import Game from './game.js';

const $arenas = document.querySelector('.arenas');
const $button = document.querySelector('button');
const $formFight = document.querySelector('.control')
const $chat = document.querySelector('.chat');
const game = new Game({
    player1: player1,
    player2: player2
});

console.log(game);
// const { name: namePlayer1, hp: hpPlayer1 } = player1;
// const { name: namePlayer2, hp: hpPlayer2 } = player2;

const HIT = {
    head: 30,
    body: 25,
    foot: 20
};
const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

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
// function playerLose(name) {
//     const $loseTitle = createElem('div', 'loseTitle');
//     console.log($loseTitle);
//     $loseTitle.innerText = `${name} lose!`;
//     return $loseTitle;

// }

$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))

function myAttack() {
    const attack = {};
    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false;
    }
    return attack;
}

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

function showResult(player1, player2, attack, enemy) {
    if (attack.hit != enemy.defence) {
        player1.changeHP(attack.value);
        player1.renderHP(player1.elHP());
        console.log(generateLogs('hit', player2, player1, attack));
    }
    else if (attack.hit == enemy.defence) {
        console.log(generateLogs('defence', player1, player2));
    }
}

function generateLogs(type, player1, player2, attackObj) {
    const date = new Date();
    // let currentTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    let logString = '';
    switch (type) {
        case 'start':
            logString = logs.start.replace('[time]', `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`).replace('[player1]', player1.name).replace('[player2]', player2.name)
            break;
        case 'end':
            logString = logs.end[getRandom(logs.end.length - 1)].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
            break;
        case 'draw':
            logString = logs.draw;
            break;
        case 'hit':
            logString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${logs.hit[getRandom(logs.hit.length - 1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name)} - ${attackObj.value} [${player2.hp}/100]`;
            break;
        case 'defence':
            logString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${logs.defence[getRandom(logs.defence.length - 1)].replace('[playerDefence]', player1.name).replace('[playerKick]', player2.name)}`;
            break;
        default:
            logString = `Ну а на часах ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}, а у нас что-то пошло не так!!`;
            break
    }
    $chat.insertAdjacentHTML('afterbegin', `<p>${logString}</p>`);
    return logString;

}

function winPlayer(player1, player2) {
    if (player1.hp === 0 || player2.hp === 0) {
        $button.disabled = true;
        createRealoadButton();
    }
    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
        console.log(generateLogs('end', player2, player1));
    }
    else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
        console.log(generateLogs('end', player1, player2));
    }
    else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins())
        console.log(generateLogs('draw'));
    }
}
generateLogs('start', player1, player2);

$formFight.addEventListener('submit', function (event) {
    event.preventDefault();
    // console.dir($formFight);
    const enemy = enemyAttack();
    // console.log('##### enemy:  ', enemy);
    const attack = myAttack();
    // console.log('##### attack: ', attack);
    showResult(player2, player1, attack, enemy);
    showResult(player1, player2, enemy, attack);
    console.log('##### a', attack, `[${player2.hp} / 100]`);
    console.log('##### e', enemy, `[${player1.hp} / 100]`);
    winPlayer(player1, player2);

});

