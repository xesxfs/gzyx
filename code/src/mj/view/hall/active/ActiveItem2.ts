// 英雄令任务
class ActiveItem2 extends eui.ItemRenderer {
    constructor() {
        super()
        this.skinName = "ActiveItemSkin";
    }

    public receiveBtn: eui.Button;

    protected childrenCreated() {
        this.receiveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    private onTouch() {
        //完成每日任务
        var httpsend = new HttpSender();
        var req = ProtocolHttp.send_FinishTask;
        req.param.task_id = this.data["task_id"];
        req.param.uid = App.DataCenter.UserInfo.selfUser.userID;
        req.param.type = TaskType.Daily;
        httpsend.send(req, this.revFinishTask, this);

        this.receiveBtn.enabled = false;
    }

    private revFinishTask(rev: any) {
        if (rev.data) {
            //获取当前任务id的奖品信息,更新页面
            ProtocolHttp.rev_FinishTask = rev.data;
            if (rev.data["task_id"] == this.data["task_id"]) {
                this.data["unclaimed"] = rev.data["unclaimed"];
                this.data["finished"] = rev.data["finished"];
                this.data["num"] = this.data["finished"] + " / " + this.data["limit"]
                this.validateNow();
            }
        } else {
            Tips.error(rev.desc);
        }
    }

    protected dataChanged() {
        super.dataChanged();

        // 该任务可领取奖励的次数
        this.receiveBtn.enabled = this.data["unclaimed"] - this.data["finished"] > 0 && this.data["unclaimed"] < this.data["limit"]  ? true : false;
    }
}