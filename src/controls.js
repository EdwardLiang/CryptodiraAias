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


function itemSelector(e){
    if(!PlayerEventListener.dropping){
        Game.display.clearMessages();
        Game.display.showMessage("What do you wish to drop? Type index or * to open inventory.");
        PlayerEventListener.dropping = true;
        return;
    }

    let code = e.keyCode;
    if(code == 16){
        //shift
        return;
    }
    if(code == 56 && e.shiftKey){ 
        if(Game.display.inventoryVisible){
            Game.display.hideInventory();
            Game.display.showInventory(Game.player.items);
        }
        else{
            Game.display.showInventory(Game.player.items);
        }
    }
    else{
        let index = String.fromCharCode(code);
        if(!e.shiftKey){
            index = index.toLowerCase();
        }

        let item = Game.player.dropItem(index);
        if(item != null){
            Game.engine.addEvent(dropItem(item)); 
            Game.level.creaturesAct();
            Game.engine.timeStep();
        }
        else{
            Game.display.clearMessages();
            Game.display.showMessage("You don't have that item.");
        }
        PlayerEventListener.dropping = false;
        if(Game.display.inventoryVisible){
            Game.display.hideInventory();
        }
    }
}

function dropItem(item){
    return () => {
        return ["You dropped the: " + item.name];
    }

}

function refreshInventory(){
    if(Game.display.inventoryVisible){
        Game.display.hideInventory();
        Game.display.showInventory(Game.player.items);
    }
}


let PlayerEventListener = {

    player: null,
    level: null,
    engine: null,
    display: null,
    dropping: false,

    handleEvent(e){

        let pickUp = function(){
            let player = PlayerEventListener.player;
            let level = PlayerEventListener.level;
            let display = PlayerEventListener.display;
            player.addItems(level.map[player.x][player.y][player.z].items);
            let items = level.map[player.x][player.y][player.z].items;
            let itemsSArray = [];
            if(items.length > 0){
                for(let i = 0; i < items.length; i++){
                    itemsSArray.push(items[i].name);
                }
                level.map[player.x][player.y][player.z].clearItems();

                refreshInventory();
                return ["You pick up: " + itemsSArray.join(", ")];
            }
            else{
                return ["There's nothing to pick up here"];
            }

        };

        let code = e.keyCode;


        if(code == 32 && Game.engine.messageQ.length > 0){

            Game.display.clearMessages();
            if(Game.engine.messageQ.length > 1){
                var message = Game.engine.messageQ.shift() + " --more--";
            }
            else{
                var message = Game.engine.messageQ.shift();
            }
            Game.display.showMessage(message);
        }
        else if(Game.engine.messageQ.length > 0){
            return;
        }

        if(code == 68 && !e.shiftKey){
            itemSelector(e);
            return;
        }
        else if(this.dropping){
            itemSelector(e);
            return;
        }

        if(code == 73 && !e.shiftKey){
            //show items(i)
            if(this.display.inventoryVisible){
                this.display.hideInventory();
            }
            else{
                this.display.showInventory(this.player.items);
            }
        }

        if(code == 188 && !e.shiftKey){
            //pickup (,)
            this.engine.addEvent(pickUp.bind(this));
            if(!Game.realTime){
                this.level.creaturesAct();
                this.engine.timeStep();
            }
            return;
        }
        if(code == 190 && !e.shiftKey){
            this.level.creaturesAct();
            this.engine.timeStep();
            return;
        }

        if(!(code in DIRS)){return;}

        let diff = DIRS[code];

        if(code == 190 && !e.shiftKey){
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
        if(!Game.realTime){
            this.level.creaturesAct();
            this.engine.timeStep();
        }
    }

}
