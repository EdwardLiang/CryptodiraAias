availableSymbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

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
        super("%", "orange", "orange");
    }
}
