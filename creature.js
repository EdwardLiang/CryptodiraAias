class Creature{

    constructor(x, y, z, icon, iconColor){
        this.x = x;
        this.y = y;
        this.z = z;
        this.items = {};
        this.icon = icon;
        this.iconColor = iconColor;
        this.scale = -1;
        this.hp = 5;
        this.name = "creature";
        this.defeated = false;
        this.availableSymbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    }
    
    getStyle(e){
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
        Game.level.map[this.x][this.y][this.z].removeCreature(this);
        let itemKeys = Object.keys(this.items);
        for(let i = 0; i < itemKeys.length; i++){
            Game.level.map[this.x][this.y][this.z].items.unshift(this.items[itemKeys[i]]);
            console.log(this.items);
        }
        this.items = {};
        //Game.level.map[this.x][this.y][this.z].
    }

    move(diff){
        /*return () => {
          let level = Game.level;
          let display = Game.display;
          let newX = this.x + diff.x;
          let newY = this.y + diff.y;
          let newZ = this.z + diff.z;
          if(this.diff.x > 0){
          this.scale = -1;
          }
          else if(this.diff.x < 0){
          this.scale = 1;
          }
          if(!level.checkMovable(newX, newY, newZ)) {return;}

          level.map[this.creature.x][this.creature.y][this.creature.z].removeCreature(this.creature);

          this.x = newX;
          this.y = newY;
          this.z = newZ;
          level.map[this.x][this.y][this.z].creature = this;
          }*/

        /*if(mon.hp <= 0){
          messages.push("The " + this.name + " is defeated!");
          Game.level.creatures = Game.level.creatures.filter(e => e !== mon);
          Game.level.map[mon.x][mon.y][mon.z].removeCreature(this);
          mon.defeated = true;
          }*/
        if(this.defeated){
            return null;
        }
    }
    set action(a){
        this.act = a; 
        this.behaviorTree = this.act.behaviorTree;
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
        //if(this.defeated){
        //}
        //
        super.move(diff);
        let a = this.behaviorTree.next();
        return a.execute.bind(a);
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

