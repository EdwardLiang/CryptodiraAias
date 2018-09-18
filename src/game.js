var Game = {
    display: null,
    realTime: false,
    timer: 0,
    messageStayDelay: 10,
    simpleLayers: false,

    init(){
        this.display = new Display();
        this.engine = new Engine();
    
        this.player = new Player(1, 1, 0);
        this.map = new GameMap();
        let level0 = new Level(50, 30);
        let level1 = new Level(50, 30);
        let level2 = new Level(50, 30);
        let level3 = new Level(50, 30);
        let level4 = new Level(50, 30);
        //let level5 = new Level(50, 30);
        //
        this.map.setLevel(level0, 0);
        this.map.setLevel(level1, 1);
        this.map.setLevel(level2, 2);
        this.map.setLevel(level3, 3);
        this.map.setLevel(level4, 4);
        //this.map.setLevel(level5, 5);


        //reality/knowledge/thought&feeling/virtue
        //maybe add physical between reality and knowledge 
        this.map.setBlock(4,4,0,new SolidBlock(4,4,0));
        this.map.setBlock(4,5,0,new EvergreenBlock(4,5,0));
        this.map.setBlock(4,6,0,new DeciduousBlock(4,6,0));

        this.map.setBlock(8,6,1,new SolidBlock(8,6,1));
        this.map.setBlock(8,7,1,new SolidBlock(8,7,1));
        this.map.setBlock(8,8,1,new SolidBlock(8,8,1));

        this.map.setBlock(9,6,1,new SolidBlock(9,6,1));
        this.map.setBlock(9,7,1,new SolidBlock(9,7,1));
        this.map.setBlock(9,8,1,new SolidBlock(9,8,1));

        this.map.setBlock(8,6,2,new SolidBlock(8,6,2));
        this.map.setBlock(8,7,2,new SolidBlock(8,7,2));
        this.map.setBlock(8,8,2,new SolidBlock(8,8,2));

        this.map.setBlock(7,6,2,new SolidBlock(7,6,2));
        this.map.setBlock(7,7,2,new SolidBlock(7,7,2));
        this.map.setBlock(7,8,2,new SolidBlock(7,8,2));


        this.map.setBlock(9,6,2,new SolidBlock(9,6,2));
        this.map.setBlock(9,7,2,new SolidBlock(9,7,2));
        this.map.setBlock(9,8,2,new SolidBlock(9,8,2));


        this.map.setBlock(4,4,0,new SolidBlock(4,4,0));

        this.map.setBlock(6,6,0,new WaterBlock(6,6,0));
        this.map.setBlock(7,7,0,new GrassBlock(7,7,0));
        this.map.setBlock(7,8,0,new IceBlock(7,8,0));
        this.map.setBlock(8,7,0,new StoneBlock(8,7,0));
        this.map.setBlock(9,7,0,new FountainBlock(9,7,0));

        this.map.setBlock(2,2,1,new StoneBlock(2,2,1));
        this.map.setBlock(2,2,2,new StoneBlock(2,2,2));
        this.map.setBlock(2,2,3,new StoneBlock(2,2,3));

        this.map.setBlock(3,3,0,new StaircaseUpBlock(3,3,0));
        this.map.setBlock(20,15,1,new StaircaseDownBlock(20,15,1));
        this.map.setBlock(4,4,1,new StaircaseUpBlock(4,4,1));
        this.map.setBlock(4,5,2,new StaircaseDownBlock(4,5,2));

        this.map.setBlock(10,10,2, new WallBlock(10, 10, 2));

        this.map.setBlock(20,11,2, new WallBlock(20, 11, 2));
        this.map.setBlock(20,12,2, new WallBlock(20, 12, 2));
        this.map.setBlock(20,13,2, new WallBlock(20, 13, 2));
        this.map.setBlock(21,10,2, new WallBlock(21, 10, 2));
        this.map.setBlock(22,10,2, new WallBlock(22, 10, 2));
        this.map.setBlock(23,10,2, new WallBlock(23, 10, 2));
        this.map.setBlock(23,11,2, new WallBlock(23, 11, 2));
        this.map.setBlock(23,12,2, new WallBlock(23, 12, 2));
        this.map.setBlock(23,13,2, new WallBlock(23, 13, 2));
        this.map.setBlock(20,10,2, new WallBlock(20, 10, 2));
        this.map.setBlock(6,6,2, new StaircaseUpBlock(6,6,2));
        this.map.setBlock(3,3,3, new StaircaseDownBlock(3,3,3));

        this.map.setBlock(6,6,3, new StaircaseUpBlock(6,6,3));
        this.map.setBlock(3,3,4, new StaircaseDownBlock(3,3,4));

        //this.map.setBlock(6,6,4, new StaircaseUpBlock(6,6));
        //this.map.setBlock(3,3,5, new StaircaseDownBlock(3,3));

        this.map.setBlock(7,3,0, new BookBlock(7,3));
        this.map.setBlock(3,5,4, new GrassBlock(3,5,4));
        this.map.getBlock(5,5,0).items.push(new Orange());
        this.map.getBlock(6,5,0).items.push(new BasicShirt());
        this.map.getBlock(8,5,0).items.push(new BasicPants());
        this.map.getBlock(9,5,0).items.push(new RunningShoes());



        this.map.setBlock(3,13,0, new WaterBlock(3,13,0));
        this.map.setBlock(3,14,0, new WaterBlock(3,14,0));
        this.map.setBlock(3,15,0, new WaterBlock(3,15,0));
        this.map.setBlock(4,13,0, new WaterBlock(4,13,0));
        this.map.setBlock(4,14,0, new WaterBlock(4,14,0));
        this.map.setBlock(4,15,0, new WaterBlock(4,15,0));
        this.map.setBlock(5,13,0, new WaterBlock(5,13,0));
        this.map.setBlock(5,14,0, new WaterBlock(5,14,0));
        this.map.setBlock(5,15,0, new WaterBlock(5,15,0));

        //this.level.map[6][6][0].(new Orange());
        let t = new Turtle(6,6,0);
        let t2 = new Turtle(10,6,0);
        let e = new Elephant(28, 12, 1);
        let t3 = new Turtle(15,6,0);
        let f = new Cat(7,7,0);
        let d = new Dog(8,8,0);
        let r = new Robot(9,9,0);
        let r2 = new Robot(10,10,0);
        let b = new Bird(13, 13, 0, this.player);
        let dol = new Dolphin(4, 14, 0);
        let tow = new Tower(14, 4, 0);
        b.addItem(new Peanut());
        e.addItem(new Peanut());
        r.addItem(new Battery());
        r2.actionBuilder = new MoveBoxPredicateSucceedBuilder(r2);
        t2.actionBuilder = new RandomMoveUntilFailBuilder(t2); 
        t3.actionBuilder = new RandomMoveCancelBuilder(t3); 
        this.map.addCreature(t);
        this.map.addCreature(t2);
        this.map.addCreature(t3);
        this.map.addCreature(f);
        this.map.addCreature(d);
        this.map.addCreature(r);
        this.map.addCreature(r2);
        this.map.addCreature(b);
        this.map.addCreature(e);
        this.map.addCreature(this.player);
        this.map.addCreature(dol);
        this.map.addCreature(tow);

        this.display.displayMap(this.map);
        PlayerEventListener.player = this.player;
        PlayerEventListener.map = this.map;
        PlayerEventListener.engine = this.engine;
        PlayerEventListener.display = this.display;

        window.addEventListener("keydown", PlayerEventListener);

        this.map.clearVisible();
        this.display.redraw();

        if(this.realTime){
            let loop = function(){
                if(Game.timer >= Game.messageStayDelay){
                    Game.display.clearMessages();
                    Game.engine.messageQ = [];
                    Game.timer = 0;
                }
                else{
                    Game.timer++;
                }
                Game.map.creaturesAct();
                Game.engine.timeStep();
                Game.map.clearVisible();
                Game.display.redraw();

                setTimeout(loop, 100);
            }
            loop();
        }
    }

};
