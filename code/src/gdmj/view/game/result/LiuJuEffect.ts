/**
 * 流局特效
 * @author chenkai
 * @date 2016/9/6
 */
class LiuJuEffect extends BaseUI{
    private image0:eui.Image;
	private image1:eui.Image;
    private cloudParticle:particle.ParticleSystem;
    private rainParticle:particle.ParticleSystem;
	private initImage0X;
	private initImage1X;

    public constructor(){
        super();
        this.skinName = "LiuJuEffectSkin";
        this.touchEnabled = true;
    }

    protected childrenCreated() {
        this.initImage0X = this.image0.x;
		this.initImage1X = this.image1.x;
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
        this.cloudParticle.start();
        this.rainParticle.start();
        this.addChild(this.cloudParticle);
        this.addChild(this.image0);
		this.addChild(this.image1);
        this.addChild(this.rainParticle);
        
		var image0EndX = this.initImage0X;

		this.image0.x = this.initImage0X - this.image0.width;
		this.image0.alpha = 0;
		egret.Tween.get(this.image0).to({x:image0EndX,alpha:1},300);
		
		var image1EndX = this.initImage1X;
		this.image1.x = this.initImage1X - this.image1.width;
		this.image1.alpha = 0;
		this.image1.rotation = 0;
		egret.Tween.get(this.image1).wait(300).to({x:image1EndX,alpha:1},300).to({rotation:90},1900,egret.Ease.bounceOut);
    }
    
    public stopAnim(){
        this.cloudParticle.stop(true);
        this.rainParticle.stop(true);
        egret.Tween.removeTweens(this.image0);
		egret.Tween.removeTweens(this.image1);
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