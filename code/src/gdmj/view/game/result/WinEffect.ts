/**
 * 赢特效
 * @author chenkai 
 * @date 2016/9/1
 */
class WinEffect extends BaseUI{
    private winImage:eui.Image;
    private moneyParticle:particle.ParticleSystem;
    private flashParticle:particle.ParticleSystem;
    
	public constructor() {
    	super();
    	this.skinName = "WinEffectSkin";
        this.touchEnabled = true;
	}
	
    protected childrenCreated() {
    
    }

    protected onEnable() {
        if(this.moneyParticle == null){
            this.createParticle();
        }
        this.playAnim();
    }

    protected onRemove() {
        this.stopAnim();
    }
    
    public playAnim(){
        this.moneyParticle.start();
        this.flashParticle.start();
        this.addChild(this.moneyParticle);
        this.addChild(this.flashParticle);
        this.addChild(this.winImage);
        
        this.winImage.scaleX = 0;
        this.winImage.scaleY = 0;
        egret.Tween.get(this.winImage).to({scaleX:1.5,scaleY:1.5},1000,egret.Ease.bounceOut);
    }
    
    public stopAnim(){
        this.moneyParticle.stop(true);
        this.flashParticle.stop(true);
        egret.Tween.removeTweens(this.winImage);
    }
    
    private createParticle(){
        var texture = RES.getRes("result_money_png");
        var json = RES.getRes("result_money_json");
        this.moneyParticle = new particle.GravityParticleSystem(texture,json);
        this.moneyParticle.x = -360;
        this.moneyParticle.y = 0;
        

        var texture = RES.getRes("result_flash_png");
        var json = RES.getRes("result_flash_json");
        this.flashParticle = new particle.GravityParticleSystem(texture,json);
        this.flashParticle.x = 160;
        this.flashParticle.y = 220;
        

    }
    
    public hide(){
        if(this.moneyParticle){
            this.stopAnim();
        }
        this.parent && this.parent.removeChild(this);
    }
	
}
