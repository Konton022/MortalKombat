import { player1, player2 } from './Player/index.js';
import { $arenas, $button, $formFight, $chat } from './init.js';
import Game from './Game/index.js';
// import { getRandom, getAttack } from './utils/index.js';
const game = new Game({
    player1: player1,
    player2: player2,
    location: $arenas,
    chat: $chat,
    form: $formFight,
    button: $button,
});

console.log(game);


// const attackPlayer1 = game.myAttack();
// const gameAttack = await game.getAttack(attackPlayer1.hit, attackPlayer1.defence);
// const enemy = gameAttack.player2;
// console.log('#### enemy :', enemy);

// const attack = gameAttack.player1;
// console.log('#### attack :', attack);

game.start();

// console.log('????', gameAttack.player1, gameAttack.player2);

$formFight.addEventListener('submit', async function (event) {
    event.preventDefault();

    const getAttackData = () => {
        const myAttack = {};
        for (let item of $formFight) {
            if (item.checked && item.name === 'hit') {
                myAttack.hit = item.value;
            }
            if (item.checked && item.name === 'defence') {
                myAttack.defence = item.value;
            }
            item.checked = false;
        }
        console.log('@@@ myAttack: ', myAttack);
        return myAttack;
    }
    // const myFormData = getAttackData();
    const { hit: hitPlayer1, defence: defencePlayer1 } = getAttackData();
    // console.log('myFormData: ', myFormData);

    const body = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
        method: 'POST',
        body: JSON.stringify({
            hit: hitPlayer1,
            defence: defencePlayer1,
        })
    }).then(data => data.json())
    console.log('###body: ', body);
    // const attackData = getAttack(myFormData.hit, myFormData.defence);
    // console.log(getAttackData());
    // const attackData = getAttackData();
    // console.log('### attackData: ', attackData);
    // return attackData
    // getAttackData()
    // const q = getAttackData();
    // console.log('### q', q);
    const { player1: attackPlayer1, player2: attackPlayer2 } = body;
    const enemy = attackPlayer2;
    const attack = attackPlayer1;

    // const enemy = game.enemyAttack();
    // const attack = game.myAttack();
    // const attackPlayer1 = game.myAttack();
    // const gameAttack = await game.getAttack(attackPlayer1.hit, attackPlayer1.defence);
    // const enemy = gameAttack.player2;
    console.log('#### enemy :', enemy);

    // const attack = gameAttack.player1;
    console.log('#### attack :', attack);
    game.showResult(player2, player1, attack, enemy);
    game.showResult(player1, player2, enemy, attack);
    game.winPlayer(player1, player2);

});

