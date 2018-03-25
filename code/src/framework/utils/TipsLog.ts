module TipsLog {
	/**
	 * 顶部悬浮提示
	 * @author huang
	 * 2017/04/27
	 */

    export function info(str: string) {        
        show(str);
    }

    export function hallInfo(str: string) {
        showTop(str);
    }

    export function gameInfo(str: string) {
        showTop(str, true);
    }

    export function staticInfo(str: string) {
        var tipGro = new eui.Group();
        tipGro.width = App.StageUtils.stageWidth;
        tipGro.height = 100;

        var tipsBg = new eui.Image();
        tipsBg.texture = RES.getRes("tiplog_hall_png");
        tipsBg.horizontalCenter = 0;
        tipGro.y = 0;

        var showText = new eui.Label();
        showText.size = 30;
        showText.textColor = 0xfff1be;
        showText.text = str;
        showText.horizontalCenter = 0;
        showText.y = (tipsBg.height-showText.size)/2;

        tipGro.addChild(tipsBg);
        tipGro.addChild(showText);

        if (App.LayerManager.tipLayer.numChildren > 0) {
            egret.Tween.removeAllTweens();
            App.LayerManager.tipLayer.removeChildren();
        }
        setTimeout(()=>{
            App.LayerManager.tipLayer.removeChildren();
        }, 2500);
    }

    function showTop(str:string, game:boolean = false) {
        var tipGro = new eui.Group();
        tipGro.width = App.StageUtils.stageWidth;
        tipGro.height = 100;

        var tipsBg = new eui.Image();
        if (!game) {
            tipsBg.texture = RES.getRes("tiplog_hall_png");
        }
        else {
            tipsBg.texture = RES.getRes("tiplog_game_png");
            tipsBg.scale9Grid = new egret.Rectangle(20,7,123,45);
            tipsBg.width = 600;
            tipsBg.alpha = 0.95;
        }
        tipsBg.horizontalCenter = 0;
        tipGro.y = -tipsBg.height;

        var showText = new eui.Label();
        showText.size = 30;
        showText.textColor = 0xfff1be;
        showText.text = str;
        showText.horizontalCenter = 0;
        showText.y = (tipsBg.height-showText.size)/2;
        if (!game) {
            showText.y = showText.y -3;
        }

        tipGro.addChild(tipsBg);
        tipGro.addChild(showText);

        if (App.LayerManager.tipLayer.numChildren > 0) {
            egret.Tween.removeTweens(tipGro);
            App.LayerManager.tipLayer.removeChildren();
        }
        App.LayerManager.tipLayer.addChild(tipGro);

        egret.Tween.get(tipGro)
        .to({y: 0}, 200)
        .wait(2000)
        .to({y: -tipsBg.height, alpha: 0}, 300)
        //.to({alpha: 0}, 300)
        .call(()=>{
            egret.Tween.removeTweens(tipGro);
            App.LayerManager.tipLayer.removeChildren();
        })

        setTimeout(()=>{
            if (tipGro && tipGro.parent) {
                App.LayerManager.tipLayer.removeChild(tipGro);
            }
        }, 3000);
    }
    
	function show(str:string){	   

        var showtext = new egret.TextField();
        showtext.size = 28;
        showtext.strokeColor = 0x934c26;
        
        var tipsBg: egret.Sprite = new egret.Sprite()
        tipsBg.graphics.beginFill(0x934c26);
        let x = 0;
        let y = 0;
        let offset=40;
        tipsBg.graphics.drawRoundRect(x,y,str.length * showtext.size + offset,showtext.size + offset,50);
        tipsBg.graphics.endFill();     
        tipsBg.alpha=0.9;
        showtext.stroke = 2;
        showtext.bold = true;
        showtext.text = str;    
        
        tipsBg.addChild(showtext);
        showtext.x = (tipsBg.width-showtext.width)/2;
        showtext.y = (tipsBg.height-showtext.height)/2;        
        tipsBg.x = (App.StageUtils.stageWidth - tipsBg.width) / 2;
        tipsBg.y = (App.StageUtils.stageHeight - tipsBg.height) / 2;
        App.LayerManager.tipLayer && App.LayerManager.tipLayer.addChild(tipsBg);
        
        EffectUtils.showFload(tipsBg,2000); 
      }
}
