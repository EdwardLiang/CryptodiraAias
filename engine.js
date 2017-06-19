function Engine() {
    this.events = [];
}

Engine.prototype.addEvent = function(e) {
    this.events.push(e);
}

Engine.prototype.timeStep = function() {
    for (var i = 0; i < this.events.length; i++){
        this.events[i]();
    }
    this.events = [];
}
