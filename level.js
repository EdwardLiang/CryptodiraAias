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
    }*/
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

Level.prototype.checkMovable = function(x, y, z){
    if( x > this.map.length - 1 || x < 0 || y > this.map[0].length - 1 || y < 0 ||
            z > this.map[0][0].length || z < 0){
        return false;
    }
    if (this.map[x][y][z].checkMovable()){
        return true;
    }
    return false;
}
Level.prototype.canGoUp = function(x, y, z){
    if (this.map[x][y][z] instanceof StaircaseUpBlock){
        return true;
    }
    return false;
}
Level.prototype.canGoDown = function(x, y, z){
    if (this.map[x][y][z] instanceof StaircaseDownBlock){
        return true;
    }
    return false;
}


function MapBlock(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
    this.movable = true;
    this.icon = "";
    this.iconColor = "white";
}

MapBlock.prototype.getX = function() {
    return this.x;
}
MapBlock.prototype.getY = function() {
    return this.y;
}

MapBlock.prototype.getZ = function() {
    return this.z;
}
MapBlock.prototype.checkMovable = function() {
    return this.movable;
}

MapBlock.prototype.getIcon = function() {
    return this.icon;
}
MapBlock.prototype.getIconColor = function() {
    return this.iconColor;
}

MapBlock.prototype.clear = function() {
    this.icon = "";
    this.iconColor = "white";
}
MapBlock.prototype.setIcon = function(icon, color){
    this.icon = icon;
    this.iconColor = color;
}

MapBlock.prototype.getStyle = function(e){
}

function StaircaseBlock(x, y, z){
    MapBlock.call(this, x, y, z);
}
StaircaseBlock.prototype = Object.create(MapBlock.prototype);

function StaircaseUpBlock(x, y, z){
    StaircaseBlock.call(this, x, y, z);
    this.icon = "<";
}
StaircaseUpBlock.prototype = Object.create(StaircaseBlock.prototype);
StaircaseUpBlock.prototype.clear = function() {
    this.icon = "<";
    this.iconColor = "white";
}

function StaircaseDownBlock(x, y, z){
    StaircaseBlock.call(this, x, y, z);
    this.icon = ">";
}
StaircaseDownBlock.prototype = Object.create(StaircaseBlock.prototype);
StaircaseDownBlock.prototype.clear = function() {
    this.icon = ">";
    this.iconColor = "white";
}

function SolidBlock(x, y, z){
    MapBlock.call(this, x, y, z);
    this.movable = false;
}

SolidBlock.prototype = Object.create(MapBlock.prototype);
SolidBlock.prototype.getIcon = function() {
    return " ";
}
SolidBlock.prototype.getIconColor = function() {
    return "black";
}
SolidBlock.prototype.getStyle = function(e){
    e.style.opacity = "0.0";
}

function WallBlock(x, y, z){
    SolidBlock.call(this, x, y, z);
}

WallBlock.prototype = Object.create(SolidBlock.prototype);
WallBlock.prototype.getIcon = function() {
    return "-";
}
WallBlock.prototype.getIconColor = function() {
    return "white";
}

function Distance(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
}

Distance.prototype.getX = function() {
    return this.x;
}
Distance.prototype.getY = function() {
    return this.y;
}
Distance.prototype.getZ = function() {
    return this.z;
}
