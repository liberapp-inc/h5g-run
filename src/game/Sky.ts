// Liberapp 2019 - Tahiti Katagai
// 空

class Sky extends GameObject{
    constructor() {
        super();
        this.setShape();
    }
    setShape(){
        let shape = new egret.Shape();
        if( this.display ) GameObject.display.removeChild(this.display);
        this.display = shape;
        GameObject.display.addChild(this.display);
        shape.graphics.beginFill( SKY_COLOR, 1 );
        shape.graphics.drawRect(0, 0,  Util.width, Util.h(0.4) );
        shape.graphics.endFill();
    }
    update() {
    }
}