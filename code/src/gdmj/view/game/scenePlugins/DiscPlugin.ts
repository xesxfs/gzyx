/**
 * 圆盘处理插件
 * @author xiongjian 
 * @date 2017/6/29
 */
class DiscPlugin extends BaseUI {

    private redDiscList = [];    //圆盘红色指示块 
    private redDiscBGList = [];  //圆盘红色指示块底图
    private fengList = [];       //风位字列表
    public curLeftCard: number = 0;     //当前剩余牌数

    public juGroup: eui.Group;      //剩余牌数group
    public leftCardLabel: eui.Label;  //剩余牌数label
    public discGroup: eui.Group;   //中间圆盘group
    public cdLabel: eui.BitmapLabel;    //倒计时label

    private lightFlashTime: number = 400;  //中间圆盘光的闪烁时间ms

    public constructor() {
        super();
        this.skinName = "discPlugin";
    }

    protected childrenCreated() {
                //初始化UI列表
        for (var i = 0; i < 4; i++) {
        this.redDiscList.push(this.discGroup.getChildAt(i + 9));
        this.redDiscBGList.push(this.discGroup.getChildAt(i + 5));
        this.fengList.push(this.discGroup.getChildAt(i + 1));
        }
    }


    /**隐藏剩余计数*/
    private hideLeftLabel() {
        this.juGroup.visible = false;
    }

    /**显示剩余多少张计数*/
    public showLeftLabel(lastCardNum, curPlayCount) {
        this.leftCardLabel.text = NumberTool.formatTime(lastCardNum) + "张";
        this.curLeftCard = lastCardNum;
        this.juGroup.visible = true;
    }

    /**减少剩余牌数*/
    private reduceLeftCard(reduceNum: number = 1) {
        this.curLeftCard -= reduceNum;
        this.leftCardLabel.text = NumberTool.formatTime(this.curLeftCard) + "张";
    }

    /**增加剩余牌数*/
    private addLeftCard(a: any = 1) {
        console.log(a + "增加数")
        this.curLeftCard = this.curLeftCard + 1
        this.leftCardLabel.text = NumberTool.formatTime(this.curLeftCard) + "张";
    }

    /**显示中间圆盘*/
    private showDisc() {
        this.discGroup.visible = true;
        //        this.deskLogo.visible = false;
    }

    /**隐藏中间圆盘*/
    private hideDisc() {
        this.discGroup.visible = false;
        //        this.deskLogo.visible = true;
    }

    /**显示中间圆盘光*/
    private showLight(pos: UserPosition) {
        this.hideAllLight();
        this.redDiscList[pos].visible = true;
        this.redDiscBGList[pos].visible = true;
        egret.Tween.get(this.redDiscList[pos], { loop: true }).to({ alpha: 1 }, this.lightFlashTime + 100).wait(this.lightFlashTime - 200).to({ alpha: 0.5 }, this.lightFlashTime + 100);
    }

    /**隐藏所有光*/
    private hideAllLight() {
        var len = this.redDiscList.length;
        var light;
        for (var i = 0; i < len; i++) {
            this.redDiscList[i].alpha = 1;
            this.redDiscList[i].visible = false;
            egret.Tween.removeTweens(this.redDiscList[i]);
        }
        var bgLen = this.redDiscList.length;
        for (var i = 0; i < bgLen; i++) {
            this.redDiscBGList[i].visible = false;
        }

    }

    /**显示圆盘上的风位(东南西北)*/
    private showDiceFengWei(pos: UserPosition) {
        this.hideAllFengWei();
        console.log("fengList" + this.fengList[pos]);
        if (typeof pos != "number") {
            return;
        }
        this.fengList[pos].visible = true;
    }

    /**隐藏所有风位*/
    private hideAllFengWei() {
        var len = this.fengList.length;
        for (var i = 0; i < len; i++) {
            this.fengList[i].visible = false;
        }
    }

    /**设置cd文本**/
    private setCdLabel(time: string) {
        this.cdLabel.text = time;
    }

}