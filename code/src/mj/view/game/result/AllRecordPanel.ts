/**
 * @author xiongjian
 * 2017-5-15
 * 解散房间总结算界面
 */

 class AllRecord extends BasePanel {

    public shareBtn: eui.Button;
    public backBtn: eui.Button;
    public zongScroller: eui.Scroller;
    public allList: eui.List;

    public constructor() {
        super();
        this.skinName = "AllRecordSkin";
    }
    protected childrenCreated() {

    }
    protected onEnable() {
        // this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShare,this);
        // this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.back,this);
    }

    protected onRemove() {
        // this.shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onShare,this);
        // this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onShare,this);
    }

    /**
 * 更新总list数据
 */
    public updateZongList() {
        // var json = ProtocolData.Rev100818;
        // let recordlist = json.info.RecordList;

        // let ac = new eui.ArrayCollection();
        // let arr = [];

        // for (let i = 0; i < recordlist.length; i++) {
        //     let dataObj = new Object();
        //     dataObj["userID"] = recordlist[i].userID;
        //     dataObj["lossWinPoint"] = recordlist[i].lossWinPoint;
        //     dataObj["name"] = StringTool.formatNickName(recordlist[i].name);
        //     dataObj["ziMoNum"] = recordlist[i].ziMoNum;
        //     dataObj["huPaiNum"] = recordlist[i].huPaiNum;
        //     dataObj["zhongNiaoNum"] = recordlist[i].zhongNiaoNum;
        //     dataObj["avatar"] = recordlist[i].avatar;

        //     arr.push(dataObj);

        }

        // ac.source = arr;
        // // ac.source=[[],[],[]];
        // this.allList.dataProvider = ac;
        // this.allList.itemRenderer = gameResult2Item;
    }

    /**
     * 分享
     */
    // private onShare() {

    //     App.PanelManager.open(PanelConst.ShareRecordPanel);

    // }

    // //返回
    // private back(){
    //     this.hide();
    // }

// }
