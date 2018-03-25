/**
 * @author xiongjian
 * 2017-4-20
 */
class gameResult2Item extends eui.ItemRenderer {
    public constructor() {
        super();
        this.skinName = "gameResultItem2Skin";
    }

    public avaterImg: eui.Image;
    public nameLabel: eui.Label;
    public fenLabel: eui.BitmapLabel;
    public zimoLabel: eui.Label;
    public hupaiLabel: eui.Label;
    public zhongniaoLabel: eui.Label;
    public headMaskImg:eui.Image;


    public dataChanged() {

        console.log("item==", this.data);
        let point = parseInt(this.data.lossWinPoint);
        if (point > 0) {
            this.fenLabel.font = "win_fnt";
            this.fenLabel.text = "+" + this.data.lossWinPoint;
        } else {
            this.fenLabel.font = "lose_fnt";
            this.fenLabel.text = "" + this.data.lossWinPoint;
        }

        this.nameLabel.text = "" + this.data.name;
        // var userVo: UserVO = App.DataCenter.UserInfo.getUserByUserID(this.data.userID);
        //  var headUrl ;
        // if(userVo && userVo.headUrl){
        //      headUrl = userVo.headUrl;
        // }
        
        var headUrl = this.data.avatar;
        if (headUrl && headUrl != "") {
            this.avaterImg.source = headUrl;
            this.avaterImg.mask = this.headMaskImg;
        }

        this.zimoLabel.text = "" + this.data.ziMoNum;
        this.hupaiLabel.text = "" + this.data.huPaiNum;
        this.zhongniaoLabel.text = "" + this.data.zhongNiaoNum
    }


}
