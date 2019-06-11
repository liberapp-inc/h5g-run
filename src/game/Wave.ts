// Liberapp 2019 - Tahiti Katagai
// ブロック生成

class Wave extends GameObject{

    static hardRate:number;
    waveX:number;
    count:number = 0;

    constructor() {
        super();
        Wave.hardRate = 0;

        this.waveX = Util.w(1);
    }

    update() {
        if( Player.I.state == Player.I.stateNone ) return;

        if( Player.I.x + Util.w(2/3) >= this.waveX ){
            // todo new
            this.count++;
            Wave.hardRate = Util.clamp( this.count / 50, 0, 1 );
        }
    }

    newLand(){
        let px = this.waveX;
        let py = Util.h(0.5) + Util.w( randF(-0.3, +0.3) * Util.lerp(0.7, 1, Wave.hardRate) );
        // Land.newLand( px, py, type, Wave.hardRate );
        // this.waveX += Util.w(LAND_INTER_PER_W);
    }
}

