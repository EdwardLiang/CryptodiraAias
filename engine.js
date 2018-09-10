class Engine {
    constructor(){
        this.events = [];
    }

    addEvent(e) {
        this.events.push(e);
    }

    timeStep() {
        console.log(this.events);
        for (let i = 0; i < this.events.length; i++){
            this.events[i]();
        }
        this.events = [];
        Game.level.clearVisible();
        Game.display.redraw();
    }
}

