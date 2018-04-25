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
    }

    protected onEnable() {
        this.setCenter();
    }

    protected onRemove() {

    }

    private onContinue() {
        this.hide();
        (App.getController(GameController.NAME) as GameController).continueGame();
    }

    public update(mResultData: any) {
        let data = ProtocolData.Rev2020;
        data = mResultData;
        this.scoreLab.text = data.base_gold.toString();
        let playInfos = data.players;
        for (let i = 0; i < 4; i++) {
            let item = this.getChildAt(i + 3) as GameResultItem;
            let playInfo = ProtocolData.player_result_info
            playInfo = playInfos[i];
            item.setHead(playInfo.avater_url);
            item.uidLab.text = playInfo.uid.toString();
            item.nickNameLab.text = playInfo.nick_name;
            item.scoreLab.text = playInfo.score.toString();
            item.goldLab.text = playInfo.gold.toString();
        }
    }

}