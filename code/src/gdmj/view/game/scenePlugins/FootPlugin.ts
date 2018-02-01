/**
 * 头角插件
 * @author xiongjian 
 * @date 2017/6/29
 */
class FootPlugin extends BaseUI {

    private gameSceneBg: eui.Image;      //游戏背景
    private matchTitleGroup: eui.Group;
    private friendTitleGroup: eui.Group;
    private desknum: eui.BitmapLabel;   //房间号label
    private jushu: eui.BitmapLabel;     //局数label


    public constructor() {
        super();
        this.skinName = "footPlugin";
    }

    /**
     * 根据房间类型显示不同头部
     * @type RoomType
     * 
     */
    public setTitle(type: RoomType) {
        switch (type) {
            case RoomType.FriendRoom:
                this.matchTitleGroup.visible = true;
                this.friendTitleGroup.visible = false;
                break;
            case RoomType.MatchRoom:
                this.matchTitleGroup.visible = false;
                this.friendTitleGroup.visible = true;
                break;
        }
    }

    /**设置房间号 */
    public setRoomNumber(number) {
        if (number && number != "") {
            this.desknum.text = number;
        }
    }

    /**设置局数 */
    public setJushu(count) {
        if (count && count != "") {
            this.desknum.text = count;
        }
    }

}