class Creature{

    constructor(x, y, z, icon, iconColor){
        this.x = x;
        this.y = y;
        this.z = z;
        this.width = 1;
        this.height = 1;
        this.zLevels = 1;
        this.items = {};
        this.icon = icon;
        this.iconColor = iconColor;
        this.scale = -1;
        this.hp = 5;
        this.name = "creature";
        this.defeated = false;
        this.availableSymbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    }

    getTopLeftStyle(e){
        e.style.transform = "scaleX(" + this.scale + ")";
    }

    addItems(array){
        let availableSymbols = this.availableSymbols;
        for(let i = 0; i < array.length; i++){
            if(availableSymbols.length > 0){
                var letter = availableSymbols[0];
                availableSymbols.shift();
            }
            else{
                console.log("Inventory is full! Write code for this!");
                break;
            }
            this.items[letter] = array[i];
        }
    }
    addItem(a){
        let availableSymbols = this.availableSymbols;
        if(availableSymbols.length > 0){
            var letter = availableSymbols[0];
            availableSymbols.shift();
        }
        else{
            console.log("Inventory is full! Write code for this!");
        }
        this.items[letter] = a;
    }

    get key(){
        return this.x + "," + this.y;
    }

    draw(){
        Game.display.draw(this.x, this.y, icon, iconColor);
    }

    decreaseHp(amount){
        this.hp -= amount;
        if(this.hp <= 0){
            this.defeated = true;
        }
    }

    die(){
        Game.level.creatures = Game.level.creatures.filter(e => e !== this);
        //Game.level.map[this.x][this.y][this.z].removeCreature(this);

        for(let x = 0; x < this.width; x++){
            for(let y = 0; y < this.height; y++){
                for(let z = 0; z < this.zLevels; z++){
                    Game.level.map[this.x + x][this.y + y][this.z + z]
                        .removeCreature(this);
                    Game.level.map[this.x + x][this.y + y][this.z + z].creatureSegment = false;
                }
            }
        }

        let itemKeys = Object.keys(this.items);
        for(let i = 0; i < itemKeys.length; i++){
            Game.level.map[this.x][this.y][this.z].items.unshift(this.items[itemKeys[i]]);
        }
        this.items = {};
        //Game.level.map[this.x][this.y][this.z].
    }

    move(diff){
        if(this.defeated){
            return null;
        }
    }
    set action(a){
        this.act = a; 
        this.behaviorTree = this.act.behaviorTree;
    }
    getStyle(e){

    }
}

class WaterCreature extends Creature{}

class Dolphin extends WaterCreature{
    constructor(x, y, z){
        super(x, y, z, "&#x1F42C;", "blue");
        this.act = new RandomMoveAct(this); 
        this.behaviorTree = this.act.behaviorTree;
        this.name = "Dolphin";
    }

    move(diff){
        super.move(diff);
        let a = this.behaviorTree.next();
        return a.execute.bind(a);
    }

}

class Turtle extends Creature{

    constructor(x, y, z){
        super(x, y, z, "&#x1F422;", "green");
        this.act = new RandomMoveAct(this); 
        this.behaviorTree = this.act.behaviorTree;
        this.name = "Turtle";
    }

    move(diff){
        super.move(diff);
        let a = this.behaviorTree.next();
        return a.execute.bind(a);
    }

}

class Tower extends Creature{

    constructor(x,y,z){
        super(x, y, z, "", "grey");
        this.name = "Tower";
    }
    getStyle(e){
        super.getStyle(e);
        let image = document.createElement("img");
        image.src = "./resources/tower.png";
        image.style.height = "80%";
        e.appendChild(image);
    }
}

class Elephant extends Creature{

    constructor(x, y, z){
        super(x, y, z, "&#x1F418;", "grey");
        this.icon = "";
        this.act = new RandomMoveAct(this); 
        this.behaviorTree = this.act.behaviorTree;
        this.name = "Elephant";
        this.width = 2;
        this.height = 2;
        this.zLevels = 3;
    }

    move(diff){
        super.move(diff);
        let a = this.behaviorTree.next();
        return a.execute.bind(a);
    }

    getStyle(e){
        super.getStyle(e);
        if(Game.player.z >= this.z){
            e.style.opacity = "0.6";
        }
    }

    getTopLeftStyle(e){
        super.getTopLeftStyle(e);
        let div = document.createElement("div");
        div.innerHTML = "&#x1F418;";
        //let height = Game.display.view.blockHeightPx;
        //let width = Game.display.view.blockWidthPx;

        let height = Game.display.expWidth * 0.025;
        let width = Game.display.expWidth * 0.025;
        //let size = Math.min(Math.floor(width * 0.8), Math.floor(height * 0.8)) * 2;
        let size = Game.display.expWidth * 0.8 * 0.025 * 2;
        div.style.height = height;
        div.style.maxWidth = width;
        div.style.fontSize = size;
        if(this.scale == -1){
            div.style.left = size / 2;
        }
        div.setAttribute("style","display:block;max-width:" + width + "px;height:" + height 
                + "px;font-size:" + size + "px");

        //centerImage(image);
        e.appendChild(div);

    }

}


class Bird extends Creature{

    constructor(x, y, z, target){
        super(x, y, z, "&#x1F426;", "blue");
        this.act = new DirectMoveAct(this, target); 
        this.behaviorTree = this.act.behaviorTree;
        this.name = "Bird";
    }

    move(diff){
        super.move(diff);
        let a = this.behaviorTree.next();
        return a.execute.bind(a);
    }

}


class Cat extends Creature{

    constructor(x, y, z){
        super(x, y, z, "&#x1F408;", "orange");
        //this.act = new MoveStraightAct(this, new Distance(1,0,0)); 
        this.act = new MoveBoxAct(this);
        this.behaviorTree = this.act.behaviorTree;
        this.name = "Cat";
    }

    move(diff){

        super.move(diff);
        let a = this.behaviorTree.next();
        return a.execute.bind(a);
    }

}

class Dog extends Creature{

    constructor(x, y, z){
        super(x, y, z, "&#x1F415;", "white");
        //this.act = new MoveStraightAct(this, new Distance(1,0,0)); 
        this.act = new MoveBoxActPredicate(this);
        this.behaviorTree = this.act.behaviorTree;
        this.name = "Dog";
    }

    move(diff){
        super.move(diff);
        let a = this.behaviorTree.next();
        return a.execute.bind(a);
    }

}

class Robot extends Creature{

    constructor(x, y, z){
        super(x, y, z, "&#x1F916;", "grey");
        //this.act = new MoveStraightAct(this, new Distance(1,0,0)); 
        this.act = new MoveBoxActPredicateInverse(this);
        this.behaviorTree = this.act.behaviorTree;
        this.name = "Robot";
    }

    move(diff){
        super.move(diff);
        let a = this.behaviorTree.next();
        return a.execute.bind(a);
    }

}

