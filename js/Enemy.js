var updateEnemyStats = function(enemy){
    enemy.staRatio = enemy.sta/enemy.end;
    enemy.str = enemy.strBase * enemy.staRatio;
    enemy.spd = enemy.spdBase * enemy.staRatio;
    enemy.agl = enemy.aglBase * enemy.staRatio;
    enemy.hp = (enemy.agl + enemy.end)/2 * 10;
    enemy.staPercent = (enemy.staRatio * 100) + '%';
};

var enemyAI = function(enemy) {
    const endRatio = enemy.sta/enemy.end;
    const select = Math.random();
    if (checkPlayerInRange(enemy)) {
        return inRangeDecision(endRatio, select);
    } else {
        return outOfRangeDecision(endRatio, select)
    }
};

var inRangeDecision = function(endRatio, select) {
    if ((endRatio >= .75)) {
        if (select > .5) {
            return "punch";
        } else {
            return "defend";
        }
    } else if (endRatio > .5 && endRatio < .75) {
        if (select >= .75) {
            return "punch";
        } else if (select < .75 && select > .5) {
            return "defend";
        } else {
            return "rest"; // Add in AI to back away
        }
    } else if (endRatio <= .5) {
        return "rest";
    }
};

var outOfRangeDecision = function(endRatio, select) {
    if (endRatio >= .75) {
        return "chase";
    } else if (endRatio > .5 && endRatio < .75) {
        if (select > .5) {
            return "chase";
        } else {
            return "rest";
        }
    } else if (endRatio <= .5) {
        return "rest";
    }
};

var collisionDetectEnemy = function(enemy) {
    if (enemy.opponent.xPrev >= enemy.x - (enemy.w) &&
        enemy.opponent.xPrev <= enemy.x + (enemy.w) &&
        enemy.opponent.yPrev >= enemy.y - (enemy.h) &&
        enemy.opponent.yPrev <= enemy.y + (enemy.h)) {
        return true;
    } else {
        return false;
    }
};

var checkPlayerInRange = function(enemy) {
    if ((enemy.opponent.x === enemy.x - enemy.w ||
        enemy.opponent.x === enemy.x + enemy.w) &&
        (enemy.opponent.y === enemy.y + enemy.h ||
        enemy.opponent.y === enemy.y - enemy.h )){
        return true;
    } else
        return false;
};