/**
 * 场景管理类
 * @author chenkai
 * @date 2016/11/9
 */
class SceneManager extends SingleClass{
    //当前场景
    private curScene: BaseScene;
    //场景类定义列表
    private sceneClassList = {};
    //场景实例列表
    public sceneList = {};
    
    /**
     * 注册场景
     * @sceneID 场景ID
     * @sceneClass 场景类定义
     */ 
    public register(sceneID:number, sceneClass:any){
        this.sceneClassList[sceneID] = sceneClass;
    }
  
    /**
     * 运行场景
     * @sceneID 场景ID
     * @controller 该场景控制模块
     * @return 返回当前场景
     */ 
    public runScene(sceneID:number, controller:BaseController = null){
        //隐藏当前场景
        if(this.curScene) {
            App.LayerManager.sceneLayer.removeChild(this.curScene);
        }
        
        //获取运行场景，若不存在，则新建
        var nextScene: BaseScene = this.sceneList[sceneID];
        if(nextScene == null){
            var clz = this.sceneClassList[sceneID];
            if(clz != null){
                nextScene = new clz();
                this.sceneList[sceneID] = nextScene;
            }else{
                console.error("当前场景不存在:",sceneID);
                return null;
            }
        }
        //设置当前场景
        this.curScene = nextScene;       
        //控制模块     
        controller && this.curScene.setController(controller);            
        //显示场景
        App.LayerManager.sceneLayer.addChild(this.curScene);
        return this.curScene;
    }
    

    /**
     * 获取场景
     * @sceneID 场景ID
     * @return 返回场景
     */ 
    public getScene(sceneID:number){
        return this.sceneList[sceneID];
    }
    
    /**
     * 
     * @param sceneID
     * @param scene
     */
    public setScene(sceneID:number,scene){
        this.sceneList[sceneID] =scene;
    }
    
    /**
     * 获取当前场景
     */
    public getCurScene(){
        return this.curScene;
    }
}