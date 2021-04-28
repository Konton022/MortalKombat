import { player1, player2 } from './Player/index.js';
import { $arenas, $button, $formFight, $chat } from './init.js';
import Game from './Game/index.js';
import { getRandom } from './utils/index.js';
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

$formFight.addEventListener('submit', function (event) {
    event.preventDefault();
    const enemy = game.enemyAttack();
    const attack = game.myAttack();
    // const attackPlayer1 = game.myAttack();
    // const gameAttack = await game.getAttack(attackPlayer1.hit, attackPlayer1.defence);
    // const enemy = gameAttack.player2;
    // console.log('#### enemy :', enemy);

    // const attack = gameAttack.player1;
    // console.log('#### attack :', attack);
    game.showResult(player2, player1, attack, enemy);
    game.showResult(player1, player2, enemy, attack);
    game.winPlayer(player1, player2);

});

