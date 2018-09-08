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
    act(){
        let dir = Math.floor(Math.random() * 3);
        let cDir = CDIRS[dir];
        return move(cDir);
    }

    move(diff){
        return () => {
            let player = this;
            //guess where this code was copy pasted from
            let level = Game.level;
            let display = Game.display;
            let newX = player.x + diff.x;
            let newY = player.y + diff.y;
            let newZ = player.z + diff.z;
            if(!level.checkMovable(newX, newY, newZ)) {return;}

            level.map[player.x][player.y][player.z].creatures =
                level.map[player.x][player.y][player.z].creatures.filter(e => e !== this);
            
            //level.map[player.x][player.y][player.z].clear();
            player.x = newX;
            player.y = newY;
            player.z = newZ;
            level.map[player.x][player.y][player.z].creatures.push(this);

            //display.clear(player.x - display.view.xOffset, player.y - display.view.yOffset, player.z, player);
            //console.log(player.x);

            //level.map[player.x][player.y][player.z].clear();
            //display.clearBlock(player.x - display.view.xOffset, player.y - display.view.yOffset, player.z);
            //display.setBlock(player.x - display.view.xOffset, player.y - display.view.yOffset, player.z, level.map[player.x][player.y][player.z]);

            //display.draw(player.x - display.view.xOffset, player.y - display.view.yOffset, player.z);

            //let newZTemp = newZ;
            //let newYTemp = newY;
            //let newXTemp = newX;
            //let tX = player.x;
            //let tY = player.y;
            //let tZ = player.z;

            //display.clear(tX - display.view.xOffset, tY - display.view.yOffset, tZ, player);
            //level.map[player.x][player.y][player.z].setIcon(this.icon, this.iconColor);

            //display.redraw();

            //display.setBlock(player.x - display.view.xOffset, player.y - display.view.yOffset, player.z, level.map[player.x][player.y][player.z]);
            //display.draw(player.x - display.view.xOffset, player.y - display.view.yOffset, player.z);
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
