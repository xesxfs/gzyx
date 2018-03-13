/**
 * 记录详情界面
 * @author huanglong
 * 2017/3/17
 */
class RecordDetailPanel extends BasePanel {
	private roomLab:eui.Label;
    private dateLab:eui.Label;
    private timeLab:eui.Label;
    private roundLab:eui.Label;
    private listGro:eui.Group;
    private myselfGro:eui.Group;
    private backBtn:eui.Button;
    private recordDetailList:eui.List;
    private recordMask:eui.Image;
    private scrollerGro:eui.Group;


	public constructor() {
		super();
        this.skinName = "RecordDetailPanelSkin";
	}

	/**添加到场景中*/
    protected onEnable() {
		this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.initView();
        this.setData(this.recData.detail);
    }

    /**从场景中移除*/
    protected onRemove() {
		this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
    }

    private initView() {
        var itemData = this.recData.survey;
        console.log(this.recData);
        this.roomLab.text = "房号:"+this.recData.deskCode;
        this.dateLab.text = ArrayTool.formatDate1(this.recData.deskBuildDate);
        this.timeLab.text = ArrayTool.formatDate2(this.recData.deskBuildDate);
        
        for(var i = 0;i < itemData.length;i ++) {
            var point = "";
            var nameColor = 0x696969;
            var pointColor = 0x696969;
            if( Number(itemData[i].point)>0 ) {
                point = "+"+itemData[i].point;
                nameColor = 0x7e5a3d;
                pointColor = 0xb33318;
            }
            else {
                point = itemData[i].point;
            }
            (<eui.Label>this.listGro.getChildAt(4+i*2)).text = StringTool.formatNickName(itemData[i].name);
            (<eui.Label>this.listGro.getChildAt(4+i*2)).textColor = nameColor;
            (<eui.Label>this.listGro.getChildAt(4+i*2+1)).text = point;
            (<eui.Label>this.listGro.getChildAt(4+i*2+1)).textColor = pointColor;
        }

        var selfId = App.DataCenter.UserInfo.selfUser.userID;
        for(var i = 0;i < itemData.length;i ++) {
            if (selfId == Number(itemData[i].playerID)) {
                this.myselfGro.getChildAt(i).visible = true;
            }
            else {
                this.myselfGro.getChildAt(i).visible = false;
            }
        }

        var totalStr = "";
        if (this.recData.pattern == "9999") {
            totalStr = "-";
        }
        else {
            totalStr = this.recData.pattern;
        }
        this.roundLab.text = this.recData.playtotal + "/" + totalStr;
    }

	/**设置数据 */
    public setData(data:any) {
        let ac = new eui.ArrayCollection();
        for(var i = 0;i < data.length;i ++) {
            data[i]["roundNum"] = i+1;
        }
        ac.source = data;
        this.recordDetailList.dataProvider = ac;
        this.recordDetailList.itemRenderer = RecordDetailItem;
    }

	/**返回 */
	private back(){
		this.hide();
	}
}