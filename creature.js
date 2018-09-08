class Creature{

    constructor(x, y, z, icon, iconColor){
        this.x = x;
        this.y = y;
        this.z = z;
        this.items = {};
        this.icon = icon;
        this.iconColor = iconColor;
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
        Game.display.draw(this.x, this.y, icon, iconColor);
    }

    move(diff){
        return () => {
            let level = Game.level;
            let display = Game.display;
            let newX = this.x + diff.x;
            let newY = this.y + diff.y;
            let newZ = this.z + diff.z;
            if(!level.checkMovable(newX, newY, newZ)) {return;}

            level.map[this.x][this.y][this.z].creatures =
                level.map[this.x][this.y][this.z].creatures.filter(e => e !== this);
            
            this.x = newX;
            this.y = newY;
            this.z = newZ;
            level.map[this.x][this.y][this.z].creatures.push(this);
        }

    }
}


class Turtle extends Creature{

    constructor(x, y, z){
        super(x, y, z, "t", "green");
    }

    act(){

    }
}
