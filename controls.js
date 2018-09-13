DIRS = {};
DIRS[72] = new Distance(-1, 0, 0); //left
DIRS[74] = new Distance(0, 1, 0); //down
DIRS[75] = new Distance(0, -1, 0); //up
DIRS[76] = new Distance(1, 0, 0); //right
DIRS[89] = new Distance(-1, -1, 0); //left up
DIRS[66] = new Distance(-1, 1, 0); //left down 
DIRS[78] = new Distance(1, 1, 0); //right down 
DIRS[85] = new Distance(1, -1, 0); //right up
DIRS[188] = new Distance(0, 0, 1);
DIRS[190] = new Distance(0, 0, -1);

let PlayerEventListener = {

    player: null,
    level: null,
    engine: null,
    display: null,

    handleEvent(e){

        let pickUp = function(){
            let player = PlayerEventListener.player;
            let level = PlayerEventListener.level;
            let display = PlayerEventListener.display;
            player.addItems(level.map[player.x][player.y][player.z].items);
            level.map[player.x][player.y][player.z].clearItems();
            if(display.inventoryVisible){
                display.hideInventory();
                display.showInventory(player.items);
            }

        };
        
        let code = e.keyCode;

        if(code == 73){
            if(this.display.inventoryVisible){
                this.display.hideInventory();
            }
            else{
                this.display.showInventory(this.player.items);
            }
        }

        if(!(code in DIRS)){return;}

        let diff = DIRS[code];

        if(code == 190 && !e.shiftKey){
            return;
        }
        if(code == 188 && !e.shiftKey){
            this.engine.addEvent(pickUp.bind(this));
            this.engine.timeStep();
            return;
        }
        if(code == 188 && e.shiftKey){
            if(!this.level.canGoUp(this.player.x, this.player.y, this.player.z)){
                return;
            }
        }
        if(code == 190 && e.shiftKey){
            if(!this.level.canGoDown(this.player.x, this.player.y, this.player.z)){
                return;
            }
        }

        this.engine.addEvent(PlayerEventListener.player.move(diff));
        this.level.creaturesAct();
        
        this.engine.timeStep();
    }

}
