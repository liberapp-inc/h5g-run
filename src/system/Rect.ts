// Liberapp 2019 - Tahiti Katagai
// 四角形描画

class Rect extends GameObject{

    constructor( x:number, y:number, w:number, h:number, color:number ) {
        super();
        let shape = new egret.Shape();
        this.display = shape;
        GameObject.display.addChild(this.display);
        shape.graphics.beginFill( color, 1 );
        shape.graphics.drawRect(x, y, w, h);
        shape.graphics.endFill();
    }
    update() {
    }
}
