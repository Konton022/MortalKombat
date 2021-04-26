import { player1, player2 } from '../Player/index.js';
import { createElem, createPlayer, getRandom, getTime } from '../Utils/index.js';
import { $arenas, $button, $formFight, $chat, HIT, ATTACK, logs } from '../init.js';

console.log('####currentTime is', getTime());

class Game {
    start() {
        $arenas.appendChild(createPlayer(player1))
        $arenas.appendChild(createPlayer(player2))
        this.generateLogs('start', player1, player2);


    };
    createRealoadButton() {
        const $reloadButtonDiv = createElem('div', 'reloadWrap');
        const $reloadButton = createElem('button', 'button');
        $reloadButton.innerText = 'Reload';
        $reloadButton.addEventListener('click', function () {
            window.location.reload();
        })
        $reloadButtonDiv.appendChild($reloadButton);
        $arenas.appendChild($reloadButtonDiv);

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
                logString = `Ну а на часах ${getTime()}, а у нас что-то пошло не так!!`;
                break
        }
        $chat.insertAdjacentHTML('afterbegin', `<p>${logString}</p>`);
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

    enemyAttack() {
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
    // generateLogs(type, player1, player2, attackObj) {
    //     const date = new Date();
    //     // let currentTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    //     let logString = '';
    //     switch (type) {
    //         case 'start':
    //             logString = logs.start.replace('[time]', `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`).replace('[player1]', player1.name).replace('[player2]', player2.name)
    //             break;
    //         case 'end':
    //             logString = logs.end[getRandom(logs.end.length - 1)].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
    //             break;
    //         case 'draw':
    //             logString = logs.draw;
    //             break;
    //         case 'hit':
    //             logString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${logs.hit[getRandom(logs.hit.length - 1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name)} - ${attackObj.value} [${player2.hp}/100]`;
    //             break;
    //         case 'defence':
    //             logString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${logs.defence[getRandom(logs.defence.length - 1)].replace('[playerDefence]', player1.name).replace('[playerKick]', player2.name)}`;
    //             break;
    //         default:
    //             logString = `Ну а на часах ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}, а у нас что-то пошло не так!!`;
    //             break
    //     }
    //     $chat.insertAdjacentHTML('afterbegin', `<p>${logString}</p>`);
    //     return logString;

    // }
    winPlayer(player1, player2) {
        if (player1.hp === 0 || player2.hp === 0) {
            $button.disabled = true;
            this.createRealoadButton();
        }
        if (player1.hp === 0 && player1.hp < player2.hp) {
            $arenas.appendChild(this.playerWins(player2.name));
            console.log(this.generateLogs('end', player2, player1));
        }
        else if (player2.hp === 0 && player2.hp < player1.hp) {
            $arenas.appendChild(this.playerWins(player1.name));
            console.log(this.generateLogs('end', player1, player2));
        }
        else if (player1.hp === 0 && player2.hp === 0) {
            $arenas.appendChild(this.playerWins())
            console.log(this.generateLogs('draw'));
        }
    }
}
export default Game;

