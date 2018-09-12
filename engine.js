class Engine {
    constructor(){
        this.events = [];
        this.nSteps = 0;
    }

    addEvent(e) {
        this.events.push(e);
    }

    timeStep() {
        for (let i = 0; i < this.events.length; i++){
            this.events[i]();
        }
        this.nSteps++;
        this.events = [];
        Game.level.clearVisible();
        Game.display.redraw();
    }
}

