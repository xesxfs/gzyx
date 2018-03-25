/**
 * @author xiongjian 
 * 2017-4-11
 * 解散房间面板
*/

class JieSanPanel extends BasePanel {
    public constructor() {
        super();
        this.skinName = "jiesanPanelSkin";
    }

    // public closeBtn: eui.Button;
    public jujueBtn: eui.Button;
    public okBtn: eui.Button;
    public tiemLabel: eui.Label;
    public headGroup: eui.Group;
    public btnGroup: eui.Group;
    public waitLabel:eui.Label;
    public sendHead:JiesanHead;

    private headList: Array<JiesanHead> = new Array<JiesanHead>(); //下排所有玩家头像
    private uidList = [];    //所有玩家uid
    private count:number =30;
    private timer:egret.Timer;


    /**组件创建完毕*/
    protected childrenCreated() {
        this.btnGroup.visible=true;
        for (let i = 0; i < 3; i++) {
            this.headList.push(<JiesanHead>this.headGroup.getChildAt(i));
        }
        this.waitLabel.visible =false;

        //倒计时
        this.timer= new egret.Timer(1000,30);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
        
    }

    /**添加到场景中*/
    protected onEnable() {
        // this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.jujueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.jujueTouch, this);
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.okTouch, this);
    }

    /**从场景中移除*/
    protected onRemove() {
        // this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.jujueBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.jujueTouch, this);
        this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.okTouch, this);
        this.uidList=[];
    }

    //拒绝解散房间
    private jujueTouch() {
        var ctrl: GameController = App.getController(GameController.NAME);
        // ctrl.sendJieSanBack(SendJieSanState.no);
        this.btnGroup.visible = false;
        this.hide();
    }

    //同意解散房间
    private okTouch() {
        var ctrl: GameController = App.getController(GameController.NAME);
        // ctrl.sendJieSanBack(SendJieSanState.yes);
        this.btnGroup.visible = false;
        this.hide();
    }

    //更新发送解散房间人的信息
    public updateUser(data) {
        // var json = ProtocolData.Rev100155;
        // json = data;
        // // let info =JSON.parse(data.info);
        // let info =data.info;
       
        // let name = info.solveUserName;
        // let seat = info.deskno;
        // let uid = info.solveUserID;
        //  console.info("更新解散"+uid);
        // let userVo: UserVO = App.DataCenter.UserInfo.getUserByUserID(uid);

        // let userList = App.DataCenter.UserInfo.userList;
        // let ulist = [];
        // for (let key in userList) {
        //     if (userList[key].userID == uid) {
        //         this.sendHead.updateName(name);
        //         this.sendHead.updataHead(userVo.headUrl);
        //         this.sendHead.updataState(JieSanState.send);
        //         // this.uidList.push(uid);
        //     } else {
        //         ulist.push(userList[key]);
        //         this.uidList.push(userList[key].userID);//将uid放进数组
        //     }
        // }

        // for (let i = 0; i < ulist.length; i++) {
        //     console.log(ulist[i]);
        //     if(i==3){
        //         return;
        //     }
        //     this.headList[i].updataHead(ulist[i].headUrl);
        //     this.headList[i].updateName(ulist[i].nickName);
        //     this.headList[i].updataState(JieSanState.wait);

        // }

    }

    public timerStart(){
        this.count=30;
        this.timer.stop();
        this.timer.reset();
        this.timer.start();
    }

    /**更新玩家返回状态 */
    public updateState(data) {
        var userid = data.info.user_id;
        var isAgree = data.info.is_agree;
        let state;

        if (isAgree == IsAgree.agree) {
            state = JieSanState.ok
        } else if (isAgree == IsAgree.noAgree) {
            state =JieSanState.jujue
        }
        

        for (let i = 0; i < this.uidList.length; i++) {
            if (userid == this.uidList[i]) {
                // console.log("更新状态"+userid);
                this.headList[i].updataState(state);
            }
        }

    }

    public close() {
        this.hide();
    }

    private timerFunc(){
        if(this.count<10){
            this.tiemLabel.text = "00:0"+this.count;
        }else{
            this.tiemLabel.text ="00:"+this.count;
        }
        
        this.count--;
    }

    private timerComFunc(){
        this.timer.stop();
        this.timer.reset();
        this.count=30;
        this.close();
    }

}


enum SendJieSanState {
    no = 0,
    yes = 1
}

enum IsAgree {
    agree = 1,
    noAgree = 2
}
