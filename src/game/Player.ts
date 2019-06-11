// Liberapp 2019 - Tahiti Katagai
// プレイヤー

class Player extends PhysicsObject{

    static I:Player = null;

    radius:number;
    x:number;
    y:number;
    vx:number;
    vy:number;
    landing:boolean;

    button:Button;
    state:()=>void = this.stateNone;

    constructor( px:number, py:number ) {
        super();

        Player.I = this;
        this.radius = Util.w(PLAYER_RADIUS_PER_W);
        this.x = px;
        this.y = py;
        this.vx = Util.w( PLAYER_SPEED_PER_W );
        this.vy = 0;

        this.scrollCamera();
        this.setDisplay( px, py );
        this.setBody( px, py );
        this.button = new Button( null, 0, 0, 0.5, 0.5, 1, 1, 0x000000, 0.0, null ); // 透明な全画面ボタン
    }

    onDestroy(){
        this.button.destroy();
        Player.I = null;
    }

    setDisplay( px:number, py:number ){
        if( this.display == null ){
            this.display = new egret.Shape();
            GameObject.display.addChild(this.display);
        }
        const shape:egret.Shape = this.display as egret.Shape;
        shape.graphics.clear();

        shape.x = this.x;
        shape.y = this.y;
        shape.graphics.drawCircle( 0, 0, this.radius );
    }

    setBody( px:number, py:number ){
        this.body = new p2.Body( {gravityScale:0, mass:0.1, position:[this.p2m(px), this.p2m(py)] } );
        this.body.addShape(new p2.Circle({ radius:this.p2m(this.radius), collisionGroup:PHYSICS_GROUP_PLAYER, collisionMask:PHYSICS_GROUP_OBSTACLE }));
        this.body.displays = [this.display];
        PhysicsObject.world.addBody(this.body);
        PhysicsObject.world.on("beginContact", this.beginContact, this);
    }

    beginContact(e){
        const bodyA:p2.Body = e.bodyA;
        const bodyB:p2.Body = e.bodyB;
        if( bodyA == this.body || bodyB == this.body ){
            this.miss();
        }
    }

    update(){
        this.fixedUpdate();
    }
    fixedUpdate() {
        this.state();
    }

    scrollCamera(){
        Camera2D.x = this.x - Util.w(1/3);
        Camera2D.y = 0;
        // Camera2D.transform( this.display, 1 );
    }

    setStateNone(){
        this.state = this.stateNone;
    }
    stateNone(){
    }

    setStateMove(){
        this.state = this.stateMove;
    }
    stateMove() {
        this.vy *= 0.97;
        if( this.landing && this.button.press ){
            this.vy -= Util.w(JUMP_POWER_PER_W);
        }
        this.x += this.vx;
        this.y += this.vy;
        this.px = this.x;
        this.py = this.y;

        this.scrollCamera();
        this.setDisplay( this.px, this.py );
        this.checkOut();
    }

    checkOut(){
        if( (this.py - Util.h(0.5))**2 > Util.w(GAME_AREA_H_PER_W*0.5)**2 )
            this.setStateMiss();
    }

    setStateMiss(){
        if( this.state == this.stateMiss )
            return;
        new GameOver();
        PhysicsObject.deltaScale = 0.1;
        egret.Tween.removeAllTweens();
        this.state = this.stateNone;
    }

    stateMiss(){        
    }
}
