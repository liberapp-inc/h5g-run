// Liberapp 2019 - Tahiti Katagai
// ブロック生成

class Wave extends GameObject{

    static hardRate:number;
    waveX:number;
    lastPx:number;
    lastPy:number;
    type:number = 2;
    count:number = 5;

    constructor() {
        super();
        Wave.hardRate = 0;

        this.waveX = 0;
        this.lastPy = Util.h(0.5);
    }

    update() {
        if( Camera2D.x + Util.width >= this.waveX ){
            switch( this.type ){
                case 0:  this.newLand();    break;
                case 1:  this.newBumpy();   break;
                case 2:  this.newSlope();   break;
                case 3:  this.newHoles();   break;
            }
            this.count--;
            if( this.count <= 0 ){
                this.count = randI(4,12+1);
                this.type = randI(0,3+1);
            }
        }
    }

    newLand(){
        const px0 = this.waveX;
        const py0 = Util.h(0.5) + Util.w( randF(0.1, 0.3) );
        const px1 = px0 + Util.w(LAND_L_PW);
        const py1 = py0;
        new Bar( px0, py0, px1, py1 );
        this.waveX += Util.w(LAND_L_PW);
        this.lastPx = px1;
        this.lastPy = py1;
    }

    newBumpy(){
        const px0 = this.waveX;
        const py0 = Util.h(0.5) + Util.w( randF(0.1, 0.3) );
        const px1 = px0 + Util.w(LAND_M_PW);
        const py1 = py0;
        new Bar( px0, py0, px1, py1 );
        this.waveX += Util.w(LAND_M_PW);
        this.lastPx = px1;
        this.lastPy = py1;
    }
    
    newSlope(){
        const px0 = this.waveX;
        const py0 = this.lastPy;
        const px1 = px0 + Util.w(LAND_L_PW);
        const py1 = Util.h(0.5) + Util.w( randF(0.1, 0.3) );
        new Bar( px0, py0, px1, py1 );
        this.waveX += Util.w(LAND_L_PW);
        this.lastPx = px1;
        this.lastPy = py1;
    }

    newHoles(){
        const px0 = this.waveX;
        const py0 = Util.h(0.5) + Util.w( randF(0.2, 0.3) );
        const px1 = px0 + Util.w(LAND_M_PW) * randF(0.2,0.75);
        const py1 = py0;// + Util.w( randF(0.0, 0.1) );
        new Bar( px0, py0, px1, py1 );
        this.waveX += Util.w(LAND_M_PW);
        this.lastPx = px1;
        this.lastPy = py1;
    }
}

