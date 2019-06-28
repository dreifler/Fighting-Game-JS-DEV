const MOB_WIDTH = 40;
const MOB_HEIGHT = 40;

function Mob(name, x, y, end, str, spd, agl){
        this.name = name;
        this.x = x;
        this.y = y;
        this.w = MOB_WIDTH;
        this.h = MOB_HEIGHT;
        this.attacks = 0;
        this.landed = 0;
        this.xPrev = x;
        this.yPrev = y;
        this.state = states.DEFENDING;
        this.isMoving = false;

        this.end = end;
        this.sta = this.end;
        this.staRatio = this.sta/this.end;
        this.strBase = str;
        this.spdBase = spd;
        this.aglBase = agl;
        this.str = str;
        this.spd = spd;
        this.agl = agl;
        this.hp = (this.agl + this.end)/2 * 10;
        this.staPercent = (this.staRatio * 100) + '%';

        this.opponent = null;
}