var updatePlayerStats = function(player){
    player.staRatio = player.sta/player.end;
    player.str = player.strBase * player.staRatio;
    player.spd = player.spdBase * player.staRatio;
    player.agl = player.aglBase * player.staRatio;
    player.hp = (player.agl + player.end)/2 * 10;
    player.staPercent = (player.staRatio * 100) + '%';
};

var collisionDetectPlayer = function(player, enemy) {
    if (player.x < enemy.x + enemy.w &&
        player.x + player.w > enemy.x &&
        player.y < enemy.y + enemy.h &&
        player.y + player.h > enemy.y) {
        return true;
    } else if(player.x < 0 || player.x > 400 || player.y < 0 || player.y > 400) {
        return true;
    }

    return false;
};

var movePlayerMouse = function (player, action) {
    player.xPrev = player.x;
    player.yPrev = player.y;
    switch(action){
        case "down":
            player.y = player.y + player.h;
            if(collisionDetectPlayer(player, player.opponent)){
                player.y = player.y - player.h;
            }
            player.isMoving = true;
            return;
        case "up":
            player.y = player.y - player.h;
            if(collisionDetectPlayer(player, player.opponent)){
                player.y = player.y + player.h;
            }
            player.isMoving = true;
            return;
        case "left":
            player.x = player.x - player.w;
            if(collisionDetectPlayer(player, player.opponent)){
                player.x = player.x + player.w;
            }
            player.isMoving = true;
            return;
        case "right":
            player.x = player.x + player.w;
            if(collisionDetectPlayer(player, player.opponent)){
                player.x = player.x - player.w;
            }

    }
    player.sta *= .97;
};
