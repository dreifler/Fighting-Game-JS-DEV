const states = {
    ATTACKING: 'Attacking',
    DEFENDING: 'Defending',
    RESTING: 'Resting'
};

var punch = function (mob) {
    mob.state = states.ATTACKING;
    mob.attacks++;
    if(checkForHit(mob)){
        mob.landed++;
        mob.opponent.hp--;
    }
    mob.sta = mob.sta * .95;
    mob.state = states.ATTACKING;
    document.getElementById("attacks-count-" + mob.name).innerHTML = mob.attacks.toString();
    document.getElementById("landed-count-" + mob.name).innerHTML = mob.landed.toString();
};

var defend = function (mob) {
    mob.state = states.DEFENDING;
};

var rest = function (mob) {
    mob.state = states.RESTING;
    mob.sta = mob.sta + ((mob.end - mob.sta) * .1);
};

var checkForHit = function(mob) {
    var mobAbility = (mob.spd + mob.str/2);
    var mobOpponentAbility = (enemy.agl + enemy.spd/2);
    if (mob.opponent.state === states.DEFENDING){
        mobOpponentAbility *= 1.5;
    } else if (mob.opponent.state === states.RESTING){
        mobOpponentAbility *= .75;
    }
    if (mob.isMoving){
        mobOpponentAbility *= .8;
    }
    var chanceToLand = mobAbility/(mobOpponentAbility + mobAbility);

    var roll = Math.random();

    if(roll < chanceToLand)
        return true;
    return false;
};

var chasePlayer = function (enemy) {
    if (enemy.opponent.x < enemy.x) {
        enemy.x = enemy.x - enemy.w;
        enemy.isMoving = true;
        if (collisionDetectEnemy(enemy)){
            enemy.x = enemy.x + enemy.w;
            enemy.state = states.DEFENDING;
        }
    }
    if (enemy.opponent.y < enemy.y) {
        enemy.y = enemy.y - enemy.h;
        enemy.isMoving = true;
        if (collisionDetectEnemy(enemy)) {
            enemy.y = enemy.y + enemy.h;
            enemy.state = states.DEFENDING;
        }
    }
    if (enemy.opponent.x > enemy.x) {
        enemy.x = enemy.x + enemy.w;
        enemy.isMoving = true;
        if (collisionDetectEnemy(enemy)) {
            enemy.x = enemy.x - enemy.w;
            enemy.state = states.DEFENDING;
        }
    }
    if (enemy.opponent.y > enemy.y) {
        enemy.y = enemy.y + enemy.h;
        enemy.isMoving = true;
        if (collisionDetectEnemy(enemy)) {
            enemy.y = enemy.y - enemy.h;
            enemy.state = states.DEFENDING;
        }
    }
};



