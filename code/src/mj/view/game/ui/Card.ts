/**
 * 麻将牌
 * @author chenkai 
 * @date 2016/6/29
 */
class Card extends egret.DisplayObjectContainer {
    public static NAME: string = "Card";
    public cardValue: number;     //牌值 例如四张1万中的1张，0x011 
    public cardBg: egret.Bitmap;  //牌背景
    public cardImg: egret.Bitmap; //牌值图片
    public userPos: UserPosition; //方向
    public bUp: boolean = false;  //双击出牌，第一次点击会弹起，第二次点击才出牌
    public upDist: number = 20;   //弹起的距离
    public initPosY: number = 0;  //初始y位置，用于牌的多种动画后，恢复原位时，防止位置错乱
    public childAt: number = 0;    //牌的层次

    public constructor() {
        super();
        this.cardBg = new egret.Bitmap();
        this.cardImg = new egret.Bitmap();
        this.addChild(this.cardBg);
        this.addChild(this.cardImg);
        this.touchChildren = false;
        this.touchEnabled = false;
    }

	/**
	 * 设置手牌皮肤
	 * @param cardValue 牌值
	 * @dir 牌方向
	 */
    public setHandSkin(cardValue: number, userPos: UserPosition) {
        this.cardValue = cardValue;
        this.userPos = userPos;
        if (userPos == UserPosition.Down) {
            this.cardBg.bitmapData = RES.getRes("card_big_bg1_png");
            this.cardImg.bitmapData = RES.getRes("card_big_" + cardValue + "_png");
            this.cardImg.x = 3
            this.scaleX = 1;
            this.scaleY = 1;
        } else if (userPos == UserPosition.R) {
            this.cardBg.bitmapData = RES.getRes("card_left_bg1_png");
            this.cardImg.bitmapData = null;
            this.scaleX = -1;
            this.scaleY = 1;
        } else if (userPos == UserPosition.Up) {
            this.cardBg.bitmapData = RES.getRes("card_bgup_png");
            this.cardImg.bitmapData = null;
            // this.scaleX = 0.85;
            // this.scaleY = 0.85;
        } else if (userPos == UserPosition.L) {
            this.cardBg.bitmapData = RES.getRes("card_left_bg1_png");
            this.cardImg.bitmapData = null;
            // this.scaleX = 0.85;
            // this.scaleY = 0.85;
        }

    }

	/**
	 * 设置出牌皮肤
	 * @param cardValue 牌值
	 * @dir 牌方向
	 */
    public setOutSkin(cardValue: number, userPos: UserPosition) {
        this.cardValue = cardValue;
        this.userPos = userPos;
        if (userPos == UserPosition.Down) {
            this.cardBg.bitmapData = RES.getRes("card_midself_bg_png");
            this.cardImg.bitmapData = RES.getRes("card_small_" + cardValue + "_png");
            this.cardImg.x = 13;
            this.cardImg.y = 8;
            this.scaleX = 1;
            this.scaleY = 1;
            // this.width =58;
            // this.height = 81;
        } else if (userPos == UserPosition.R) {
            this.cardBg.bitmapData = RES.getRes("card_left_bg0_png");
            this.cardImg.bitmapData = RES.getRes("card_right_" + cardValue + "_png");
            this.cardImg.x = 10;
            this.cardImg.y = 2;
            this.scaleX = 1;
            this.scaleY = 1;
            // this.width =64;
            // this.height = 53;
        } else if (userPos == UserPosition.Up) {
            this.cardBg.bitmapData = RES.getRes("card_midself_bg_png");
            this.cardImg.bitmapData = RES.getRes("card_small_" + cardValue + "_png");
            this.cardImg.x = 13;
            this.cardImg.y = 8;
            this.scaleX = 1;
            this.scaleY = 1;
            // this.width =58;
            // this.height = 81;
        } else if (userPos == UserPosition.L) {
            this.cardBg.bitmapData = RES.getRes("card_left_bg0_png");
            this.cardImg.bitmapData = RES.getRes("card_left_" + cardValue + "_png");
            this.cardImg.x = 10;
            this.cardImg.y = 2;
            // this.width =64;
            // this.height = 53;
            this.scaleX = 1;
            this.scaleY = 1;
        }
    }

	/**
	 * 设置吃碰杠牌皮肤，只有自己手牌吃碰杠牌时，和打出牌皮肤不一致
	 * @param cardValue 牌值
	 * @param userPos 位置
	 */
    public setEatSkin(cardValue: number, userPos: UserPosition) {
        this.cardValue = cardValue;
        this.userPos = userPos;
        this.cardBg.bitmapData = RES.getRes("card_big_bg0_png");
        this.cardImg.bitmapData = RES.getRes("card_big_" + cardValue + "_png");
        this.cardImg.scaleX = 0.8;
        this.cardImg.scaleY = 0.8;
        this.cardImg.x = 5;
        this.cardImg.y = -12;
    }

    /**
     * 设置上家吃碰杠牌皮肤
     */
    public setUpEatSkin(cardValue: number, userPos: UserPosition) {
        this.cardValue = cardValue;
        this.cardBg.bitmapData = RES.getRes("card_bgup2_png");
        this.cardImg.bitmapData = RES.getRes("card_small_" + cardValue + "_png");
        this.cardBg.scaleX = 1.1;
        this.cardBg.scaleY = 1.1;
        this.cardImg.x = 8;
        this.cardImg.y = 5
        this.scaleX = 1.2;
        this.scaleY = 1.2;
    }


    //设置暗杠皮肤
    public setAnGangSkin(cardValue: number, userPos: UserPosition) {
        this.cardValue = cardValue;
        this.userPos = userPos;
        if (userPos == UserPosition.Down) {
            this.cardBg.bitmapData = RES.getRes("card_big_bg2_png");
            this.cardImg.bitmapData = null;
            this.scaleX = 1;
            this.scaleY = 1;
        } else if (userPos == UserPosition.R) {
            this.cardBg.bitmapData = RES.getRes("card_left_bg2_png");
            this.cardImg.bitmapData = null;
            this.scaleX = 0.933;
            this.scaleY = 0.87;

        } else if (userPos == UserPosition.Up) {
            this.cardBg.bitmapData = RES.getRes("card_big_bg2_png");
            this.cardImg.bitmapData = null;
            this.cardBg.scaleX = 0.7;
            this.cardBg.scaleY = 0.7;

        } else if (userPos == UserPosition.L) {
            this.cardBg.bitmapData = RES.getRes("card_left_bg2_png");
            this.cardImg.bitmapData = null;
            this.scaleX = 0.933;
            this.scaleY = 0.87;
        }
    }

    /**弹起*/
    public toUp() {
        if (this.bUp == false) {
            this.y -= this.upDist;
            this.bUp = true;
        }
    }

    /**放下*/
    public toDown() {

        if (this.bUp == true) {
            this.y += this.upDist;
            this.bUp = false;
        }
    }

    //回收到对象池
    public recycle() {
        this.bUp = false;
        this.userPos = 0;
        this.cardValue = 0;
        this.touchEnabled = false;
        this.touchChildren = false;
        this.cardBg.bitmapData = null;
        this.cardImg.bitmapData = null;
        this.x = 0;
        this.y = 0;
        this.childAt = 0;
        this.cardBg.x = 0;
        this.cardBg.y = 0;
        this.cardImg.x = 0;
        this.cardImg.y = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.cardImg.scaleX = 1;
        this.cardImg.scaleY = 1;
        this.cardBg.scaleX = 1;
        this.cardBg.scaleY = 1;
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(Card.NAME).returnObject(this);
    }
}
