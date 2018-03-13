/**
 * 记录详情item
 * @author huanglong
 * 2017/03/17
 */

class RecordDetailItem extends eui.ItemRenderer {
    public dateLab:eui.Label;
    public timeLab:eui.Label;
    public roundLab:eui.Label;
    public selfGro:eui.Group;
    public winLabGro:eui.Group;

    protected itemData:any;

    public constructor() {
		super();
		this.skinName = "RecordDetailItemSkin";
	}

    public dataChanged():void{
        var itemData = this.data;
        this.roundLab.text = "第"+itemData.roundNum+"局";
        this.dateLab.text = ArrayTool.formatDate1(itemData.gameDate);
        this.timeLab.text = ArrayTool.formatDate2(itemData.gameDate);

        itemData = itemData.userinfo_sig;
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
            (<eui.Label>this.winLabGro.getChildAt(i*2)).text = StringTool.formatNickName(itemData[i].name);
            (<eui.Label>this.winLabGro.getChildAt(i*2)).textColor = nameColor;
            (<eui.Label>this.winLabGro.getChildAt(i*2+1)).text = point;
            (<eui.Label>this.winLabGro.getChildAt(i*2+1)).textColor = pointColor;
        }

        var selfId = App.DataCenter.UserInfo.selfUser.userID;
        for(var i = 0;i < itemData.length;i ++) {
            if (selfId == Number(itemData[i].playerID)) {
                this.selfGro.getChildAt(i).visible = true;
            }
            else {
                this.selfGro.getChildAt(i).visible = false;
            }
        }
    }

    protected childrenCreated() {

    }
}