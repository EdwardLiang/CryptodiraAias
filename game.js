var Game = {
    display: null,

    init(){
        this.display = new Display();
        this.engine = new Engine();
    
        this.player = new Player(1, 1, 0);
        this.level = new Level(50, 30, 5);
        //reality/physical/knowledge/thought&feeling/virtue
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

        this.level.map[6][6][0] = new WaterBlock(6,6,0);
        this.level.map[7][7][0] = new GrassBlock(7,7,0);
        this.level.map[7][8][0] = new IceBlock(7,8,0);
        this.level.map[8][7][0] = new StoneBlock(8,7,0);

        this.level.map[2][2][1] = new StoneBlock(2,2,1);
        this.level.map[2][2][2] = new StoneBlock(2,2,2);
        this.level.map[2][2][3] = new StoneBlock(2,2,3);

        this.level.map[3][3][0] = new StaircaseUpBlock(3,3,0);
        this.level.map[3][3][1] = new StaircaseDownBlock(3,3,1);
        this.level.map[4][4][1] = new StaircaseUpBlock(4,4,1);
        this.level.map[4][5][2] = new StaircaseDownBlock(4,5,2);

        this.level.map[10][10][2] = new WallBlock(10, 10, 2);

        this.level.map[20][11][2] = new WallBlock(20, 11, 2);
        this.level.map[20][12][2] = new WallBlock(20, 12, 2);
        this.level.map[20][13][2] = new WallBlock(20, 13, 2);
        this.level.map[21][10][2] = new WallBlock(21, 10, 2);
        this.level.map[22][10][2] = new WallBlock(22, 10, 2);
        this.level.map[23][10][2] = new WallBlock(23, 10, 2);
        this.level.map[23][11][2] = new WallBlock(23, 11, 2);
        this.level.map[23][12][2] = new WallBlock(23, 12, 2);
        this.level.map[23][13][2] = new WallBlock(23, 13, 2);
        this.level.map[20][10][2] = new WallBlock(20, 10, 2);
        this.level.map[6][6][2] = new StaircaseUpBlock(6,6,2);
        this.level.map[3][3][3] = new StaircaseDownBlock(3,3,3);

        this.level.map[6][6][3] = new StaircaseUpBlock(6,6,3);
        this.level.map[3][3][4] = new StaircaseDownBlock(3,3,4);
        this.level.map[3][5][4] = new GrassBlock(3,5,4);
        this.level.map[5][5][0].items.push(new Orange());

        //this.level.map[6][6][0].(new Orange());
        let t = new Turtle(6,6,0);
        let t2 = new Turtle(10,6,0);
        let t3 = new Turtle(15,6,0);
        let f = new Cat(7,7,0);
        let d = new Dog(8,8,0);
        let r = new Robot(9,9,0);
        let r2 = new Robot(10,10,0);
        let b = new Bird(10, 11, 0, this.player);
        r2.action = new MoveBoxActPredicateSucceed(r2);
        t2.action = new RandomMoveUntilFailAct(t2); 
        t2.action = new RandomMoveCancel(t2); 
        this.level.addCreature(t);
        //this.level.addCreature(t2);
        //this.level.addCreature(t3);
        this.level.addCreature(f);
        this.level.addCreature(d);
        this.level.addCreature(r);
        //this.level.addCreature(r2);
        this.level.addCreature(b);
        this.level.addCreature(this.player);

        this.display.displayLevel(this.level);
        PlayerEventListener.player = this.player;
        PlayerEventListener.level = this.level;
        PlayerEventListener.engine = this.engine;
        PlayerEventListener.display = this.display;

        window.addEventListener("keydown", PlayerEventListener);

        this.level.clearVisible();
        this.display.redraw();
    }
};
