/**
 * 好友房记录item
 * @author huanglong
 * 2017/04/25
 */

class GameRecordItem extends eui.ItemRenderer {
    public dateLab:eui.Label;
    public timeLab:eui.Label;
    public roundLab:eui.Label;
    public selfGro:eui.Group;
    public winLabGro:eui.Group;
    public zhuangGro:eui.Group;

    protected itemData:any;

    public constructor() {
		super();
		this.skinName = "GameRecordPanelItemSkin";
	}

    public dataChanged():void{
        var itemData = this.data;
        this.roundLab.text = "第"+itemData.current_play_count+"局";
        this.dateLab.text = ArrayTool.formatDate1(itemData.game_over_time);
        this.timeLab.text = ArrayTool.formatDate2(itemData.game_over_time);

        for(var i = 0;i < 4;i ++) {
            var point = "";
            var nameColor = 0x696969;
            var pointColor = 0x696969;
            if( Number(itemData["seat"+i][1])>0 ) {
                point = "+"+itemData["seat"+i][1];
                nameColor = 0x7e5a3d;
                pointColor = 0xb33318;
            }
            else {
                point = itemData["seat"+i][1];
            }
            (<eui.Label>this.winLabGro.getChildAt(i*2)).text = StringTool.formatNickName(itemData["seat"+i][0]);
            (<eui.Label>this.winLabGro.getChildAt(i*2)).textColor = nameColor;
            (<eui.Label>this.winLabGro.getChildAt(i*2+1)).text = point+"";
            (<eui.Label>this.winLabGro.getChildAt(i*2+1)).textColor = pointColor;
        }

        var selfId = App.DataCenter.UserInfo.httpUserInfo.userID;
        for(var i = 0;i < 4;i ++) {
            if (selfId == Number(itemData["seat"+i][2])) {
                this.selfGro.getChildAt(i).visible = true;
            }
            else {
                this.selfGro.getChildAt(i).visible = false;
            }

            if (itemData.banker_seat == i) {
                (<eui.Image>this.zhuangGro.getChildAt(i)).visible = true;
            }
            else {
                (<eui.Image>this.zhuangGro.getChildAt(i)).visible = false;
            }
        }
    }

    protected childrenCreated() {

    }
}