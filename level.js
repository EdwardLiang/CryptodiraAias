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

            //console.log(this.map[i].length);

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

            let dir = Math.floor(Math.random() * 3);
            let cDir = CDIRS[dir];
            Game.engine.addEvent(this.creatures[i].move(cDir));
        }
    }
}


/*
   function Level(width, height, levels){
   this.map = [];
   this.width = width;
   this.height = height;
   this.levels = levels;
   this.map = new Array(width);
   for (var i = 0; i < this.map.length; i++){
   this.map[i] = new Array(height);

//console.log(this.map[i].length);

for(var j = 0; j < this.map[i].length; j++){

this.map[i][j] = new Array(levels);
for(var z = 0; z < this.map[i][j].length; z++){
this.map[i][j][z] = new MapBlock(i, j, z);
}
}
}
/*
for (var i = 0; i < this.width; i++){
for ( var j = 0; j < this.height; j++){
for (var z = 0; z < this.levels; z++){ 
var key = i + "," + j + "," + z;
this.map[key] = new MapBlock(i, j, z); 
}
}
}
}

Level.prototype.getWidth = function(){
return this.width;
}
Level.prototype.getHeight = function(){
return this.height;
}
Level.prototype.getLevels = function(){
return this.levels;
}
*/



class MapBlock{
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
        this.movable = true;
        this.icon = "";
        this.iconColor = "white";
        this.items = [];
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
    /*clearAndCalculateIcon(){
      clear();
      calculateIcon();
      }*/
    calculateIcon(){
        if(this.items.length > 0){
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

    clear(){
        this.icon = "<";
        this.iconColor = "white";
    }
}

class StaircaseDownBlock extends StaircaseBlock{
    constructor(x, y, z){
        super(x, y, z);
        this.icon = ">";
    }

    clear(){
        this.icon = ">";
        this.iconColor = "white";
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


