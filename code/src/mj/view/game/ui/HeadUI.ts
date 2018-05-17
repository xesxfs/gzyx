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
    public nameLabel: eui.Label;   //昵称文本
    public headImg: eui.Image;    //头像图片
    public userID: number = 0;   //用户ID
    public headzhuang: eui.Image;
    public goldLabel: eui.Label;


    public constructor() {
        super();
        this.skinName = "headUISkin1";
    }

    public childrenCreated() {

    }

    /**
     * 加载头像图片
     * @param headUrl 图片地址
     */
    public loadImg(headUrl) {
        if (headUrl && headUrl != "") {
            var url = headUrl;
            this.headImg.source = url;
        } else {
            this.headImg.source = "img_default_png";
        }
    }

    public reset() {
        this.headImg.source = "friend_invite_png";

    }


    //隐藏
    public hide() {
        this.parent && this.parent.removeChild(this);
    }

}
