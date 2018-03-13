/**
 * 自定义UI
 * @author chen 
 * @date 2016/7/5
 */
class BaseUI extends eui.Component{
	public constructor() {
      super();
      this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onEnable,this);
      this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemove,this);
      
      this.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
          if(e.target instanceof eui.Button){
              var button:eui.Button =<eui.Button> e.target;
              App.SoundManager.playEffect(SoundManager.button);
          }
          

      },this)
	}
	
    /**组件创建完毕*/
    protected childrenCreated() {
        
    }

    /**添加到场景中*/
    protected onEnable() {
        
    }

    /**从场景中移除*/
    protected onRemove() {

    }

    /**设置居中对齐*/
    public setCenter(){
        this.x = (App.StageUtils.stageWidth - this.width) / 2;
        this.y = (App.StageUtils.stageHeight - this.height) / 2;
    }

    /**设置底部对齐*/
    public setBottom(){
        this.x = (App.StageUtils.stageWidth - this.width) / 2;
        this.y = (App.StageUtils.stageHeight - this.height);
    }


    /**隐藏*/
    public hide() {
        this.parent && this.parent.removeChild(this);
    }

    /**销毁*/
    protected onDestroy() {

    }

    
}
