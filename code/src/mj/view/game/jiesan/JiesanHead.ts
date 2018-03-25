/**
 * @author xiongjian
 * 2017-4-11
 * 
 * 解散房间头像
 */
class JiesanHead extends eui.Component {
    public constructor() {
        super();
        this.skinName = "jiesanHeadSKin";
    }

    public nameLabel: eui.Label;
    public stateLabel: eui.Label;
    public headImg: eui.Image;

    public updataHead(url) {
        if (url && url != "" && url != 1) {
            this.headImg.source = url;
        }
    }

    public updateName(name) {
        if (name && name != "" ) {
            this.nameLabel.text= StringTool.formatNickName("" + name);
        }
    }

    public updataState(data){
        switch(data){
            case JieSanState.wait:
             this.stateLabel.text="等待中"
              this.stateLabel.textColor = 0x3c3c3c;
            break;
            case JieSanState.send:
             this.stateLabel.text="申请解散";
             this.stateLabel.textColor = 0xb33318;
            break;
            case JieSanState.ok:
             this.stateLabel.text="同意解散"
             this.stateLabel.textColor =0x269111;
            break;
            case JieSanState.jujue:
             this.stateLabel.text="拒绝解散";
             this.stateLabel.textColor = 0xb33318;
            break;
        }
           
        
    }


}

enum JieSanState{
    wait,   //等待
    send,   //发送者状态
    ok,     //同意解散
    jujue   //拒绝解散
}