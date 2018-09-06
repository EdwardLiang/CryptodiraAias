var Game = {
    display: null,

    init(){
        this.display = new Display();
        this.engine = new Engine();
        //for(var i = 0 ; i < this.display.canvases.length; i++){
         //   document.body.appendChild(this.display.canvases[i]);
        //}
       /*this.display.drawAll();
        this.display.clear(3,3);
        this.display.squares[getKey(3,3)].icon = "@";
        this.display.squares[getKey(3,3)].color = "yellow";
        this.display.draw(3,3);*/

        /*this.level = new Level(this.display.width, this.display.height);
        this.level.map[getKey(3,3)] = new SolidBlock(3,3); 
        this.level.map[getKey(5,5)] = new WallBlock(5,5); 
        this.level.map[getKey(6,5)] = new WallBlock(6,5); 
        this.level.map[getKey(7,5)] = new WallBlock(7,5); 
        this.level.map[getKey(8,5)] = new WallBlock(8,5); 
        this.display.displayLevel(this.level);

        this.player = new Player(1,1,0);*/

        //this.level.map[this.player.getKey()].setIcon("@", "yellow");
        //this.display.clear(this.player.x, this.player.y);
        //this.display.setBlock(this.player.x, this.player.y, this.level.map[this.player.getKey()]);
        //this.display.draw(this.player.x, this.player.y);

        this.player = new Player(1, 1, 0);
        this.level = new Level(20, 15, 4);
        this.level.map[4][4][0] = new SolidBlock(4,4,0);

        this.level.map[8][6][1] = new SolidBlock(8,6,1);
        this.level.map[8][7][1] = new SolidBlock(8,7,1);
        this.level.map[8][8][1] = new SolidBlock(8,8,1);

        this.level.map[9][6][1] = new SolidBlock(9,6,1);
        this.level.map[9][7][1] = new SolidBlock(9,7,1);
        this.level.map[9][8][1] = new SolidBlock(9,8,1);

        this.level.map[8][6][2] = new SolidBlock(8,6,2);
        this.level.map[8][7][2] = new SolidBlock(8,7,2);
        this.level.map[8][8][2] = new SolidBlock(8,8,2);

        this.level.map[7][6][2] = new SolidBlock(7,6,2);
        this.level.map[7][7][2] = new SolidBlock(7,7,2);
        this.level.map[7][8][2] = new SolidBlock(7,8,2);


        this.level.map[9][6][2] = new SolidBlock(9,6,2);
        this.level.map[9][7][2] = new SolidBlock(9,7,2);
        this.level.map[9][8][2] = new SolidBlock(9,8,2);


        this.level.map[4][4][0] = new SolidBlock(4,4,0);

        this.level.map[3][3][0] = new StaircaseUpBlock(3,3,0);
        this.level.map[3][3][1] = new StaircaseDownBlock(3,3,1);
        this.level.map[4][4][1] = new StaircaseUpBlock(4,4,1);
        this.level.map[4][5][2] = new StaircaseDownBlock(4,5,2);
        this.level.map[6][6][2] = new StaircaseUpBlock(6,6,2);
        this.level.map[3][3][3] = new StaircaseDownBlock(3,3,3);

        this.display.displayLevel(this.level);
        this.level.map[1][1][0].setIcon("@", "yellow");
        this.display.setBlock(this.player.x, this.player.y, this.player.z, this.level.map[this.player.x][this.player.y][this.player.z]);
        this.display.draw(this.player.x, this.player.y, this.player.z);
        //this.display.drawIcon(1, 1, 0, "@"); 

        PlayerEventListener.player = this.player;
        PlayerEventListener.level = this.level;
        PlayerEventListener.engine = this.engine;
        PlayerEventListener.display = this.display;
        window.addEventListener("keydown", PlayerEventListener);
        this.display.drawExp(5, 5, "-", "white");
    }
};
