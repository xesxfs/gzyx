/**
* 头像UI
* 加载微信头像图片，并显示
* @author chenkai
* @date 2016/6/29
* 
* Example:
* 1. 拖拽HeadUI自定义组件到exml，并为其设置自定义皮肤HeadUISkin
* 2. this.headUI.loadImg(headUrl); //加载图片
* 
*/

class HeadUI extends eui.Component {
    public headMask: eui.Image;
    public headImg: eui.Image;
    public headzhuang: eui.Image;
    public nameGrp: eui.Group;
    public nameLabel: eui.Label;
    public goldLabel: eui.Label;
    public heroImg: eui.Image;
    public relateImg: eui.Image;

    public headLoader: egret.ImageLoader;
    public userID: number = 0;   //用户ID

    public constructor() {
        super();
        this.skinName = "headUISkin1";
    }

    public childrenCreated() {
        this.headImg.mask = this.headMask;

        this.headLoader = new egret.ImageLoader();
        this.headLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
        this.headLoader.crossOrigin = "Anonymous";
    }

    public update(user: UserVO) {
        this.userID = user.userID;
        this.loadImg(user.headUrl);
        this.nameLabel.text = user.nickName;
        this.goldLabel.text = user.gold.toString();
        this.nameGrp.visible = true;
    }

    private loadCompleteHandler() {
        let texture = new egret.Texture();
        texture._setBitmapData(this.headLoader.data);

        this.headImg.source = texture;
    }


    /**
     * 加载头像图片
     * @param headUrl 图片地址
     */
    public loadImg(headUrl: string) {
        if (headUrl && headUrl != "") {
            if (headUrl.indexOf("http")) {
                this.headLoader.load(headUrl);
            }
        } else {
            this.headImg.source = "img_default_png";
        }
    }

    public reset() {
        this.headImg.source = "friend_invite_png";
        this.nameGrp.visible = false;
        this.headzhuang.visible = false;
        this.heroImg.visible = false;
        this.relateImg.visible = false;
        this.goldLabel.text = "0";
        this.nameLabel.text = "";
    }
}
