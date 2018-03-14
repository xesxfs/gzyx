/**
 * 预加载面板
 * @author chenwei
 * @date 2016/07/14
 */
class PreloadPanel extends BasePanel {
    /**进度文本*/
    private percentLab: eui.Label;
    /**进度条*/
    //    private loadProgress:eui.ProgressBar;
    /*加载动画*/
    private mc: egret.MovieClip;
    /**转圈 */
    private mcCir: egret.MovieClip;
    public preGro: eui.Group;
    public gameGro: eui.Group;

    public constructor() {
        super();
        this.skinName = "PreloadPanelSkin";
    }

    protected onEnable() {
        this.setProgress(0);

        // if (this.recData) { //进入游戏场
        //     this.gameGro.visible = true;
        //     this.preGro.visible = false;
        //     if(!this.mcCir) {
        //         var data = RES.getRes("loadMc_json");
        //         var texture = RES.getRes("loadMc_png");
        //         var mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);
        //         this.mcCir = new egret.MovieClip(mcDataFactory.generateMovieClipData("load"));
        //         this.mcCir.x = (App.StageUtils.stageWidth - this.mcCir.width) / 2;
        //         this.mcCir.y = (App.StageUtils.stageHeight - this.mcCir.height) / 2-this.mcCir.height+10;
        //     }
        //     this.gameGro.addChild(this.mcCir);
        //     this.mcCir.gotoAndPlay("roll",-1);
        // }
        // else {
        //     //关闭原生Loading
        //     App.NativeBridge.sendCloseStart();
        //     this.gameGro.visible = true;
        //     this.preGro.visible = true;
        //     // if(this.mc == null) {
        //     //     var data = RES.getRes("pload_json");
        //     //     var texture = RES.getRes("pload_png");
        //     //     var mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);
        //     //     this.mc = new egret.MovieClip(mcDataFactory.generateMovieClipData("pload"));
        //     //     this.mc.x = (App.StageUtils.stageWidth - this.mc.width) / 2;
        //     //     this.mc.y = (App.StageUtils.stageHeight - this.mc.height) *0.6;
        //     // }
        //     // this.preGro.addChild(this.mc);
        //     // this.mc.gotoAndPlay("load",-1);
        //     if(!this.mcCir) {
        //         var data = RES.getRes("loadMc_json");
        //         var texture = RES.getRes("loadMc_png");
        //         var mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);
        //         this.mcCir = new egret.MovieClip(mcDataFactory.generateMovieClipData("load"));
        //         this.mcCir.x = (App.StageUtils.stageWidth - this.mcCir.width) / 2;
        //         this.mcCir.y = (App.StageUtils.stageHeight - this.mcCir.height) / 2-this.mcCir.height+10;
        //     }
        //     this.gameGro.addChild(this.mcCir);
        //     this.mcCir.gotoAndPlay("roll",-1);
        // }
    }

    protected onRemove() {
        this.setProgress(0);
    }

    /**
     * 设置加载进度
     * @value 进度 0-100
     */
    public setProgress(value: number) {
        if (this.percentLab) {
            this.percentLab.text = value + "%";
        }
        //        this.loadProgress.value = value;
    }

}
