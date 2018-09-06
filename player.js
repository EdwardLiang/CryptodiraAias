class Player{
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
    get key(){
        return this.x + "," + this.y;
    }
    draw(){
        Game.display.draw(this.x, this.y, "@", "#ff0");
    }
    act(){
        Game.engine.lock();
        window.addEventListener("keydown", eventListener);
    }

    _checkBox() {
        let key = this.x + "," + this.y;
        if(Game.map[key] != "("){
            alert("There is no box here!");
        }
        else{
            alert("Box is empty :(");
        }
    }   
};


