// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const GAME_AREA_H_PER_W = 1.2;      // fixedWidth 100x120 (width基準)
const PLAYER_RADIUS_PER_W = 1/48;
const PLAYER_SPEED_PER_W = 1/120;
const JUMP_POWER_PER_W = 1/80;
const FLOATING_POWER_PER_W = 1/1500;
const GRAVITY_PER_W = 1/1000;
const MAX_VY_PER_W = 1/80;
const CAMERA_POSITION_X = 1/5;

const COIN_RADIUS_PER_W = 1/96;

const LAND_S_PW = 1/8;
const LAND_M_PW = 1/4;
const LAND_L_PW = 1/2;

const SAVE_KEY_BESTSCORE = "run-bestScore";

const BACK_COLOR = 0x109020;    // index.htmlで設定
const SKY_COLOR = 0x2080e0;
const FONT_COLOR = 0xffffff;
const FONT_COLOR2 = 0xffffff;
const PLAYER_COLOR = 0xffffff;
const COIN_COLOR   = 0xfff000;
const LAND_COLOR   = 0xf0c080;

class Game {

    static loadSceneGamePlay() {
        new Sky();
        new Player( Util.w(1/4), Util.h(0.5) );
        new Wave();
        new StartMessage();
        new Score();
    }
}
