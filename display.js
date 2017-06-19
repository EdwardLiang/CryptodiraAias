function Display(widthBlock = 20, heightBlock = 13, levels = 3){

    this.width = widthBlock;
    this.height = heightBlock;
    this.levels = levels;

    //this.width = "1000";
    //this.height = "500"

    this.canvases = [];
    this.squares = [];
    
    //this.generateTables(0);
    //this.generateTables(1);
    //this.generateTables(2);
    //canvas.width = (this.width) * this.blockWidth + 3;
    //canvas.height = (this.height) * this.blockHeight + 3;
};

Display.prototype.generateTables = function(level){
    var canvas = document.createElement("table"); 
    canvas.style.position = "absolute";
    canvas.style.bottom =  (14.8 - level*1) + "%";
    canvas.style.left = (10.8 - level*1) + "%";
    this.canvases.push(canvas);

    
    var width = 46 + level*1.8;
    var height = 46 + level*1.8;
    if(level == 0){
        var bC = "#734";
        var opacity = 1;
    }
    if(level == 1){
        var bC = "#777";
        var opacity = 0.1;
    }
    if(level == 2){
        var bC = "#4f5";
        var opacity = 0.1;
    }
    for(var i = 0; i < this.height; i++){
        var tr = document.createElement("tr");
        canvas.appendChild(tr);
        for (var j = 0; j < this.width; j++){
            var td = document.createElement("td");
            this.squares[j][i][level] = new DisplayBlock(j, i, level); 
            this.squares[j][i][level].td = td;
            td.style.width = width + "px";
            td.style.height = height + "px";
            td.style.overflow = "hidden";
            td.style.content = "center";
            td.style.fontSize = "25px";
            td.style.font = "25px monospace";
            td.style.textAlign = "center";
            td.style.backgroundColor = bC;
            td.style.color = "white";
            td.style.opacity = opacity;
            tr.append(td);
        }
    }
    document.body.appendChild(canvas);
}

Display.prototype.clearBody = function(){
    document.body.innerHTML = "";
}
Display.prototype.displayLevel = function(level) {
    this.width = level.getWidth();
    this.height = level.getHeight();
    this.levels = level.getLevels();

    this.squares = new Array(this.width);
    for (var i = 0; i < this.width; i++){
        this.squares[i] = new Array(this.height);
        for (var j = 0; j < this.squares[i].length; j++){
            this.squares[i][j] = new Array(this.levels);
        }
    }

    for (var i = 0; i < this.levels; i++){
        this.generateTables(i);
    }
    for(var i = 0; i < this.squares.length; i++){
        for(var j = 0; j < this.squares[i].length; j++){
            for(var z = 0; z < this.squares[i][j].length; z++){
                //console.log(this.squares);
                this.setBlock(i, j, z, level.map[i][j][z]);
                this.draw(i, j, z);
            }
        }
    }
}

Display.prototype.getBlockWidth = function() {
    return this.blockWidth;
}
Display.prototype.getBlockHeight = function() {
    return this.blockHeight;
}
function DisplayBlock(x, y, level, td){
    this.x = x;
    this.y = y;
    this.td = td;
    this.level = level;
    this.icon = "";
    this.color = "white";
    this.sty = function() {
        
    };
}

DisplayBlock.prototype.setStyle = function(s){
    this.sty = s;
}
DisplayBlock.prototype.getStyle = function(e){
    this.sty(e);
}

DisplayBlock.prototype.getX = function() {
    return this.x;
}
DisplayBlock.prototype.getY = function() {
    return this.y;
}

function getKey(x, y, level){
    return x + "," + y + "," + level;
}

Display.prototype.setBlock = function(x, y, level, block){
    this.squares[x][y][level].icon = block.getIcon();
    this.squares[x][y][level].color = block.getIconColor();
    this.squares[x][y][level].setStyle(block.getStyle);
}
Display.prototype.clearBlock = function(x, y, level){
    this.squares[x][y][level].icon = "";
    this.squares[x][y][level].color = "white";
}


Display.prototype.getContainer = function() {
    return this.canvas;   
};

Display.prototype.draw = function(x, y, level) {
    var s = this.squares[x][y][level];
    s.td.innerHTML = s.icon; 
    s.td.style.color = s.color;
    s.getStyle(s.td);
};

Display.prototype.drawIcon = function(x, y, level, icon) {
    var s = this.squares[getKey(x, y, level)];
    s.td.innerHTML = icon; 
};


Display.prototype.drawExp = function(x, y, icon, color) {
};

Display.prototype.setLevelOpacity = function(level, op){
    for(var i = 0; i < this.width; i++){
        for(var j = 0; j < this.height; j++){
            this.squares[i][j][level].td.style.opacity = op;
            this.draw(i, j, level);
        }
    }
};

Display.prototype.clear = function(x, y, level){
    var s = this.squares[x][y][level];
    s.td.innerHtml = ""; 
    s.td.style.color = "white";

    var width = 46 + level*1.8;
    var height = 46 + level*1.8;
    if(level == 0){
        var bC = "#734";
    }
    if(level == 1){
        var bC = "#777";
    }
    if(level == 2){
        var bC = "#4f5";
    }
    s.td.style.width = width + "px";
    s.td.style.height = height + "px";
    s.td.style.overflow = "hidden";
    s.td.style.content = "center";
    s.td.style.fontSize = "25px";
    s.td.style.font = "25px monospace";
    s.td.style.textAlign = "center";
    s.td.style.backgroundColor = bC;
    s.td.style.color = "white";

}

Display.prototype.drawAll = function(){
}
