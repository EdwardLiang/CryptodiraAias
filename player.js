var Player = function(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
};

Player.prototype.getX = function(){
    return this.x;
}
Player.prototype.getY = function(){
    return this.y;
}
Player.prototype.getZ = function(){
    return this.z;
}
Player.prototype.setX = function(x){
    this.x = x;
}

Player.prototype.setY = function(y){
    this.y = y;
}
Player.prototype.setZ = function(z){
    this.z = z;
}
Player.prototype.getKey = function(){
    return this.x + "," + this.y;
}
Player.prototype.draw = function() {
    Game.display.draw(this.x, this.y, "@", "#ff0");
};
Player.prototype.act = function() {
    Game.engine.lock();
    window.addEventListener("keydown", eventListener);
}
Player.prototype._checkBox = function() {
    var key = this.x + "," + this.y;
    if(Game.map[key] != "("){
        alert("There is no box here!");
    }
    else{
        alert("Box is empty :(");
    }
}

