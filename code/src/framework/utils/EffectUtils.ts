module EffectUtils {
	/**
	 *
	 * @author chenwei
	 *  2016/07/12
	 */
	
	
	/*
	 *  由大到小
	 */ 
	export function showMax2Min(egretObj:egret.DisplayObjectContainer|egret.DisplayObject,waitTime:number=1000){	  
    	
        egretObj.anchorOffsetX = egretObj.width / 2;
        egretObj.anchorOffsetY = egretObj.height / 2;
        egretObj.scaleX = 4;
        egretObj.scaleY = 4;
        egretObj.alpha = 0;
        egret.Tween.get(egretObj).to({ scaleX: 1,scaleY: 1,alpha: 1 },200).wait(waitTime).call(() => { egretObj.parent && egretObj.parent.removeChild(egretObj) });
	}
	
    export function showFload(egretObj: egret.DisplayObjectContainer | egret.DisplayObject,waitTime: number = 1000){
        let y=egretObj.y
        var time = new Date();
        var timea=time.getSeconds();
        egret.Tween.get(egretObj).wait(waitTime).to({ y: y - 100,alpha: 0.5 },250).call(() => { 
            var end = new Date();
            var enda = end.getSeconds();
            var a= enda-timea
            console.log("tips显示时间="+a)
            egretObj.parent && egretObj.parent.removeChild(egretObj)});
	}

    /**
     * =跳动
     * @param egretObj  对象
     * @param bounceTime 跳动时间
     * @param beforewaitTime 跳动前等待时间
     * @param afterwaitTime  跳动后等待时间
     */
    export function bounce(egretObj: egret.DisplayObjectContainer | egret.DisplayObject,bounceTime:number=200,beforewaitTime: number = 0,afterwaitTime=0){
        var originalY=egretObj.y;
        egret.Tween.get(egretObj,{ loop: true }).wait(beforewaitTime).to({ y: originalY - egretObj.height / 3 },bounceTime / 2).to({ y: originalY },bounceTime / 2).wait(afterwaitTime);
	}
	
    /**
     *  一个跟着一个跳动
     * @param egretObjs 对象组
     */
    export function bounceOneByOne(egretObjs:Array<egret.DisplayObjectContainer|egret.DisplayObject>){
        
        let numChildren = egretObjs.length;
        //弹跳时间
        let bounceTime = 400;
        //弹跳前的等待时间
        let beforewaitTime = 0;
        //弹跳后的等待时间
        let afterwaitTime = 0;
        //弹跳等待(前后)的偏移时间 百分比
        let offset = 0.5;
        for(let i = 0;i < numChildren;i++) {
            beforewaitTime = (i) * (bounceTime *(1-offset));
            afterwaitTime = (numChildren - i) * (bounceTime * (1 - offset));
            EffectUtils.bounce(egretObjs[i],bounceTime,beforewaitTime,afterwaitTime);
        }
	    
	}
	//移除单个缓动
    export function removeTween(egretObj: egret.DisplayObjectContainer | egret.DisplayObject){
        egret.Tween.removeTweens(egretObj);
    }
	//移除组缓动
    export function removeObjsTween(egretObjs: Array<egret.DisplayObjectContainer | egret.DisplayObject>) {
        let numChildren = egretObjs.length;
        for(let i = 0;i < numChildren;i++) {
            EffectUtils.removeTween(egretObjs[i]);
        }
    }

}
