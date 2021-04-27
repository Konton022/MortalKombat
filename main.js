import { player1, player2 } from './Player/index.js';
import { $arenas, $button, $formFight, $chat } from './init.js';
import Game from './Game/index.js';
const game = new Game({
    player1: player1,
    player2: player2,
    location: $arenas,
    chat: $chat,
    form: $formFight,
    button: $button,
});

console.log(game);

game.start();

$formFight.addEventListener('submit', function (event) {
    event.preventDefault();
    const enemy = game.enemyAttack();
    const attack = game.myAttack();
    game.showResult(player2, player1, attack, enemy);
    game.showResult(player1, player2, enemy, attack);
    game.winPlayer(player1, player2);

});

