class Distance{

    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

CDIRS = [];
CDIRS[0] = new Distance(-1, 0, 0);//left
CDIRS[1] = new Distance(0, 1, 0);//down
CDIRS[2] = new Distance(0, -1, 0);//up
CDIRS[3] = new Distance(1, 0, 0);//right
//CDIRS[4] = new Distance(0, 0, 1);
//CDIRS[5] = new Distance(0, 0, -1);

