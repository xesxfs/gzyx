/**
 * 舞台类
 * @author chenkai
 * @date 2016/10/11
 */
class StageUtils extends SingleClass{
	
	/**
	 * 获取舞台
	 */
	public get stage():egret.Stage{
		return egret.MainContext.instance.stage;
	}

	/**
	 * 获取舞台宽度
	 */
	public get stageWidth(){
		return this.stage.stageWidth;
	}

	/**
	 * 获取舞台高度
	 */
	public get stageHeight(){
		return this.stage.stageHeight;
	}

	/**
	 * 获取舞台一半宽度
	 */
	public get halfStageWidth(){
		return this.stage.stageWidth/2;
	}

	/**
	 * 获取舞台一半高度
	 */
	public get halfStageHeight(){
		return this.stage.stageHeight/2;
	}

	/**
	 * 启动旋转适配。解决手机浏览器旋转时的一些问题。
	 * 在fixed_width模式下，手机横置并且浏览器可以旋转，游戏画面底部将会被裁剪而看不见。
	 */
	public runBrowserAdapt(){
		this.stage.addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE, this.changeScaleMode, this);
	}

	/**
	 * 浏览器适配。浏览器竖着时fiexd_width；横着时show_all。防止横着时底端被裁剪。
	 * 只有当浏览器横置时，宽高比才会超过16:9。
	 */
	public changeScaleMode(){
        // if(egret.Capabilities.boundingClientWidth / egret.Capabilities.boundingClientHeight > 9/16){
        //     this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        // }else{
        //     this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
        // }
		console.log("当前适配模式:",this.stage.scaleMode);
    }

}