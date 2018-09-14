class Level {
    constructor(width, height, levels){
        this.map = [];
        this.creatures = [];
        this.width = width;
        this.height = height;
        this.levels = levels;
        this.backgroundColor = undefined;
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
    setZLevelColor(level, color){
        this.backgroundColor = color;
    }

    checkMovable(x, y, z, c){
        //c for creature to check internal segments
        if( x > this.map.length - 1 || x < 0 || y > this.map[0].length - 1 || y < 0 ||
                z > this.map[0][0].length || z < 0){
            return false;
        }
        if (this.map[x][y][z].checkMovable(c)){
            return true;
        }
        return false;
    }
    checkAttackable(x, y, z){
        if( x > this.map.length - 1 || x < 0 || y > this.map[0].length - 1 || y < 0 ||
                z > this.map[0][0].length || z < 0){
            return false;
        }
        if (this.map[x][y][z].checkAttackable()){
            return this.map[x][y][z].checkAttackable();
        }
        return false;
    }

    addCreature(creature){
        if(!this.map[creature.x][creature.y][creature.z].creature){
            if(!(creature === Game.player)){
                this.creatures.push(creature);
            }
            for(let x = 0; x < creature.width; x++){
                for(let y = 0; y < creature.height; y++){
                    for(let z = 0; z < creature.zLevels; z++){
                        this.map[creature.x + x][creature.y + y][creature.z + z].creature =
                            creature;
                        if(x == 0 && y == 0 && creature.scale == 1){
                            this.map[creature.x + x][creature.y + y][creature.z + z].creatureSegment = false;
                        }
                        else if(x == creature.width - 1 && y == 0 && creature.scale == -1){
                            this.map[creature.x + x][creature.y + y][creature.z + z].creatureSegment = false;
                        }

                        else{
                            this.map[creature.x + x][creature.y + y][creature.z + z].creatureSegment = true;
                        }
                    }
                }
            }

        }
        else{
            console.log("Warning! Creature overwritten!");
        }
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
            let dir = Math.floor(Math.random() * 8);
            let cDir = CDIRS[dir];
            Game.engine.addEvent(this.creatures[i].move(cDir));
        }
    }

    clearVisible(){
        let display = Game.display;
        for(let i = 0; i < display.squares.length; i++){
            for(let j = 0; j < display.squares[i].length; j++){
                for(let z = 0; z < display.squares[i][j].length; z++){
                    Game.level.map[i + display.view.xOffset][j + display.view.yOffset][z].clear();
                }
            }
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
        //this.resident = null;
        this.creatures = [];
        this.player = false;
        this.noImg = false;
        this.creatureSegment = false;
    }

    checkMovable(c) {
        if(this.creatures[0] === c){
            return true; 
        }
        else{
            return this.movable;
        }
    }

    checkAttackable(){
        //temp. Probably defer to creature again to check later.
        if(this.creatures.length > 0){
            return this.creatures[0];
        }
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
        if(this.creatures.length > 0 && !this.creatureSegment){
            this.icon = this.creatures[0].icon;
            this.iconColor = this.creatures[0].iconColor;
            this.noImg = true;
        }
        else if(this.items.length > 0){
            this.icon = this.items[0].icon;
            this.iconColor = this.items[0].iconColor;
            this.noImg = true;
        }
        else{
            this.icon = "";
            this.noImg = false;
        }
    }
    set creature(c){
        if(c != null){
            this.creatures.unshift(c);
            this.movable = false;
        }
        else if(this.creatures.length == 0){
            this.movable = true;
        }
    } 
    removeCreature(c){
        this.creatures = this.creatures.filter(e => e !== c);
        if(this.creatures.length == 0){
            this.movable = true;
        }
    }
    get creature(){
        return this.resident;
    }

    setIcon(icon, color){
        this.icon = icon;
        this.iconColor = color;
    }

    getStyle(e){
        if(this.creatures.length > 0){
            if(!this.creatureSegment){
                this.creatures[0].getTopLeftStyle(e);
            }
            this.creatures[0].getStyle(e);
        }
        if(this.creatures[0] === Game.player){
            e.style.opacity = "0.7";
        }
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
        //this.icon = "<";
    }

    /*calculateIcon(){
      this.icon = "<";
      this.iconColor = "white";
      super.calculateIcon();
      }*/
    getStyle(e){
        super.getStyle(e);
        if(!this.noImg){
            let image = document.createElement("img");
            image.style.width = "60%";
            image.src = "./resources/aiga-stairs.png";

            //centerImage(image);
            e.appendChild(image);
        }
    }

}

class StaircaseDownBlock extends StaircaseBlock{
    constructor(x, y, z){
        super(x, y, z);
        //this.icon = ">";
    }

    /*calculateIcon(){
      this.icon = ">";
      this.iconColor = "white";
      super.calculateIcon();
      }*/
    getStyle(e){
        super.getStyle(e);
        if(!this.noImg){
            let image = document.createElement("img");
            image.style.width = "60%";
            image.src = "./resources/aiga-stairs.png";
            image.style.transform = "scaleX(-1)";
            //centerImage(image);

            e.appendChild(image);
        }
    }


}

class WaterBlock extends MapBlock{
    constructor(x, y, z){
        super(x, y, z);
        this.icon = " ";
        this.iconColor = "black";
    }
    getStyle(e){
        super.getStyle(e);
        e.style.backgroundColor = "blue";
        if(!this.noImg){
            let image = document.createElement("img");
            image.style.width = "80%";
            image.src = "./resources/water-black.png";

            //centerImage(image);
            e.appendChild(image);
        }

    }

}

class GrassBlock extends MapBlock{
    constructor(x, y, z){
        super(x, y, z);
        this.icon = " ";
        this.iconColor = "black";
    }
    getStyle(e){
        super.getStyle(e);
        e.style.backgroundColor = "green";
        if(!this.noImg){
            let image = document.createElement("img");
            image.style.width = "80%";
            image.src = "./resources/grass.png";
            e.appendChild(image);
        }
    }
}

class IceBlock extends MapBlock{
    constructor(x, y, z){
        super(x, y, z);
        this.icon = " ";
        this.iconColor = "black";
    }
    getStyle(e){
        super.getStyle(e);
        e.style.backgroundColor = "white";
    }
}

class UnmovableBlock extends MapBlock{
    constructor(x, y, z){
        super(x, y, z);
        this.movable = false;
        this.icon = " ";
        this.iconColor = "black";
    }
}

class SolidBlock extends UnmovableBlock{
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

class WallBlock extends UnmovableBlock{
    constructor(x, y, z){
        super(x, y, z);
        this.icon = "&#128857;";
        this.iconColor = "AA3311";
    }
    getStyle(e){

    }
    calculateIcon(){
        this.icon = "&#128857;";
        this.iconColor = "#AA3311";
        super.calculateIcon();
    }

}

class EvergreenBlock extends MapBlock{
    constructor(x, y, z){
        super(x, y, z);
        this.icon = "&#x1F332;";
        this.iconColor = "green";
    }
    calculateIcon(){
        this.icon = "&#x1F332;";
        this.iconColor = "green";
        super.calculateIcon();
    }
    getStyle(e){
        super.getStyle(e);
        e.style.backgroundColor = "green";
    }
}

class DeciduousBlock extends MapBlock{
    constructor(x, y, z){
        super(x, y, z);
        this.icon = "&#x1F333;";
        this.iconColor = "green";
    }
    calculateIcon(){
        this.icon = "&#x1F333;";
        this.iconColor = "green";
        super.calculateIcon();
    }
    getStyle(e){
        super.getStyle(e);
        e.style.backgroundColor = "green";
    }
}



class StoneBlock extends UnmovableBlock{
    constructor(x, y, z){
        super(x, y, z);
        this.icon = " ";
        this.iconColor = "black";
    }
    getStyle(e){
        super.getStyle();
        e.style.backgroundColor = "#585858";
        let image = document.createElement("img");
        image.style.width = "100%";
        image.src = "./resources/rock2.png";
        e.appendChild(image);
    }
}


