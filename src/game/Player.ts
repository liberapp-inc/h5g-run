// Liberapp 2019 - Tahiti Katagai
// プレイヤー

class Player extends GameObject{

    static I:Player = null;

    radius:number;
    x:number;
    y:number;
    vx:number;
    vy:number;
    landing:boolean;
    jumping:number;
    jumpButtomY:number;

    button:Button;
    state:()=>void = this.stateNone;

    constructor( px:number, py:number ) {
        super();

        Player.I = this;
        this.radius = Util.w(PLAYER_RADIUS_PER_W);
        this.x = px;
        this.y = py;
        this.vx = 0;//Util.w( PLAYER_SPEED_PER_W );
        this.vy = 0;
        this.jumpButtomY = Util.h(0.5);

        this.scrollCamera( 1 );
        this.setDisplay( px, py );
        this.button = new Button( null, 0, 0, 0.5, 0.5, 1, 1, 0x000000, 0.0, null ); // 透明な全画面ボタン
    }

    onDestroy(){
        this.button.destroy();
        Player.I = null;
    }

    setDisplay( px:number, py:number ){
        let shape:egret.Shape = this.display as egret.Shape;
        if( this.display == null ){
            this.display = shape = new egret.Shape();
            GameObject.display.addChild(this.display);
        }else
            shape.graphics.clear();

        shape.x = this.x;
        shape.y = this.y;
        shape.graphics.beginFill( LAND_COLOR );
        shape.graphics.drawCircle( 0, 0, this.radius );
        shape.graphics.endFill();
    }

    update(){
        this.state();
    }

    scrollCamera( lerp:number = 1/16 ){
        Camera2D.x = this.x - Util.w(1/4);
        // Camera2D.y += ( (this.jumpButtomY - Util.h(0.5)) - Camera2D.y ) * lerp;
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
        this.checkLand();
        if( this.vx < 0 ){
            this.setStateMiss();
            return;
        }
        this.jump();
        this.progress( true );

        this.show();
        this.checkFall();
    }

    jump(){
        if( this.jumping == 0 ){
            // 走り中
            if( this.landing ){
                this.jumpButtomY = this.y;
                if( this.button.press ){
                    this.vy = -Util.w(JUMP_POWER_PER_W);
                    this.jumping = 1;
                    this.landing = false;
                }
            }
            else{
                this.jumping = 1; // to fall
            }
        }
        else{
            // ジャンプ中
            if( this.landing == false ){
                if( this.vy < 0 ){
                    if( this.jumping < 2 ){
                        if( this.button.touch ){
                            this.vy -= Util.w(FLOATING_POWER_PER_W);
                        }else{
                            this.jumping = 2;
                        }
                    }
                }
                else{
                    if( this.jumping == 1 ){
                        this.jumping = 2;
                        if( this.button.touch )
                            console.log( "jump height" + (this.y - this.jumpButtomY).toFixed(0) );
                    }
                }
            }
            else{
                // to land
                this.jumping = 0;
                if( this.button.press ){
                    this.vy = -Util.w(JUMP_POWER_PER_W);
                    this.jumping = 1;
                    this.landing = false;
                }
            }
        }
    }

    progress( run:boolean ){
        if( run ){
            const vxd = Util.w( PLAYER_SPEED_PER_W ) / 8;
            this.vx += Util.clamp( Util.w( PLAYER_SPEED_PER_W )-this.vx, -vxd, +vxd );
        }
        this.vy += Util.w(GRAVITY_PER_W);
        this.vy = Math.min( this.vy, Util.w(MAX_VY_PER_W) );
        this.x += this.vx;
        this.y += this.vy;
    }

    checkLand(){
        this.landing = false;
        let radius = this.radius * 1.25;
        Bar.bars.forEach( bar => {
            if( bar.px0 < this.x+radius && bar.px1 > this.x-radius ){
                // 最近点
                let dx = this.x - bar.px0;
                let dy = this.y - bar.py0;
                let dot = dx*bar.uvx + dy*bar.uvy;
                dot = Util.clamp( dot, 0, bar.length );
                let npx = bar.px0 + bar.uvx * dot;
                let npy = bar.py0 + bar.uvy * dot;
                // 接触判定と反射
                dx = this.x - npx;
                dy = this.y - npy;
                let l = dx**2 + dy**2;
                if( l <= radius**2 ){
                    l = Math.sqrt( l );
                    const _l = 1/l;
                    dx *= _l;
                    dy *= _l;
                    dot = radius - l;
                    this.x += dx*dot;
                    this.y += dy*dot;
                    dot = dx*this.vx + dy*this.vy;
                    this.vx -= dx*dot;
                    this.vy -= dy*dot;
                    if( dy < 0 )
                        this.landing = true;
                }
            }
        });
    }

    show(){
        this.scrollCamera();
        this.setDisplay( this.x, this.y );
        Camera2D.transform( this.display, 1 );
    }

    checkFall():boolean{
        if( this.y - Camera2D.y >= Util.h(0.5)+Util.w(GAME_AREA_H_PER_W/2) ){
            this.setStateMiss();
            return true;
        }
        return false;
    }

    setStateMiss(){
        if( this.state == this.stateMiss )
            return;
        new GameOver();
        this.state = this.stateMiss;
    }
    stateMiss(){
        if( this.checkFall() )
            return;
        this.checkLand();
        this.progress( false );
        this.show();
    }
}
