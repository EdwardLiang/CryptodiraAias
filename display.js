class View {
    constructor(){
        this.width = 32;
        this.height = 16;
        this.widthPx = window.innerWidth;
        this.heightPx = window.innerHeight;
        this.blockWidthPx = Math.floor(this.widthPx / 40);
        this.blockHeightPx = Math.floor(this.heightPx / 20);
        this.xOffset = 0;
        this.yOffset = 0;
    }
}
class Display {

    constructor(){
        this.view = new View();

        //this.width = "1000";
        //this.height = "500"
        this.width = this.view.width;
        this.height = this.view.height;

        this.canvases = [];
        this.squares = [];

        let canvas = document.createElement("table");
        canvas.style.position = "absolute";
        canvas.style.top = "7.4%";
        canvas.style.left = "5.4%";
        canvas.style.backgroundColor = "black";
        canvas.style.opacity = "0";
        this.inventory = canvas;
        this.inventoryVisible = false;

    }

    //this.generateTables(0);
    //this.generateTables(1);
    //this.generateTables(2);
    //canvas.width = (this.width) * this.blockWidth + 3;
    //canvas.height = (this.height) * this.blockHeight + 3;
    //
    clearInventory(){
        this.inventory.innerHTML = "";
    }
    hideInventory(){
        this.clearInventory();
        this.inventory.style.opacity = "0";
        this.inventoryVisible = false;
    }
    showInventory(items){
        let th = document.createElement("caption");

        th.style.fontSize = "25px";
        th.style.font = "25px monospace";
        th.style.color = "white";
        th.innerHTML = "Inventory";
        this.inventory.append(th);
        for(let i in items){
            let tr = document.createElement("tr");
            this.inventory.append(tr);
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            td1.style.fontSize = "25px";
            td2.style.fontSize = "25px";
            td3.style.fontSize = "25px";
            td1.style.font = "25px monospace";
            td2.style.font = "25px monospace";
            td3.style.font = "25px monospace";

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
        canvas.style.bottom =  (7.4 - level*1) + "%";
        //14.8
        canvas.style.left = (5.4 - level*1) + "%";
        //10.8
        this.canvases.push(canvas);


        //let width = 46 + level*1.8;
        //let height = 46 + level*1.8;
        let width = this.view.blockWidthPx + level*1.8;
        let height = this.view.blockHeightPx + level*1.8; 
        let bC;
        let opacity = 0.1;
        if(level % 3 == 0){
            //bC = "#734";
            bC = "#" + (734 + Math.ceil(level / 3) * 5);
        }
        if(level % 3 == 1){
            //bC = "#777";
            bC = "#" + (760 + Math.ceil(level / 3) * 5);
        }
        if(level % 3 == 2){
            //bC = "#4f5";
            //bC = "#780";

            bC = "#" + (780 + Math.ceil(level / 3) * 5);
        }
        if(level == 0){
            opacity = 1;
        }
        for(let i = 0; i < this.height; i++){
            let tr = document.createElement("tr");
            canvas.appendChild(tr);
            for (let j = 0; j < this.width; j++){
                let td = document.createElement("td");
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

    clearBody(){
        document.body.innerHTML = "";
    }
    redraw(player){
        for(let i = 0; i < this.squares.length; i++){
            for(let j = 0; j < this.squares[i].length; j++){
                for(let z = 0; z < this.squares[i][j].length; z++){
                    //console.log(this.squares);
                    this.clearBlock(i, j, z);
                    this.clear(i, j, z, player);
                    this.setBlock(i, j, z, this.level.map[i + this.view.xOffset][j + this.view.yOffset][z]);

                    //this.setBlock(i, j, z, level.map[i][j][z]);
                    this.draw(i, j, z);
                }
            }
        }
    }
    displayLevel(level) {
        //this.width = level.width;
        //this.height = level.height;
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
                    //console.log(this.squares);
                    //this.clearBlock(i, j, z);
                    //this.clear(i, j, z);
                    level.map[i + this.view.xOffset][j + this.view.yOffset][z].calculateIcon();
                    this.setBlock(i, j, z, level.map[i + this.view.xOffset][j + this.view.yOffset][z]);

                    //this.setBlock(i, j, z, level.map[i][j][z]);
                    this.draw(i, j, z);
                }
            }
        }

        document.body.appendChild(this.inventory);

    }
    /*getBlockWidth() {
      return this.blockWidth;
      }
      getBlockHeight() {
      return this.blockHeight;
      }*/


    setBlock(x, y, level, block){
        this.squares[x][y][level].icon = block.icon;
        this.squares[x][y][level].color = block.iconColor;
        this.squares[x][y][level].style = block.getStyle;
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

    clear(x, y, level, player){
        let s = this.squares[x][y][level];
        s.td.innerHtml = ""; 
       //s.td.style.color = "white";

        //let width = 46 + level*1.8;
        //let height = 46 + level*1.8;
/*
        let width = this.view.blockWidthPx + level*1.8;
        let height = this.view.blockHeightPx + level*1.8; 
        let bC;
        if(level % 3 == 0){
            bC = "#" + (734 + Math.ceil(level / 3) * 5);
        }
        if(level % 3 == 1){
            //bC = "#777";
            bC = "#" + (760 + Math.ceil(level / 3) * 5);
        }
        if(level % 3 == 2){
            //bC = "#4f5";
            //
            bC = "#" + (780 + Math.ceil(level / 3) * 5);
            //bC = "#780";
        }
        */
        /*s.td.style.width = width + "px";
        s.td.style.height = height + "px";
        s.td.style.overflow = "hidden";
        s.td.style.content = "center";
        s.td.style.fontSize = "25px";
        s.td.style.font = "25px monospace";
        s.td.style.textAlign = "center";
        s.td.style.backgroundColor = bC;
        s.td.style.color = "white";
        */
        if(s.level <= player.z){
            s.td.style.opacity = "1";
        }
        else{
            s.td.style.opacity = "0.1";
        }

    }

    
    drawAll(){
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


