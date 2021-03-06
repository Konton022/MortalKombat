import { createElem, getRandom, getTime } from '../utils/index.js';
import { HIT, ATTACK, logs } from '../constants/index.js';
import { $formFight } from '../init.js';

class Game {
    constructor(props) {
        this.player1 = props.player1;
        this.player2 = props.player2;
        this.location = props.location;
        this.button = props.button;
        this.form = props.form;
        this.chat = props.chat;
    }
    start() {
        this.player1.createPlayer();
        this.player2.createPlayer();
        this.generateLogs('start', this.player1, this.player2);


    };
    createRealoadButton() {
        const $reloadButtonDiv = createElem('div', 'reloadWrap');
        const $reloadButton = createElem('button', 'button');
        $reloadButton.innerText = 'Reload';
        $reloadButton.addEventListener('click', function () {
            window.location.reload();
        })
        $reloadButtonDiv.appendChild($reloadButton);
        this.location.appendChild($reloadButtonDiv);

    }
    generateLogs(type, player1, player2, attackObj) {
        let logString = '';
        switch (type) {
            case 'start':
                logString = logs.start.replace('[time]', `${getTime()}`)
                    .replace('[player1]', player1.name)
                    .replace('[player2]', player2.name);
                break;
            case 'end':
                logString = logs.end[getRandom(logs.end.length - 1)]
                    .replace('[playerWins]', player1.name)
                    .replace('[playerLose]', player2.name);
                break;
            case 'draw':
                logString = logs.draw;
                break;
            case 'hit':
                logString = `${getTime()} - ${logs.hit[getRandom(logs.hit.length - 1)]
                    .replace('[playerKick]', player1.name)
                    .replace('[playerDefence]', player2.name)} - ${attackObj.value} [${player2.hp}/100]`;
                break;
            case 'defence':
                logString = `${getTime()} - ${logs.defence[getRandom(logs.defence.length - 1)]
                    .replace('[playerDefence]', player1.name)
                    .replace('[playerKick]', player2.name)}`;
                break;
            default:
                logString = `???? ?? ???? ?????????? ${getTime()}, ?? ?? ?????? ??????-???? ?????????? ???? ??????!!`;
                break
        }
        this.chat.insertAdjacentHTML('afterbegin', `<p>${logString}</p>`);
        return logString;

    }
    playerWins(name) {
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
    myAttack() {
        const attack = {};
        for (let item of this.form) {
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

    enemyAttack() {
        const hit = ATTACK[getRandom(3) - 1];
        const defence = ATTACK[getRandom(3) - 1];
        // console.log('####: hit', hit);
        // console.log('####: defence', defence);

        return {
            value: getRandom(HIT[hit]),
            hit,
            defence,
        }
    }

    // getAttack = async (argHit, argDefence) => {
    //     let getResults;
    //     const body = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             hit: argHit,
    //             defence: argDefence,
    //         })

    //     }).then(res => {
    //         console.log('### res:  ', res);
    //         return res.json()
    //     }).then(data => getResults = data);
    //     console.log('### getResults: ', getResults);
    //     return getResults;
    // }

    showResult(player1, player2, attack, enemy) {
        if (attack.hit != enemy.defence) {
            player1.changeHP(attack.value);
            player1.renderHP(player1.elHP());
            console.log(this.generateLogs('hit', player2, player1, attack));
        }
        else if (attack.hit == enemy.defence) {
            console.log(this.generateLogs('defence', player1, player2));
        }
    }

    winPlayer(player1, player2) {
        if (player1.hp === 0 || player2.hp === 0) {
            this.button.disabled = true;
            this.createRealoadButton();
        }
        if (player1.hp === 0 && player1.hp < player2.hp) {
            this.location.appendChild(this.playerWins(player2.name));
            console.log(this.generateLogs('end', player2, player1));
        }
        else if (player2.hp === 0 && player2.hp < player1.hp) {
            this.location.appendChild(this.playerWins(player1.name));
            console.log(this.generateLogs('end', player1, player2));
        }
        else if (player1.hp === 0 && player2.hp === 0) {
            this.location.appendChild(this.playerWins())
            console.log(this.generateLogs('draw'));
        }
    }
}
export default Game;




