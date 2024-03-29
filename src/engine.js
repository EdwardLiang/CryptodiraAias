class Engine {
    constructor(){
        this.events = [];
        this.nSteps = 0;
        this.messageQ = [];
        this.timer = 0;
        this.messageStayDelay = 4;
    }

    addEvent(e) {
        if(e){
            this.events.push(e);
        }
    }

    timeStep() {
        for (let i = 0; i < this.events.length; i++){
            var m = this.events[i]();
            if(m && m.length > 0){
                for (let j = 0; j < m.length; j++){
                    this.messageQ.push(m[j]);
                }
            }
        }
        this.nSteps++;
        this.events = [];
        Game.map.clearVisible();
        Game.display.redraw();

        if(!Game.realTime){
            Game.display.clearMessages();
        }
       
        if(!Game.realTime){
            if(this.messageQ.length > 0){
                if(this.messageQ.length > 1){
                    var message = this.messageQ.shift() + " --more--";
                }
                else{
                    var message = this.messageQ.shift();
                }
                Game.display.showMessage(message);
            }
        }
        else{
            while(this.messageQ.length > 0){
                var message = this.messageQ.shift();
                Game.display.showMessage(message);
            }
        }
    }
}

