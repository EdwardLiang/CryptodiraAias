
class Item {
    constructor(icon, iconColor, name){
        this.icon = icon;
        this.iconColor = iconColor;
        this.name = name;
        this.displayPrecedence = 3;
        //3 bottom, 2, middle, 1 top
        //unimplemented
    }
}

class Orange extends Item{
    constructor(){
        super("&#x1F34A;", "orange", "orange");
    }
}

class Peanut extends Item{
    constructor(){
        super("&#x1F95C;", "peanut", "peanut");
    }
}
