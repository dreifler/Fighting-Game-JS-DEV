const GAME_WIDTH = 400;
const GAME_HEIGHT = 400;
const START_PLAYER_X = 0;
const START_PLAYER_Y = 0;
const START_ENEMY_X = 360;
const START_ENEMY_Y = 360;

var enemy = new Mob("enemy", START_ENEMY_X, START_ENEMY_Y, 15, 15, 15, 15);
var player = new Mob("player", START_PLAYER_X, START_PLAYER_Y, 15, 15, 15, 15);

player.opponent = enemy;
enemy.opponent = player;

var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var gameLive = true;

document.getElementById('move-left').onclick = function () {
    playerTurn("left");
    enemyTurn(enemy, enemyAI(enemy));
};

document.getElementById('move-right').onclick = function () {
    playerTurn("right");
    enemyTurn(enemy, enemyAI(enemy));
};
document.getElementById('move-up').onclick = function () {
    playerTurn("up");
    enemyTurn(enemy, enemyAI(enemy));
};

document.getElementById('move-down').onclick = function () {
    playerTurn("down");
    enemyTurn(enemy, enemyAI(enemy));
};

document.getElementById('move-stand').onclick = function () {
    playerTurn("stand");
    enemyTurn(enemy, enemyAI(enemy));
};

document.getElementById('punch').onclick = function () {
    playerTurn('punch');
    enemyTurn(enemy, enemyAI(enemy));
};

document.getElementById('defend').onclick = function () {
    playerTurn('defend');
    enemyTurn(enemy, enemyAI(enemy));
};

document.getElementById('rest').onclick = function () {
    playerTurn('rest');
    enemyTurn(enemy, enemyAI(enemy));
};

var playerTurn = function(action) {
    switch(action){
        case "left":
        case "right":
        case "up":
        case "down":
            movePlayerMouse(player, action);
            break;
        case "stand":
            break;
        case "punch":
            player.state = states.ATTACKING;
            break;
        case "rest":
            player.state = states.RESTING;
            break;
        case "defend":
            player.state = states.DEFENDING;
    }
    switch(player.state) {
        case states.ATTACKING:
            punch(player);
            break;
        case states.DEFENDING:
            defend(player);
            break;
        case states.RESTING:
            rest(player);
    }
    step();
    document.getElementById("action-green").innerHTML = player.state.toString();
};

var enemyTurn = function(enemy, action) {
    switch(action){
        case "chase":
            chasePlayer(enemy);
            break;
        case "punch":
            punch(enemy);
            break;
        case "defend":
            defend(enemy);
            break;
        case "rest":
            rest(enemy);
            break;
    }
    document.getElementById("action-red").innerHTML = enemy.state.toString();
    step();
};

var update = function () {
    updatePlayerStats(player);
    updateEnemyStats(enemy);
    document.getElementById("sta-player").style.width = player.staPercent;
    document.getElementById("sta-enemy").style.width = enemy.staPercent;
};

var draw = function () {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    ctx.fillStyle = "#00FF00";
    ctx.fillRect(player.x, player.y, player.w, player.h);

    ctx.fillStyle = "#FF0000";
    ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);
    player.isMoving = false;
    enemy.isMoving = false;
};

var step = function () {
    update();
    draw();

    if (gameLive) {
        window.requestAnimationFrame(step);
    }
};

window.addEventListener("load", function () {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    ctx.fillStyle = "#00FF00";
    ctx.fillRect(player.x, player.y, player.w, player.h);

    ctx.fillStyle = "#FF0000";
    ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);
});

