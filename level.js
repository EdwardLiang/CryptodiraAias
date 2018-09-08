class Level {
    constructor(width, height, levels){
        this.map = [];
        this.creatures = [];
        this.width = width;
        this.height = height;
        this.levels = levels;
        //this is some bad naming here.
        this.map = new Array(width);
        for (let i = 0; i < this.map.length; i++){
            this.map[i] = new Array(height);

            for(let j = 0; j < this.map[i].length; j++){
                this.map[i][j] = new Array(levels);

                for(let z = 0; z < this.map[i][j].length; z++){
                    this.map[i][j][z] = new MapBlock(i, j, z);
                }
            }
        }
    }

    checkMovable(x, y, z){
        if( x > this.map.length - 1 || x < 0 || y > this.map[0].length - 1 || y < 0 ||
                z > this.map[0][0].length || z < 0){
            return false;
        }
        if (this.map[x][y][z].checkMovable()){
            return true;
        }
        return false;
    }
    addCreature(creature){
        this.creatures.push(creature);
        this.map[creature.x][creature.y][creature.z].creatures.push(creature);
    }

    canGoUp(x, y, z){
        if (this.map[x][y][z] instanceof StaircaseUpBlock){
            return true;
        }
        return false;
    }

    canGoDown(x, y, z){
        if (this.map[x][y][z] instanceof StaircaseDownBlock){
            return true;
        }
        return false;
    }

    creaturesAct(){
       for(let i = 0; i < this.creatures.length; i++){
            let dir = Math.floor(Math.random() * 4);
            let cDir = CDIRS[dir];
            Game.engine.addEvent(this.creatures[i].move(cDir));
        }
    }
}


class MapBlock{

    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
        this.movable = true;
        this.icon = "";
        this.iconColor = "white";
        this.items = [];
        this.creatures = [];
        this.player = false;
    }

    checkMovable() {
        return this.movable;
    }

    clear() {
        this.icon = "";
        this.iconColor = "white";
        this.calculateIcon();
    }

    clearItems(){
        this.items = [];
    }

    calculateIcon(){
        if(this.player){
            this.icon = "@";
            this.iconColor = "#ff0";
        }
        else if(this.creatures.length > 0){
            this.icon = this.creatures[0].icon;
            this.iconColor = this.creatures[0].iconColor;
        }
        else if(this.items.length > 0){
            this.icon = this.items[0].icon;
            this.iconColor = this.items[0].iconColor;
        }
    }

    setIcon(icon, color){
        this.icon = icon;
        this.iconColor = color;
    }

    getStyle(e){
    }
}



class StaircaseBlock extends MapBlock{
    constructor(x, y, z){
        super(x, y, z);
    }
}

class StaircaseUpBlock extends StaircaseBlock{
    constructor(x, y, z){
        super(x, y, z);
        this.icon = "<";
    }

    calculateIcon(){
        this.icon = "<";
        this.iconColor = "white";
        super.calculateIcon();
    }
}

class StaircaseDownBlock extends StaircaseBlock{
    constructor(x, y, z){
        super(x, y, z);
        this.icon = ">";
    }

    calculateIcon(){
        this.icon = ">";
        this.iconColor = "white";
        super.calculateIcon();
    }
}

class SolidBlock extends MapBlock{
    constructor(x, y, z){
        super(x, y, z);
        this.movable = false;
        this.icon = " ";
        this.iconColor = "black";
    }
    getStyle(e){
        e.style.opacity = "0.0";
    }
}

class WallBlock extends SolidBlock{
    constructor(x, y, z){
        super(x, y, z);
        this.icon = "#";
        this.iconColor = "white";
    }
    getStyle(e){

    }
}


