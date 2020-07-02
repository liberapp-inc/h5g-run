// Liberapp 2019 - Tahiti Katagai
// アイテム

enum ItemType{
    Big,
    Magnet,
}

class Item extends GameObject{

    x:number;
    y:number;
    radius:number;
    type:ItemType;

    constructor( x:number, y:number, type:ItemType ) {
        super();

        this.x = x;
        this.y = y;
        this.radius = Util.w(ITEM_RADIUS_PER_W);
        this.type = type;
        this.setShape(x, y);
    }

    setShape(x:number, y:number){
        let shape:egret.Shape = this.display as egret.Shape;
        if( this.display == null ){
            this.display = shape = new egret.Shape();
            GameObject.display.addChild(this.display);
        }else
            shape.graphics.clear();

        shape.x = x;
        shape.y = y;
        switch( this.type ){
            case ItemType.Big:
            shape.graphics.lineStyle(5, COIN_COLOR);
            shape.graphics.drawRect( -this.radius, -this.radius, this.radius*2, this.radius*2 );
            shape.rotation = 45;
            break;

            case ItemType.Magnet:
            shape.graphics.lineStyle(5, COIN_COLOR);
            shape.graphics.drawCircle( 0, 0, this.radius );
            break;
        }
    }

    update() {
        this.display.x = this.x;
        this.display.y = this.y;
        Camera2D.transform( this.display );

        // プレイヤーとの接触
        this.isPicked();

        // 画面外で消滅
        this.isOutOfScreen();
    }

    // プレイヤーとの接触
    isPicked():boolean{
        let dx = Player.I.x - this.x;
        let dy = Player.I.y - this.y;
        let l = dx**2 + dy**2;
        if( l <= (Player.I.radius + this.radius)**2 ){
            switch( this.type ){
                case ItemType.Big:      Player.I.big    = ITEM_LIMIT_FRAME; break;
                case ItemType.Magnet:   Player.I.magnet = ITEM_LIMIT_FRAME; break;
            }
            this.destroy();
            return true;
        }
        return false;
    }

    // 画面外で消滅
    isOutOfScreen():boolean{
        if( this.x + this.radius <= Camera2D.x ){
            this.destroy();
            return true;
        }
        return false;
    }
}
