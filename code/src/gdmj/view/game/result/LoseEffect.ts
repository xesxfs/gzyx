/**
 * 输特效
 * @author chenkai
 * @date 2016/9/1
 */
class LoseEffect extends BaseUI{
    private loseImage:eui.Image;
    private cloudParticle:particle.ParticleSystem;
    private rainParticle:particle.ParticleSystem;

    public constructor(){
        super();
        this.skinName = "LoseEffectSkin";
        this.touchEnabled = true;
    }

    protected childrenCreated() {
        
    }

    protected onEnable() {
        if(this.cloudParticle == null){
            this.createParticle();
        }
        this.playAnim();
    }

    protected onRemove() {

    }

    public playAnim(){
//        this.cloudParticle.start();
        this.rainParticle.start();
//        this.addChild(this.cloudParticle);
        this.addChild(this.loseImage);
        this.addChild(this.rainParticle);
        
        this.loseImage.y = -this.loseImage.height;
        var endY = (App.StageUtils.stageHeight - this.loseImage.height)/2;
        egret.Tween.get(this.loseImage).to({y:endY},1000,egret.Ease.bounceOut);
    }
    
    public stopAnim(){
        this.cloudParticle.stop(true);
        this.rainParticle.stop(true);
        egret.Tween.removeTweens(this.loseImage);
    }
    
    private createParticle(){
        var texture = RES.getRes("result_cloud_png");
        var json = RES.getRes("result_cloud_json");
        this.cloudParticle = new particle.GravityParticleSystem(texture,json);
        this.cloudParticle.x = -360;
        this.cloudParticle.y = 200;
        

        var texture = RES.getRes("result_rain_png");
        var json = RES.getRes("result_rain_json");
        this.rainParticle = new particle.GravityParticleSystem(texture,json);
        this.rainParticle.x = 160;
        this.rainParticle.y = 220;
        

    }
    
    public hide(){
        if(this.cloudParticle){
            this.stopAnim();
        }
        this.parent && this.parent.removeChild(this);
    }
}