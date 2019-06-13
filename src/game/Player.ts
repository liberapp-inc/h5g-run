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
    jumping:number;

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
        let shape:egret.Shape = this.display as egret.Shape;
        if( shape == null ){
            this.display = shape = new egret.Shape();
            GameObject.display.addChild(this.display);
        }
        shape.graphics.clear();

        shape.x = this.x;
        shape.y = this.y;
        shape.graphics.beginFill( LAND_COLOR );
        shape.graphics.drawCircle( 0, 0, this.radius );
        shape.graphics.endFill();
    }

    setBody( px:number, py:number ){
        this.body = new p2.Body( {gravityScale:0, mass:1, position:[this.p2m(px), this.p2m(py)] } );
        this.body.addShape(new p2.Circle({ radius:this.p2m(this.radius), collisionGroup:PHYSICS_GROUP_PLAYER, collisionMask:PHYSICS_GROUP_OBSTACLE }));
        this.body.displays = [this.display];
        PhysicsObject.world.addBody(this.body);
        PhysicsObject.world.on("beginContact",  this.beginContact, this);
        PhysicsObject.world.on("endContact",    this.endContact, this);
    }

    beginContact(e){
        const bodyA:p2.Body = e.bodyA;
        const bodyB:p2.Body = e.bodyB;
        if( bodyA == this.body || bodyB == this.body ){
            this.landing = true;
        }
    }
    endContact(e){
        const bodyA:p2.Body = e.bodyA;
        const bodyB:p2.Body = e.bodyB;
        if( bodyA == this.body || bodyB == this.body ){
            this.landing = false;
        }
    }

    update(){
        this.fixedUpdate();
    }
    fixedUpdate() {
        this.state();
    }

    scrollCamera(){
        Camera2D.x = this.x - Util.w(1/4);
        Camera2D.y = 0;
        // Camera2D.transform( this.display, 1 );
    }

    setStateNone(){
        this.state = this.stateNone;
    }
    stateNone(){
    }

    setStateRun(){
        this.state = this.stateRun;
    }
    stateRun() {
        this.vx = this.body.velocity[0];
        this.vy = this.body.velocity[1];
        // if( this.vx <= 0 ){
        //     this.setStateMiss();
        //     return;
        // }
        const vxd = Util.w( PLAYER_SPEED_PER_W ) / 20;
        this.vx += Util.clamp( Util.w( PLAYER_SPEED_PER_W )-this.vx, -vxd, +vxd );

        if( this.jumping == 0 ){
            // 走り中
            if( this.landing ){
                if( this.button.press ){
                    this.vy = -Util.w(JUMP_POWER_PER_W);
                    this.jumping = 1;
                    this.landing = false;
                }
            }
            else{
                // to fall
                this.jumping = 1;
            }
        }
        else{
            // ジャンプ中
            if( this.landing == false ){
                if( this.jumping < 2 && this.button.press ){
                    this.vy = -Util.w(JUMP_POWER_PER_W);
                    this.jumping++;
                }
            }
            else{
                // to land
                this.jumping = 0;
            }
        }

        this.vy *= 0.98;
        this.vy += Util.w(GRAVITY_PER_W);
        this.x += this.vx;
        this.y += this.vy;
        this.px = this.x;
        this.py = this.y;
        this.body.velocity[0] = this.vx;
        this.body.velocity[1] = this.vy;

        this.scrollCamera();
        this.setDisplay( this.px, this.py );
        Camera2D.transform( this.display, 1 );
        this.checkOut();
    }

    checkOut(){
        if( this.py >= Util.h(0.5) + Util.w(GAME_AREA_H_PER_W/2) )
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
