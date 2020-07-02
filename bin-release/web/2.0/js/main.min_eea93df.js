function rand(){return globalRandom.v()}function randF(t,e){return globalRandom.f(t,e)}function randI(t,e){return globalRandom.i(t,e)}function randBool(){return globalRandom.bool()}var __reflect=this&&this.__reflect||function(t,e,i){t.__class__=e,i?i.push(e):i=[e],t.__types__=t.__types__?i.concat(t.__types__):i},__extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);i.prototype=e.prototype,t.prototype=new i},__awaiter=this&&this.__awaiter||function(t,e,i,n){return new(i||(i=Promise))(function(s,a){function r(t){try{l(n.next(t))}catch(e){a(e)}}function o(t){try{l(n["throw"](t))}catch(e){a(e)}}function l(t){t.done?s(t.value):new i(function(e){e(t.value)}).then(r,o)}l((n=n.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){function i(t){return function(e){return n([t,e])}}function n(i){if(s)throw new TypeError("Generator is already executing.");for(;l;)try{if(s=1,a&&(r=a[2&i[0]?"return":i[0]?"throw":"next"])&&!(r=r.call(a,i[1])).done)return r;switch(a=0,r&&(i=[0,r.value]),i[0]){case 0:case 1:r=i;break;case 4:return l.label++,{value:i[1],done:!1};case 5:l.label++,a=i[1],i=[0];continue;case 7:i=l.ops.pop(),l.trys.pop();continue;default:if(r=l.trys,!(r=r.length>0&&r[r.length-1])&&(6===i[0]||2===i[0])){l=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){l.label=i[1];break}if(6===i[0]&&l.label<r[1]){l.label=r[1],r=i;break}if(r&&l.label<r[2]){l.label=r[2],l.ops.push(i);break}r[2]&&l.ops.pop(),l.trys.pop();continue}i=e.call(t,l)}catch(n){i=[6,n],a=0}finally{s=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}var s,a,r,o,l={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return o={next:i(0),"throw":i(1),"return":i(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o},__assign=this&&this.__assign||Object.assign||function(t){for(var e,i=1,n=arguments.length;n>i;i++){e=arguments[i];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s])}return t},GameObject=function(){function t(){this.display=null,t.objects.push(this)}return t.prototype.destroy=function(){this.deleteFlag=!0},t.prototype.onDestroy=function(){},t.initial=function(e){t.display=e},t.process=function(){t.objects.forEach(function(t){return t.update()}),t.objects=t.objects.filter(function(t){return t.deleteFlag&&t._delete(),!t.deleteFlag}),t.transit&&(t.dispose(),t.transit(),t.transit=null)},t.dispose=function(){t.objects=t.objects.filter(function(t){return t.destroy(),t._delete(),!1})},t.prototype._delete=function(){this.onDestroy(),this.display&&(t.display.removeChild(this.display),this.display=null)},t.objects=[],t}();__reflect(GameObject.prototype,"GameObject");var SDK=!0,Main=function(t){function e(){var e=t.call(this)||this;return e.once(egret.Event.ADDED_TO_STAGE,e.addToStage,e),e}return __extends(e,t),e.prototype.addToStage=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return Util.init(this),GameObject.initial(this.stage),Camera2D.initial(),SDK?[4,Social.init()]:[3,2];case 1:t.sent(),t.label=2;case 2:return Game.loadSceneGamePlay(),egret.startTick(this.tickLoop,this),[2]}})})},e.prototype.tickLoop=function(t){return GameObject.process(),!1},e}(eui.UILayer);__reflect(Main.prototype,"Main");var Coin=function(t){function e(e,i){var n=t.call(this)||this;return n.x=e,n.y=i,n.radius=Util.w(COIN_RADIUS_PER_W),n.setShape(e,i),n}return __extends(e,t),e.prototype.setShape=function(t,e){var i=this.display;null==this.display?(this.display=i=new egret.Shape,GameObject.display.addChild(this.display)):i.graphics.clear(),i.x=t,i.y=e,i.graphics.beginFill(COIN_COLOR),i.graphics.drawCircle(0,0,this.radius),i.graphics.endFill()},e.prototype.update=function(){this.display.x=this.x,this.display.y=this.y,Camera2D.transform(this.display),this.isPicked(),this.isOutOfScreen()},e.prototype.isPicked=function(){var t=Player.I.x-this.x,e=Player.I.y-this.y,i=Math.pow(t,2)+Math.pow(e,2);if(i<=Math.pow(Player.I.radius+this.radius,2))return Score.I.addPoint(1),this.destroy(),!0;if(Player.I.magnet>0){i=Math.sqrt(i);var n=1-Util.clamp(i/Util.w(.25),0,1);i=1/i*n*Util.width*.05,this.x+=t*i,this.y+=e*i}return!1},e.prototype.isOutOfScreen=function(){return this.x+this.radius<=Camera2D.x?(this.destroy(),!0):!1},e}(GameObject);__reflect(Coin.prototype,"Coin");var GAME_AREA_H_PER_W=1.2,PLAYER_RADIUS_PER_W=1/48,PLAYER_SPEED_PER_W=1/120,JUMP_POWER_PER_W=1/80,FLOATING_POWER_PER_W=1/1500,GRAVITY_PER_W=.001,MAX_VY_PER_W=1/80,CAMERA_POSITION_X=.2,COIN_RADIUS_PER_W=1/96,ITEM_RADIUS_PER_W=1/48,ITEM_LIMIT_FRAME=600,LAND_S_PW=1/8,LAND_M_PW=.25,LAND_L_PW=.5,BAR_RADIUS_PER_W=.25*PLAYER_RADIUS_PER_W,SAVE_KEY_BESTSCORE="run-bestScore",BACK_COLOR=16352026,BACK_COLOR2=16293402,SKY_COLOR=1486493,FONT_COLOR=16777215,FONT_COLOR2=16777215,PLAYER_COLOR=16777215,COIN_COLOR=16773120,BAR_COLOR=9703196,Game=function(){function t(){}return t.loadSceneGamePlay=function(){new Rect(0,0,Util.width,Util.h(.5),SKY_COLOR),new Rect(0,Util.h(.5),Util.width,Util.h(.1),BACK_COLOR2),new Player(Util.w(.25),Util.h(.5)),new Wave,new StartMessage,new Score},t}();__reflect(Game.prototype,"Game");var ItemType;!function(t){t[t.Big=0]="Big",t[t.Magnet=1]="Magnet"}(ItemType||(ItemType={}));var Item=function(t){function e(e,i,n){var s=t.call(this)||this;return s.x=e,s.y=i,s.radius=Util.w(ITEM_RADIUS_PER_W),s.type=n,s.setShape(e,i),s}return __extends(e,t),e.prototype.setShape=function(t,e){var i=this.display;switch(null==this.display?(this.display=i=new egret.Shape,GameObject.display.addChild(this.display)):i.graphics.clear(),i.x=t,i.y=e,this.type){case ItemType.Big:i.graphics.lineStyle(5,COIN_COLOR),i.graphics.drawRect(-this.radius,-this.radius,2*this.radius,2*this.radius),i.rotation=45;break;case ItemType.Magnet:i.graphics.lineStyle(5,COIN_COLOR),i.graphics.drawCircle(0,0,this.radius)}},e.prototype.update=function(){this.display.x=this.x,this.display.y=this.y,Camera2D.transform(this.display),this.isPicked(),this.isOutOfScreen()},e.prototype.isPicked=function(){var t=Player.I.x-this.x,e=Player.I.y-this.y,i=Math.pow(t,2)+Math.pow(e,2);if(i<=Math.pow(Player.I.radius+this.radius,2)){switch(this.type){case ItemType.Big:Player.I.big=ITEM_LIMIT_FRAME;break;case ItemType.Magnet:Player.I.magnet=ITEM_LIMIT_FRAME}return this.destroy(),!0}return!1},e.prototype.isOutOfScreen=function(){return this.x+this.radius<=Camera2D.x?(this.destroy(),!0):!1},e}(GameObject);__reflect(Item.prototype,"Item");var Player=function(t){function e(i,n){var s=t.call(this)||this;return s.state=s.stateNone,e.I=s,s.radius=Util.w(PLAYER_RADIUS_PER_W),s.color=PLAYER_COLOR,s.x=i,s.y=n,s.vx=0,s.vy=0,s.jumpButtomY=Util.h(.5),Camera2D.x=0,s.scrollCamera(1,1.7),s.setDisplay(),Camera2D.transform(s.display),s.button=new Button(null,0,0,.5,.5,1,1,0,0,null),s}return __extends(e,t),e.prototype.onDestroy=function(){this.button.destroy(),e.I=null},e.prototype.setDisplay=function(){var t=this.display;null==this.display?(this.display=t=new egret.Shape,GameObject.display.addChild(this.display)):t.graphics.clear(),t.x=this.x,t.y=this.y,t.graphics.beginFill(this.color),t.graphics.drawCircle(0,0,this.radius),t.graphics.endFill()},e.prototype.update=function(){this.state()},e.prototype.scrollCamera=function(t,e){void 0===t&&(t=1/32),void 0===e&&(e=1),Camera2D.x=Math.max(this.x-Util.w(CAMERA_POSITION_X),Camera2D.x),Camera2D.scale+=(e-Camera2D.scale)*t},e.prototype.setStateNone=function(){this.state=this.stateNone},e.prototype.stateNone=function(){},e.prototype.setStateRun=function(){this.state=this.stateRun},e.prototype.stateRun=function(){return this.itemEffect(),this.checkLand(),this.vx<0?void this.setStateMiss():(this.jump(),this.progress(!0),this.show(),void this.checkFall())},e.prototype.itemEffect=function(){var t,e=Util.w(PLAYER_RADIUS_PER_W)/30;this.big>0?(this.big--,t=2*Util.w(PLAYER_RADIUS_PER_W)):t=Util.w(PLAYER_RADIUS_PER_W),this.radius+=Util.clamp(t-this.radius,-e,+e),this.magnet>0&&(this.magnet--,this.color=0!=(4&this.magnet)?COIN_COLOR:PLAYER_COLOR)},e.prototype.jump=function(){this.button.touch?this.jumpButtonFrame++:this.jumpButtonFrame=0,this.jumping?0==this.landing?this.vy<0?this.floating&&(this.button.touch?this.vy-=Util.w(FLOATING_POWER_PER_W):this.floating=!1):this.floating&&(this.floating=!1,this.button.touch&&console.log("jump height"+(this.y-this.jumpButtomY).toFixed(0))):(this.jumping=!1,(this.button.press||this.button.touch&&this.jumpButtonFrame<=6)&&(this.vy=-Util.w(JUMP_POWER_PER_W),this.jumping=!0,this.floating=!0,this.landing=!1)):this.landing?(this.jumpButtomY=this.y,this.button.press&&(this.vy=-Util.w(JUMP_POWER_PER_W),this.jumping=!0,this.floating=!0,this.landing=!1)):this.floating=!1},e.prototype.progress=function(t){if(t){var e=Util.w(PLAYER_SPEED_PER_W)/12;this.vx+=Util.clamp(Util.w(PLAYER_SPEED_PER_W)-this.vx,-e,+e)}this.vy+=Util.w(GRAVITY_PER_W),this.vy=Math.min(this.vy,Util.w(MAX_VY_PER_W)),this.x+=this.vx,this.y+=this.vy},e.prototype.checkLand=function(){var t=this;this.landing=!1;var e=this.radius+Util.w(BAR_RADIUS_PER_W);Bar.bars.forEach(function(i){if(i.px0<t.x+e&&i.px1>t.x-e){var n=t.x-i.px0,s=t.y-i.py0,a=n*i.uvx+s*i.uvy;a=Util.clamp(a,0,i.length);var r=i.px0+i.uvx*a,o=i.py0+i.uvy*a;n=t.x-r,s=t.y-o;var l=Math.pow(n,2)+Math.pow(s,2);if(l<=Math.pow(e,2)){l=Math.sqrt(l);var h=1/l;n*=h,s*=h,a=e-l,t.x+=n*a,t.y+=s*a,a=n*t.vx+s*t.vy,t.vx-=n*a,t.vy-=s*a,0>s&&(t.landing=!0)}}})},e.prototype.show=function(){this.scrollCamera(),this.setDisplay(),Camera2D.transform(this.display,1)},e.prototype.checkFall=function(){return this.y-Camera2D.y>=Util.h(.5)+Util.w(GAME_AREA_H_PER_W/2)?(this.setStateMiss(),!0):!1},e.prototype.setStateMiss=function(){this.state!=this.stateMiss&&(new GameOver,this.state=this.stateMiss)},e.prototype.stateMiss=function(){this.checkFall()||(this.checkLand(),this.progress(!1),this.show())},e.I=null,e}(GameObject);__reflect(Player.prototype,"Player");var Wave=function(t){function e(){var i=t.call(this)||this;i.type=0,i.count=5,e.hardRate=0,i.waveX=0,i.lastPy=Util.h(.6);var n=i.waveX,s=Util.h(.5)+Util.w(.1),a=n+2*Util.w(LAND_L_PW),r=s;return new Bar(n,s,a,r),i.waveX+=2*Util.w(LAND_L_PW),i.lastPx=a,i.lastPy=r,i}return __extends(e,t),e.prototype.update=function(){if(Camera2D.x+Util.width>=this.waveX){switch(this.type){case 0:this.newSlope();break;case 1:this.newLand();break;case 2:this.newBumpy();break;case 3:this.newHoles();break;case 4:this.newSlopeHoles();break;case 5:this.newHoles();break;case 6:this.newSlopeHoles()}switch(e.hardRate=Util.clamp(this.waveX/Util.width/20,0,1),this.count--,this.count<=0&&(this.count=randI(4,11)*Util.lerp(1,.5,e.hardRate),this.type=randI(0,Util.lerp(2,7,e.hardRate))),randI(0,24)){case 0:case 1:case 2:this.newCoin2(this.lastPx,this.lastPy-Util.w(.15));break;case 3:case 4:case 5:this.newCoin3(this.lastPx,this.lastPy-Util.w(.2));break;case 6:new Item(this.lastPx,this.lastPy-Util.w(.15),ItemType.Big);break;case 7:new Item(this.lastPx,this.lastPy-Util.w(.2),ItemType.Magnet)}}},e.prototype.newSlope=function(){var t=this.waveX,e=this.lastPy,i=t+Util.w(LAND_L_PW),n=Util.h(.5)+Util.w(randF(.1,.3));new Bar(t,e,i,n),this.waveX+=Util.w(LAND_L_PW),this.lastPx=i,this.lastPy=n},e.prototype.newLand=function(){var t=this.waveX,e=Util.h(.5)+Util.w(randF(.1,.3)),i=t+Util.w(LAND_L_PW),n=e;new Bar(t,e,i,n),this.waveX+=Util.w(LAND_L_PW),this.lastPx=i,this.lastPy=n},e.prototype.newBumpy=function(){var t=this.waveX,e=Util.h(.5)+Util.w(randF(.1,.3)),i=t+Util.w(LAND_M_PW),n=e;new Bar(t,e,i,n),this.waveX+=Util.w(LAND_M_PW),this.lastPx=i,this.lastPy=n},e.prototype.newHoles=function(){var t=this.waveX,i=Util.h(.5)+Util.w(randF(.2,.3)),n=t+Util.w(LAND_M_PW)*randF(.25,Util.lerp(.8,.6,e.hardRate)),s=i;new Bar(t,i,n,s),this.waveX+=Util.w(LAND_M_PW),this.lastPx=n,this.lastPy=s},e.prototype.newSlopeHoles=function(){var t=this.waveX,e=Util.h(.5)+Util.w(randF(.12,.18)),i=t+Util.w(LAND_L_PW)*randF(.4,.8),n=Util.h(.5)+Util.w(randF(.1,.2));new Bar(t,e,i,n),this.waveX+=Util.w(LAND_L_PW),this.lastPx=i,this.lastPy=n},e.prototype.newCoin2=function(t,e){new Coin(t-Util.w(.04),e),new Coin(t+Util.w(.04),e)},e.prototype.newCoin3=function(t,e){new Coin(t-Util.w(.06),e),new Coin(t,e),new Coin(t+Util.w(.06),e)},e}(GameObject);__reflect(Wave.prototype,"Wave");var Button=function(t){function e(e,i,n,s,a,r,o,l,h,c){var p=t.call(this)||this;p.text=null,p.onTap=null,p.press=!1,p.touch=!1,p.x=0,p.y=0;var u=new egret.Shape;GameObject.display.addChild(u),u.graphics.beginFill(l,h);var d=r*Util.width,y=o*Util.height;return u.graphics.drawRoundRect(-.5*d,-.5*y,d,y,.2*d),u.graphics.endFill(),u.touchEnabled=!0,u.x=s*Util.width,u.y=a*Util.height,p.display=u,e&&(p.text=Util.newTextField(e,i,n,s,a,!0,!1),GameObject.display.addChild(p.text)),p.onTap=c,p.onTap&&p.display.addEventListener(egret.TouchEvent.TOUCH_TAP,p.onTap,p),p.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN,p.touchBegin,p),p.display.addEventListener(egret.TouchEvent.TOUCH_MOVE,p.touchMove,p),p.display.addEventListener(egret.TouchEvent.TOUCH_END,p.touchEnd,p),p}return __extends(e,t),e.prototype.onDestroy=function(){this.onTap&&this.display.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this),GameObject.display.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this),GameObject.display.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this),GameObject.display.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this),this.text&&GameObject.display.removeChild(this.text)},e.prototype.update=function(){var t=this.touch?1.1:1;this.display.scaleX=this.display.scaleY=this.display.scaleX+.25*(t-this.display.scaleX),this.press=!1},e.prototype.touchBegin=function(t){this.x=t.stageX,this.y=t.stageY,this.press=!0,this.touch=!0},e.prototype.touchMove=function(t){this.x=t.stageX,this.y=t.stageY,this.touch=!0},e.prototype.touchEnd=function(t){this.touch=!1},e}(GameObject);__reflect(Button.prototype,"Button");var Camera2D=function(){function t(){}return t.initial=function(){t.x=0,t.y=0,t.scale=1},t.transform=function(e,i){void 0===i&&(i=1),e.x=t.transX(e.x),e.y=t.transY(e.y),e.scaleX=e.scaleY=t.scale*i},t.transX=function(e){return(e-t.x)*t.scale},t.transY=function(e){return(e-t.y)*t.scale},t.x=0,t.y=0,t.scale=1,t}();__reflect(Camera2D.prototype,"Camera2D");var Bar=function(t){function e(i,n,s,a){var r=t.call(this)||this;e.bars.push(r),r.px0=i,r.py0=n,r.px1=s,r.py1=a,r.uvx=s-i,r.uvy=a-n,r.length=Math.sqrt(Math.pow(r.uvx,2)+Math.pow(r.uvy,2));var o=1/r.length;return r.uvx*=o,r.uvy*=o,r.setDisplay(),Camera2D.transform(r.display),r}return __extends(e,t),e.prototype.onDestroy=function(){var t=this;e.bars=e.bars.filter(function(e){return e!=t})},e.prototype.setDisplay=function(){var t=this.display;null==this.display?(this.display=t=new egret.Shape,GameObject.display.addChildAt(this.display,1)):t.graphics.clear(),t.graphics.lineStyle(5,BAR_COLOR),t.graphics.moveTo(this.px0,this.py0),t.graphics.lineTo(this.px1,this.py1)},e.prototype.update=function(){this.display.x=this.display.y=0,Camera2D.transform(this.display),this.display.x+this.px1<0&&(this.destroy(),Score.I.addPoint(1))},e.bars=[],e}(GameObject);__reflect(Bar.prototype,"Bar");var Random=function(){function t(e){void 0===e&&(e=Math.floor(Math.random()*t.max)),this.x=123456789,this.y=362436069,this.z=521288629,this.w=e}return t.prototype.v=function(){return(this.next()&t.max)/(t.max+1)},t.prototype.f=function(t,e){return t+this.v()*(e-t)},t.prototype.i=function(t,e){return Math.floor(this.f(t,e))},t.prototype.bool=function(){return 0!=(1&this.next())},t.prototype.next=function(){var t;return t=this.x^this.x<<11,this.x=this.y,this.y=this.z,this.z=this.w,this.w=this.w^this.w>>>19^(t^t>>>8)},t.max=1073741823,t}();__reflect(Random.prototype,"Random");var globalRandom=new Random,Rect=function(t){function e(e,i,n,s,a){var r=t.call(this)||this,o=new egret.Shape;return r.display=o,GameObject.display.addChildAt(r.display,0),o.graphics.beginFill(a,1),o.graphics.drawRect(e,i,n,s),o.graphics.endFill(),r}return __extends(e,t),e.prototype.update=function(){},e}(GameObject);__reflect(Rect.prototype,"Rect");var Sdk=function(){function t(){}return t.loadSdk=function(){return __awaiter(this,void 0,void 0,function(){var t,e,i;return __generator(this,function(n){switch(n.label){case 0:return console.log("============================================================"),console.log("Liberapp.loadSdk:"),this.env=this.detectMode(location.origin),console.log("env: ",this.env),t=this.resolveSdkUrl(this.sdkPath),console.log("srcUrl: ",t),[4,this.loadScript(t)];case 1:return e=n.sent(),console.log("script:",e),i=window.LiberappSdk,"egret-wing"!==this.env?[3,3]:[4,i.enableDebug()];case 2:n.sent(),n.label=3;case 3:return console.log("liberappSdk:",i),[2,i]}})})},t.detectMode=function(t){return/^https:\/\/(.+)\.a\.liberapp\.net$/.test(t)?"production":/^https:\/\/(.+)\.a\.staging.\.liberapp\.net$/.test(t)?"staging":/^https:\/\/(.+)\.a\.development\.liberapp\.net$/.test(t)?"development":"egret-wing"},t.resolveSdkUrl=function(t){var e=this.baseUrls[this.env];return""+e+t},t.loadScript=function(t){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,new Promise(function(e,i){var n=document.createElement("script");n.async=!1,n.src=t,n.onload=function(){return e(n)},n.onerror=function(){return i(new Error("Can not load script: src:"+t))},document.head.append(n)})]})})},t.baseUrls={production:"https://liberapp.net",staging:"https://staging.liberapp.net",development:"https://localhost","egret-wing":"https://staging.liberapp.net"},t.sdkPath="/dist/sdk/liberapp-ja-0_9.js",t}();__reflect(Sdk.prototype,"Sdk");var Social=function(){function t(){}return t.init=function(){return __awaiter(this,void 0,void 0,function(){var t,e,i,n,s,a,r,o,l,h;return __generator(this,function(c){switch(c.label){case 0:return[4,Sdk.loadSdk()];case 1:return t=c.sent(),this.sdk=t,Toast.show({text:"ログイン中・・・",delay:3e4,canHide:!0}),[4,t.initializeAsync()];case 2:return c.sent(),[4,t.startGameAsync()];case 3:return c.sent(),Toast.show({text:this.playerName+"さんようこそ！",delay:3e4,canHide:!0}),e=this,[4,t.getLeaderboardAsync("default")];case 4:return e.leaderboard=c.sent(),[4,Promise.all([this.leaderboard.getEntryCountAsync(),this.leaderboard.getEntriesAsync(3,0),this.leaderboard.getPlayerEntryAsync(),this.sdk.player.getDataAsync(["level"])])];case 5:return i=c.sent(),n=i[0],s=i[1],a=i[2],r=i[3],this.playerEntry=a,this.rawData=r,this.hasBest?Toast.show({text:"今のところ"+n+"人中"+this.bestRank+"位です",delay:3e3}):(o=s[0],o&&(console.log(o),l=o.getPlayer().getName(),h=o.getScore(),Toast.show({text:n+"人が遊んでいます!\n一番は"+l+"さん\nスコアは"+h+"です",delay:3e3}))),[2]}})})},Object.defineProperty(t,"hasBest",{get:function(){return!!this.myBestEntry},enumerable:!0,configurable:!0}),Object.defineProperty(t,"bestScore",{get:function(){return this.hasBest?this.myBestEntry.getScore():0},enumerable:!0,configurable:!0}),Object.defineProperty(t,"bestRank",{get:function(){return this.hasBest?this.myBestEntry.getRank():void 0},enumerable:!0,configurable:!0}),Object.defineProperty(t,"playerEntry",{set:function(e){console.log("myBest:",this.myBestEntry,e),this.myBestEntry=e,Score.bestScore=t.bestScore,Score.bestRank=t.bestRank},enumerable:!0,configurable:!0}),t.setScore=function(t){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(i){switch(i.label){case 0:return console.log("setScore "+t),Toast.show({text:"ハイスコアを送信中",delay:3e4,canHide:!0}),e=this,[4,this.leaderboard.setScoreAsync(t)];case 1:return e.playerEntry=i.sent(),Toast.show({text:"順位は"+this.bestRank+"位でした",delay:3e3}),[2]}})})},Object.defineProperty(t,"playerName",{get:function(){return this.sdk.player.getName()||"名無し"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"hasData",{get:function(){return!!this.rawData},enumerable:!0,configurable:!0}),Object.defineProperty(t,"level",{get:function(){return this.hasData&&"level"in this.rawData?this.rawData.level:0},enumerable:!0,configurable:!0}),t.setLevel=function(t){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return this.rawData.level=t,console.log("setLevel "+t+" "+this.rawData.level),Toast.show({text:"達成レベルを送信中",delay:3e4,canHide:!0}),[4,this.sdk.player.setDataAsync({level:t})];case 1:return e.sent(),Toast.show({text:"送信完了",delay:1500}),[2]}})})},t}();__reflect(Social.prototype,"Social");var DefaultToastOptions={text:"",delay:3e3,canHide:!1},Toast=function(t){function e(e){var i=t.call(this)||this;return i.queue=[],i.rect=new eui.Rect,i.rect.alpha=0,i.label=new eui.Label,i.label.maxWidth=e,i.rect.addEventListener(eui.UIEvent.CREATION_COMPLETE,i.onRectCreationComplete,i),i.label.addEventListener(eui.UIEvent.RESIZE,i.onLabelResized,i),GameObject.display.addChild(i.rect),i}return __extends(e,t),e.prototype.update=function(){},e.show=function(t){var i=__assign({},DefaultToastOptions,t);this.I||(this.I=new e(.6*Util.width)),this.I.show(i)},e.prototype.onDestroy=function(){var t=e.I;e.I=void 0,t&&(t.rect.parent.removeChild(t.rect),t.rect.removeChildren(),t.rect=void 0,t.label=void 0)},e.prototype.show=function(t){if(console.log("Toast.show"),this.currentOptions){if(!this.currentOptions.canHide)return void this.queue.push(t);this.currentTween.setPaused(!0),this.currentTween=void 0,this.currentOptions=void 0,this.queue=[]}this.currentOptions=t,this.toastText=t.text,this.currentTween=egret.Tween.get(this.rect),this.currentTween.to({alpha:1},300).wait(t.delay).call(this.onStartHide,this)},e.prototype.onStartHide=function(){console.log("Toast.onStartHide"),void 0!==this.currentTween&&(this.currentTween=egret.Tween.get(this.rect),this.currentTween.to({alpha:0},300).call(this.onCompleteHide,this))},e.prototype.onCompleteHide=function(){if(console.log("Toast.onCompleteHide"),this.currentTween=void 0,this.currentOptions=void 0,0===this.queue.length)return void this.destroy();var t=this.queue.shift();this.show(t)},e.prototype.onRectCreationComplete=function(){console.log("Toast.onRectCreationComplete"),this.rect.fillColor=0,this.rect.fillAlpha=.6,this.rect.horizontalCenter=0,this.rect.verticalCenter=0,this.rect.ellipseWidth=30,this.rect.ellipseHeight=30,this.label.x=20,this.label.y=20,this.label.size=28,this.rect.addChild(this.label),this.toastText=""},Object.defineProperty(e.prototype,"toastText",{set:function(t){console.log("Toast.toastText:"),this.label.text=t},enumerable:!0,configurable:!0}),e.prototype.onLabelResized=function(){console.log("Toast.onLabelResized:"),this.rect.width=this.label.width+40,this.rect.height=this.label.height+40,this.rect.x=(Util.width-this.rect.width)/2,this.rect.y=(Util.height-this.rect.height)/2},e}(GameObject);__reflect(Toast.prototype,"Toast");var Util=function(){function t(){}return t.w=function(e){return e*t.width},t.h=function(e){return e*t.height},t.init=function(t){this.width=t.stage.stageWidth,this.height=t.stage.stageHeight},t.clamp=function(t,e,i){return e>t&&(t=e),t>i&&(t=i),t},t.lerp=function(t,e,i){return t+(e-t)*i},t.color=function(t,e,i){return 65536*Math.floor(255*t)+256*Math.floor(255*e)+Math.floor(255*i)},t.colorLerp=function(t,e,i){var n=1-i,s=((16711680&t)*n+(16711680&e)*i&16711680)+((65280&t)*n+(65280&e)*i&65280)+((255&t)*n+(255&e)*i&255);return s},t.newTextField=function(e,i,n,s,a,r,o){var l=new egret.TextField;return l.text=e,l.bold=r,l.size=i,l.textColor=n,o?(l.x=(t.width-l.width)*s,l.y=(t.height-l.height)*a):(l.x=t.width*s-.5*l.width,l.y=t.height*a-.5*l.height),l},t}();__reflect(Util.prototype,"Util");var GameOver=function(t){function e(){var e=t.call(this)||this;return e.texts=[],e.retryButton=null,e.step=0,e.fadeInFrame=64,e.texts[0]=Util.newTextField("SCORE : "+Score.I.point.toFixed(),Util.width/12,FONT_COLOR,.5,.35,!0,!1),egret.Tween.get(e.texts[0],{loop:!1}).to({alpha:0},0).to({alpha:1},1e3),GameObject.display.addChild(e.texts[0]),SDK&&Score.bestScore<Score.I.point&&(Score.bestScore=Score.I.point,Social.setScore(Score.I.point),e.texts[1]=Util.newTextField("NEW RECORD!",Util.width/13,FONT_COLOR,.5,.45,!0,!1),egret.Tween.get(e.texts[1],{loop:!0}).to({alpha:0},500).to({alpha:1},500),GameObject.display.addChild(e.texts[1])),e}return __extends(e,t),e.prototype.onDestroy=function(){this.texts.forEach(function(t){GameObject.display.removeChild(t)}),this.texts=null},e.prototype.update=function(){this.step++,this.step==this.fadeInFrame&&(this.retryButton=new Button("リトライ",Util.width/16,BACK_COLOR,.5,.75,.4,.1,FONT_COLOR,1,this.onTapRetry))},e.prototype.onTapRetry=function(){GameObject.transit=Game.loadSceneGamePlay,this.destroy()},e}(GameObject);__reflect(GameOver.prototype,"GameOver");var Score=function(t){function e(){var i=t.call(this)||this;return i.point=0,i.text=null,i.textBest=null,e.I=i,i.point=0,i.text=Util.newTextField("0",Util.width/22,FONT_COLOR2,.5,0,!0,!0),GameObject.display.addChild(i.text),i.textBest=Util.newTextField("BEST:"+e.bestScore,Util.width/22,FONT_COLOR2,0,0,!0,!0),GameObject.display.addChild(i.textBest),i}return __extends(e,t),e.prototype.onDestroy=function(){GameObject.display.removeChild(this.text),this.text=null,GameObject.display.removeChild(this.textBest),this.textBest=null,e.I=null},e.prototype.update=function(){},e.prototype.addPoint=function(t){void 0===t&&(t=1),this.point+=t,this.text.text=""+this.point.toFixed(),e.bestScore<this.point&&(this.textBest.text="BEST:"+this.point.toFixed())},e.I=null,e.bestScore=0,e.bestRank=0,e}(GameObject);__reflect(Score.prototype,"Score");var StartMessage=function(t){function e(){var e=t.call(this)||this;return e.texts=[],e.texts[0]=Util.newTextField("ボール走",Util.width/12,FONT_COLOR,.5,.2,!0,!1),e.texts[1]=Util.newTextField("タッチでジャンプ",Util.width/19,FONT_COLOR,.5,.3,!0,!1),e.texts[2]=Util.newTextField("落ちないように進め",Util.width/19,FONT_COLOR,.5,.35,!0,!1),e.texts.forEach(function(t){GameObject.display.addChild(t)}),GameObject.display.once(egret.TouchEvent.TOUCH_BEGIN,e.tap,e),e}return __extends(e,t),e.prototype.onDestroy=function(){this.texts.forEach(function(t){GameObject.display.removeChild(t)}),this.texts=null},e.prototype.update=function(){},e.prototype.tap=function(t){Player.I.setStateRun(),this.destroy()},e}(GameObject);__reflect(StartMessage.prototype,"StartMessage");