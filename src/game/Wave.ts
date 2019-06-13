// Liberapp 2019 - Tahiti Katagai
// ブロック生成

class Wave extends GameObject{

    static hardRate:number;
    waveX:number;
    count:number = 0;

    constructor() {
        super();
        Wave.hardRate = 0;

        this.waveX = 0;
    }

    update() {
        if( Player.I.x + Util.w(3/4) >= this.waveX ){
            this.newLand();
            this.count++;
            Wave.hardRate = Util.clamp( this.count / 50, 0, 1 );
        }
    }

    newLand(){
        const px = this.waveX;
        const py = Util.h(0.5) + Util.w( randF(0.1, 0.3) );
        const w = Util.w(LAND_L_PW) * 0.8;
        const h = Util.height - py;
        new Land( px+w/2, py+h/2, w, h );
        this.waveX += Util.w(LAND_L_PW);
    }
}

