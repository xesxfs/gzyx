/**
 * 背包信息
 * @author chenwei
 *
 */
class BagInfo {
    
	public constructor() {
    	this.init();
	}
	
	
	private init(){
        this.act = ItemType.default;
        this.face = ItemType.default;
        this.scene = ItemType.default;

        this.initScene();
	}
	
	public act:ItemType;
    public face:ItemType;
    public scene:ItemType;
    

    //场景资源组名
    private sceneGroupList = [];
    //场景图片名
    private scenePngList = [];

    //初始化场景
    private initScene(){
        // this.sceneGroupList = ["defaultScene", "youselfScene","vipScene"];  //新增场景，则直接增加到该列表中
        // this.scenePngList = ["game_bg_jpg", "game_bg_jpg", "game_bg_jpg"];
        // var sceneNum = this.sceneGroupList.length;
        // for(var i=0;i<sceneNum;i++){
        //     RES.createGroup(this.sceneGroupList[i], [this.scenePngList[i]]);
        // }
    }

    /**
     * 根据选择的场景ItemType,获取场景对应的groupName，用于进入游戏前加载对应的资源
     * @return 选择的场景对应资源组名
     */
    public getSceneGroupName():string{
        return this.sceneGroupList[this.scene];
    }

    /**
     * 根据选择的场景ItemType，获取场景对应的图片名称，用于进入游戏后，设置游戏场景image.bitmapData = RES.getRes(pngName)
     * @return 选择的场景对应图片名
     */
    public getScenePngName():string{
        return this.scenePngList[this.scene];
    }
}

/**背包中物品所属类型，默认、专属、VIP*/
enum ItemType{
    default,
    youself,
    vip
}