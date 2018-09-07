class Player{
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
        this.items = {};
    }
    addItems(array){
        for(let i = 0; i < array.length; i++){
            if(availableSymbols.length > 0){
                var letter = availableSymbols[0];
                availableSymbols.shift();
            }
            else{
                break;
            }
            this.items[letter] = array[i];
        }
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


