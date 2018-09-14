class View {
    constructor(){
        this.width = 30;
        //this.width = 30;
        this.height = 15;
        this.widthPx = window.innerWidth;
        this.heightPx = window.innerHeight;
        this.widthPx = 1855;
        this.heightPx = 965;
        console.log(window.innerWidth);
        console.log(window.innerHeight);
        this.blockWidthPx = Math.floor(this.widthPx / 40);
        //this.blockHeightPx = Math.floor(this.heightPx / 20);
        this.blockHeightPx = Math.floor((48 / 46) * this.blockWidthPx);
        //this.height = Math.floor(this.heightPx / this.blockHeightPx) - 5;

        //this.width = Math.floor(this.widthPx / this.blockWidthPx) - 8;
        //this.minPx = Math.min(this.blockWidthPx, this.blockHeightPx);
        this.xOffset = 0;
        this.yOffset = 0;
    }
}
class Display {

    constructor(){
        this.view = new View();

        this.width = this.view.width;
        this.height = this.view.height;

        this.canvases = [];
        this.squares = [];

        this.div = document.createElement("div");
        //this.div.style.width = "1855px";
        //this.div.style.height = "965px";
        let scale = Math.min(window.innerWidth / 1855, window.innerHeight / 965);
        this.div.style.width = Math.floor(1855*scale) - 80 + "px";
        this.expWidth = 1855*scale;
        this.div.style.height = Math.floor(965*scale) - 20 + "px";
        this.expHeight = 965*scale;
        this.div.style.position = "absolute";
        document.body.appendChild(this.div);

        let canvas = document.createElement("table");
        canvas.style.position = "absolute";
        canvas.style.top = "10.4%";
        canvas.style.left = "6.4%";
        canvas.style.backgroundColor = "black";
        canvas.style.opacity = "0";
        this.inventory = canvas;
        this.inventoryVisible = false;

        let messages = document.createElement("table");
        messages.style.position = "absolute";
        messages.style.top = "5.4%";
        messages.style.left = "5.4%";
        messages.style.backgroundColor = "black";
        messages.style.opacity = "0";
        this.messages = messages;
        this.messagesVisible = false;

        this.bWidth = this.view.blockWidthPx;
        this.bHeight = this.view.blockHeightPx; 
/*
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");


        td1.style.fontSize = Math.floor(this.height * 0.8) + "px";
        td1.style.font = Math.floor(this.height * 0.8) + "px monospace";
        td1.style.color = "white";
        tr.append(td1);
        messages.append(tr);*/
    }

    clearMessages(){
        this.messages.innerHTML = "";
    }
    hideMessages(){
        this.clearMessages();
        this.messages.style.opacity = "0";
        this.messagesVisible = false;
    }

    clearInventory(){
        this.inventory.innerHTML = "";
    }
    hideInventory(){
        this.clearInventory();
        this.inventory.style.opacity = "0";
        this.inventoryVisible = false;
    }
    showMessage(message){
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");

        this.bWidth = this.view.blockWidthPx;
        this.bHeight = this.view.blockHeightPx; 

        td1.style.fontSize = Math.floor(this.bHeight * 0.6) + "px";
        td1.style.font = Math.floor(this.bHeight * 0.6) + "px monospace";
        td1.style.color = "white";
        td1.innerHTML = message;
        tr.append(td1);
        this.messages.append(tr);

        this.messages.style.opacity = "0.5";
        this.messagesVisible = true;
    }
    showInventory(items){
        let th = document.createElement("caption");

        th.style.fontSize = Math.floor(this.bHeight * 0.6) + "px";
        th.style.font = Math.floor(this.bHeight * 0.6) + "px monospace";
        th.style.color = "white";
        th.innerHTML = "Inventory";
        this.inventory.append(th);
        for(let i in items){
            let tr = document.createElement("tr");
            this.inventory.append(tr);
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            td1.style.fontSize = Math.floor(this.bHeight * 0.6) + "px";
            td2.style.fontSize = Math.floor(this.bHeight * 0.6) + "px";
            td3.style.fontSize = Math.floor(this.bHeight * 0.6) + "px";
            td1.style.font = Math.floor(this.bHeight * 0.6) + "px monospace";
            td2.style.font = Math.floor(this.bHeight * 0.6) + "px monospace";
            td3.style.font = Math.floor(this.bHeight * 0.6) + "px monospace";

            td1.style.color = "white";
            td2.style.color = "white";
            td3.style.color = "white";
            td1.innerHTML = i;
            td2.innerHTML = "-";
            td3.innerHTML = items[i].name;
            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
        }
        this.inventory.style.opacity = "0.5";
        this.inventoryVisible = true;
    }

    generateTables(level){
        let canvas = document.createElement("table"); 
        canvas.style.position = "absolute";
        canvas.style.bottom =  ((9.4) - level*1) + "%";
        canvas.style.left = ((5.4) - level*.65) + "%";
        
        this.canvases.push(canvas);

        let width = 46 + level*.8;
        let height = 46 + level*1.3;
        //let width = Math.ceil(this.view.blockWidthPx + (level/(Game.level.levels))*(this.view.blockWidthPx / this.view.width));
        //let height = Math.ceil(this.view.blockHeightPx + (level/(Game.level.levels))*(this.view.blockHeightPx / this.view.height)); 

        //width = Math.max(width, this.view.blockWidthPx + level);
        //height = Math.max(height, this.view.blockHeightPx + level);
        //canvas.style.bottom = 3 * this.view.blockHeightPx - level*(this.view.blockHeightPx / 4) + "px";
        //canvas.style.left = 2 * this.view.blockWidthPx - level*(this.view.blockWidthPx / 4) + "px";
        //
        let coeffH = 0.025 + level*0.0007;
        let coeffW = 0.025 + level*0.0004;

        if(Game.simpleLayers){
            let width = this.view.blockWidthPx;
            let height = this.view.blockHeightPx;
            canvas.style.bottom = 3 * this.view.blockHeightPx + "px";
            canvas.style.left = 2 * this.view.blockWidthPx + "px";
        }

        let bC = this.getBC(level);
        let opacity = 0.1;
        
        if(level == 0){
            opacity = 1;
        }
        let tb = document.createElement("tbody");
        tb.style.display = "block";
        canvas.appendChild(tb);
        for(let i = 0; i < this.height; i++){
            let tr = document.createElement("tr");
            tb.appendChild(tr);
            for (let j = 0; j < this.width; j++){
                let td = document.createElement("td");
                this.squares[j][i][level] = new DisplayBlock(j, i, level); 
                this.squares[j][i][level].td = td;
                //td.style.width = width + "px";
                //td.style.height = height + "px";
                td.style.width = this.expWidth * coeffW + "px";
                td.style.height = this.expWidth * coeffH + "px";
                td.style.overflow = "visible";
                td.style.content = "center";
                //td.style.display = "block";
                //td.style.fontSize = "32px";
                //td.style.fontSize = Math.min(Math.floor(width * 0.8), Math.floor(height *0.8)) + "px";
                td.style.fontSize = this.expWidth * coeffW * 0.70;
                td.align = "center";
                //td.style.font = "32px monospace";
                //td.style.font = Math.min(Math.floor(width * 0.8), Math.floor(height *0.8))  + "px monospace";
                td.style.font = this.expWidth * 0.7 * coeffW + "px monospace";
                td.style.textAlign = "center";
                td.style.backgroundColor = bC;
                td.style.color = "white";
                td.style.opacity = opacity;
                tr.append(td);
            }
        }
        this.div.appendChild(canvas);
    }

    clearBody(){
        document.body.innerHTML = "";
    }

    redraw(){
        for(let i = 0; i < this.squares.length; i++){
            for(let j = 0; j < this.squares[i].length; j++){
                for(let z = 0; z < this.squares[i][j].length; z++){
                    this.clearBlock(i, j, z);
                    this.clear(i, j, z, Game.player);
                    //this.level.map[i + this.view.xOffset][j + this.view.yOffset][z].clear();
                    this.setBlock(i, j, z, this.level.map[i + this.view.xOffset][j + this.view.yOffset][z]);
                    this.draw(i, j, z);
                }
            }
        }
        this.adjustLayerOpacity();
        twemoji.parse(document.body);
    }

    displayLevel(level) {
        this.levels = level.levels;
        this.level = level;
        if(level.width < this.view.width){
            this.width = level.width;
        }
        if(level.height < this.view.height){
            this.height = level.height;
        }

        this.squares = new Array(this.width);
        for (let i = 0; i < this.width; i++){
            this.squares[i] = new Array(this.height);
            for (let j = 0; j < this.squares[i].length; j++){
                this.squares[i][j] = new Array(this.levels);
            }
        }

        for (let i = 0; i < this.levels; i++){
            this.generateTables(i);
        }
        for(let i = 0; i < this.squares.length; i++){
            for(let j = 0; j < this.squares[i].length; j++){
                for(let z = 0; z < this.squares[i][j].length; z++){
                    level.map[i + this.view.xOffset][j + this.view.yOffset][z].calculateIcon();
                    this.setBlock(i, j, z, level.map[i + this.view.xOffset][j + this.view.yOffset][z]);
                    this.draw(i, j, z);
                }
            }
        }

        this.div.appendChild(this.inventory);
        this.div.appendChild(this.messages);
    }
    
    setBlock(x, y, level, block){
        this.squares[x][y][level].icon = block.icon;
        this.squares[x][y][level].color = block.iconColor;
        this.squares[x][y][level].style = block.getStyle.bind(block);
    }
    clearBlock(x, y, level){
        this.squares[x][y][level].icon = "";
        this.squares[x][y][level].color = "white";
    }

    get container() {
        return this.canvas;   
    };

    draw(x, y, level) {
        let s = this.squares[x][y][level];
        s.td.innerHTML = s.icon; 
        s.td.style.color = s.color;
        s.getStyle(s.td);
    };

    drawIcon(x, y, level, icon) {
        let s = this.squares[getKey(x, y, level)];
        s.td.innerHTML = icon; 
    };

    drawExp(x, y, icon, color) {
    };

    setLevelOpacity(level, op){
        for(let i = 0; i < this.width; i++){
            for(let j = 0; j < this.height; j++){
                if(this.squares[i][j][level].td.style.opacity == op){
                    return;    
                }
                this.squares[i][j][level].td.style.opacity = op;
                this.draw(i, j, level);
            }
        }
    };

    getBC(level){
        //default
        let bC;
        /*if(level == 0){
            bC = "#808080";
        }*/
        if(level.backgroundColor){
            return level.backgroundColor;
        }
        if(level % 3 == 0){
            //bC = "#734";
            bC = "#" + (540 + Math.ceil(level / 3) * 5);

            //bC = "#808080";

            //bC = "#" + (0x808080 + Math.ceil(level / 3) * 5).toString(16);
        }
        else if(level % 3 == 1){
            //bC = "#777";
            bC = "#" + (560 + Math.ceil(level / 3) * 5);

            //bC = "#" + (0x00FF00 + Math.ceil(level / 3) * 5).toString(16);

            //bC = "#" + (0x00FF00).toString(16);
        }
        else if(level % 3 == 2){
            //bC = "#4f5";
            //bC = "#780";

            bC = "#" + (600 + Math.ceil(level / 3) * 5);
        }
        return bC;

    }

    clear(x, y, level, player){
        let s = this.squares[x][y][level];
        s.td.innerHtml = ""; 
        let bC = this.getBC(level);
        let opacity = 0.1;

        s.td.className = "";
        s.td.style.backgroundColor = bC;
        s.td.style.transform = "";
        if(s.level <= player.z){
            s.td.style.opacity = "1";
        }
        else{
            s.td.style.opacity = "0.1";
        }

    }
    adjustLayerOpacity(){
        let newZ = Game.player.z;
        let newX = Game.player.x;
        let newY = Game.player.y;
        let level = Game.level;
        let display = Game.display;
/*
        let solidAbove = true;
        for(let i = newZ + 1; i < level.levels; i++){
            if(!(level.map[newX][newY][i] instanceof SolidBlock)){
                solidAbove = false; 
            }
        }
        if(solidAbove){
            for(let i = newZ + 1; i < level.levels; i++){
                display.setLevelOpacity(i, "0.5");
            }
        }
        else{
            for(let i = newZ + 1; i < level.levels; i++){
                display.setLevelOpacity(i, "0.1");
            }
        }
        */
        let solid = true;
        for(let i = newZ + 1; i < level.levels; i++){
            if(!(level.map[newX][newY][i] instanceof SolidBlock)){
                solid = false; 
            }
            if(solid){
                display.setLevelOpacity(i, "0.5");
            }
            else{
                display.setLevelOpacity(i, "0.1");
            }
        }
    }
}


class DisplayBlock{
    constructor(x, y, level, td){
        this.x = x;
        this.y = y;
        this.td = td;
        this.level = level;
        this.icon = "";
        this.color = "white";
    }
    sty(e) {

    }
    set style(s){
        this.sty = s;
    }
    getStyle(e){
        this.sty(e);
    }

}

function getKey(x, y, level){
    return x + "," + y + "," + level;
}
