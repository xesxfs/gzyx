class GameScene extends BaseScene {
    protected ctrl: GameController;       //游戏控制模块

    //--------------逻辑--------------
    public cardFactory: CardFactory;      //麻将牌工厂
    public cardLogic: CardLogic;          //麻将牌逻辑
    public cardShowUI: CardsShowUI;
    public headShowUI: HeadShowUI;
    public discShowUI: DiscShowUI;
    public outCardTipUI: OutCardTipUI;
    public touGuanShowUI: TuoGuanShowUI;
    public leftCardShowUI: LeftCardShowUI;
    public outFlagUI: OutFlagUI;
    private outFlagGroup: eui.Group;
    public selectActUI: SelectActUI;



    public constructor() {
        super();
        this.skinName = "GameSceneSkin1";
    }

    /**组件初始化完成 */
    protected childrenCreated() {
        this.cardLogic = CardLogic.getInstance();
        this.cardFactory = CardFactory.getInstance();
        this.outFlagUI = new OutFlagUI();
        this.outFlagGroup.addChild(this.outFlagUI);
        console.log("childrenCreated");
    }

    protected onEnable() {

    }

    protected onRemove() {
        App.SoundManager.stopBGM();
    }


    /*******************************************************************************
     ****************************UI Action start************************************/

    public takeCard(pos: UserPosition, cardValue: number) {
        this.cardShowUI.takeCard(pos, cardValue);
    }

    public outCard(pos: UserPosition, cardValue: number) {
        this.cardShowUI.dealOutAction(pos, cardValue);
    }

    public resetScene() {
        this.cardShowUI.reset();
        this.touGuanShowUI.hideTuoGuan();
        this.outFlagUI.hide();;
        this.discShowUI.hideAllLight();
    }


}