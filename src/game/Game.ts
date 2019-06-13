// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const GAME_AREA_H_PER_W = 1.2;      // fixedWidth 100x120 (width基準)
const PLAYER_RADIUS_PER_W = 1/32;
const PLAYER_SPEED_PER_W = 1/120;
const JUMP_POWER_PER_W = (1/24);
const GRAVITY_PER_W = 0.001;

const LAND_S_PW = 1/8;
const LAND_M_PW = 1/4;
const LAND_L_PW = 1/2;

const PIXEL_PER_METER = 10;
const PHYSICS_GROUP_PLAYER = 1<<1;
const PHYSICS_GROUP_OBSTACLE = 1<<2;
const PHYSICS_GRAVITY_PER_H = 0.001;

const SAVE_KEY_BESTSCORE = "run-bestScore";

const BACK_COLOR = 0xe0e0e0;    // index.htmlで設定
const FONT_COLOR = 0x101010;
const FONT_COLOR2 = 0x000000;
const PLAYER_COLOR = 0x101010;
const LAND_COLOR   = 0x404040;

class Game {

    static loadSceneGamePlay() {
        PhysicsObject.deltaScale = 1;
        new Player( Util.w(1/4), Util.h(0.5) );
        new Wave();
        new StartMessage();
        new Score();
    }
}
