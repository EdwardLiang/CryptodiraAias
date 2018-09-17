class Player extends Creature{

    constructor(x, y, z){
        //super(x, y, z, "&#50883;", "#ff0");
        //super(x, y, z, "&#1F6B6;", "#ff0");
        super(x, y, z, "&#x1F3C3", "#ff0");
    }
/*
    getStyle(e){
        super.getStyle(e);
        let image = document.createElement("img");
        image.style.height = "80%";
        e.style.top = "10%";
        image.src = "./resources/person3.png";
        //centerImage(image);
        e.appendChild(image);
    }
    */

    move(diff){
        return () => {
            let player = this;
            let map = Game.map;
            let display = Game.display;
            let newX = player.x + diff.x;
            let newY = player.y + diff.y;
            let newZ = player.z + diff.z;

            if(diff.x > 0){
                this.scale = -1;
            }
            else if(diff.x < 0){
                this.scale = 1;
            }

            let mon = map.checkAttackable(newX, newY, newZ);
            if(newZ != player.z) { }
            else if(mon){
                let messages = [];
                mon.decreaseHp(1);
                messages.push("You hit the " + mon.name); 
                if(mon.hp <= 0){
                    messages.push("The " + mon.name + " is defeated!");
                    mon.defeated = true;
                    mon.die();
                }
                return messages;
            }
            else if(!map.checkMovable(newX, newY, newZ, player)) {return;}

            let newZTemp = newZ;
            let newYTemp = newY;
            let newXTemp = newX;
            let tX = player.x;
            let tY = player.y;
            let tZ = player.z;

            //level.map[player.x][player.y][player.z].removeCreature(this);

            map.getBlock(player.x, player.y, player.z).removeCreature(this);

            player.x = newX;
            player.y = newY;
            player.z = newZ;

            map.getBlock(player.x, player.y, player.z).creature = player;
            let items = map.getBlock(player.x, player.y, player.z).items;
            let itemsSArray = [];
            if(items.length > 0){
                for(let i = 0; i < items.length; i++){
                    itemsSArray.push(items[i].name);
                }
                return ["You see here: " + itemsSArray.join(", ")];
            }

            //viewwindow setting
            display.view.offsets[player.z].xOffset = player.x - Math.floor(display.width / 2);
            var restWidth = (display.width) - (player.x - display.view.offsets[player.z].xOffset); 
            if(player.x + restWidth >= map.levels[player.z].width){
                display.view.offsets[player.z].xOffset = map.levels[player.z].width - display.width;
            }
            if(display.view.offsets[player.z].xOffset < 0){
                display.view.offsets[player.z].xOffset = 0;
            }

            display.view.offsets[player.z].yOffset = player.y - Math.floor(display.height / 2);
            var restHeight = (display.height) - (player.y - display.view.offsets[player.z].yOffset); 

            if(player.y + restHeight >= map.levels[player.z].height){
                display.view.offsets[player.z].yOffset = map.levels[player.z].height - display.height;
            }

            if(display.view.offsets[player.z].yOffset < 0){
                display.view.offsets[player.z].yOffset = 0;
            }

            if (newZTemp > tZ){
                display.setLevelOpacity(newZ, "1");
            }

            if (newZTemp < tZ){
                display.setLevelOpacity(tZ, "0.1");
            }
        }

    }
}
