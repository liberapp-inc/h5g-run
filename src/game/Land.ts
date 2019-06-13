// Liberapp 2019 - Tahiti Katagai
// 地形

class Land extends PhysicsObject{

    x:number;
    y:number;
    w:number;
    h:number;

    // 長四角
    constructor( px:number, py:number, w:number, h:number ){
        super();

        this.x = px;
        this.y = py;
        this.w  = w;
        this.h  = h;
        this.setDisplay( px, py );
        this.setBody( px, py );
        this.display.rotation = this.body.angle * 180 / Math.PI;
        Camera2D.transform( this.display );
    }

    setDisplay( px:number, py:number ){
        if( this.display )
            GameObject.display.removeChild( this.display );

        const shape = new egret.Shape();
        this.display = shape;
        GameObject.display.addChildAt(this.display, 1);
        shape.x = px;
        shape.y = py;
        shape.graphics.beginFill( LAND_COLOR );
        shape.graphics.drawRect( -0.5*this.w, -0.5*this.h, this.w, this.h );
        shape.graphics.endFill();
    }

    setBody( px:number, py:number ){
        this.body = new p2.Body( {gravityScale:0, mass:1, position:[this.p2m(px), this.p2m(py)], type:p2.Body.STATIC} );
        this.body.addShape(new p2.Box( { width:this.p2m(this.w), height:this.p2m(this.h), collisionGroup:PHYSICS_GROUP_OBSTACLE, collisionMask:PHYSICS_GROUP_PLAYER } ), [0, 0], 0);
        this.body.displays = [this.display];
        PhysicsObject.world.addBody(this.body);
    }

    update(){
        this.fixedUpdate();
    }
    fixedUpdate() {
        this.display.x = this.px = this.x;
        this.display.y = this.py = this.y;        
        Camera2D.transform( this.display );

        if( this.display.x + this.w < 0 ){
            this.destroy();
        }
    }
}

