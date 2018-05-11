/**
 * 2017-3-8
 * author:
 */

class GameResultPanel extends BasePanel {

    public scoreLab: eui.Label;
    public ksyxBtn: eui.Button;
    public closeBtn: how.Button;

    public constructor() {
        super();
        this.skinName = "gameResultSkin";
    }

    protected childrenCreated() {
        this.closeBtn.addEventListener("touchTap", this.hide, this);
        this.ksyxBtn.addEventListener("touchTap", this.onContinue, this);
        for (let i = 0; i < 4; i++) {
            let item = this.getChildAt(i + 3) as GameResultItem;
            item.visible = false;
        }
    }

    protected onEnable() {
        this.setCenter();
    }

    protected onRemove() {

    }

    private onContinue() {
        this.hide();
        (App.getController(GameController.NAME) as GameController).sendEvent(HallController.EVENT_SHOW_HALL);
    }

    public update(mResultData: any) {
        let data = ProtocolData.Rev204;
        data = mResultData;

        let playInfos = data.players;
        for (let i = 0; i < playInfos.length; i++) {
            let item = this.getChildAt(i + 3) as GameResultItem;
            item.visible = true;
            let playInfo = ProtocolData.player_info
            playInfo = playInfos[i];
            item.setHead(playInfo.avater_url);
            item.uidLab.text = playInfo.uid.toString();
            item.nickNameLab.text = playInfo.nick_name;
            item.scoreLab.text = playInfo.total_score.toString();
            // item.goldLab.text = playInfo.gold.toString();
        }
    }

}