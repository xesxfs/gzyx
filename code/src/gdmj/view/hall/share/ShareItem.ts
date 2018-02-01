/**
 *
 * @author chenwei
 *
 */
class ShareItem extends BaseUI{
	public constructor() {    	
    	super();    	
	}
	//发光标示
    private lightImg:eui.Image;
    //领取标示
    private receiveImg:eui.Image;
    //奖励1,2,述
    private acout1:eui.Label;
    private acout2:eui.Label;
    //奖励1,2图片与底框
    private aImg1:eui.Image;
    private aImg2:eui.Image;
    private ibg1:eui.Image;
    private ibg2:eui.Image;
    //奖励目标人数描述
    private targetLab:eui.Label;
    //奖励目标人数
    public target;
    //奖励id
    public mid;
    
    /**
     * 设置领取状态
     * @param flag TRUE 已领取，FALSE未领取
     */
    public setReceive(flag: boolean){
        this.receiveImg.visible=flag;
    }
    //设置光柱 TRUE显示光柱，FALSE隐藏光柱
    public setLight(flag:boolean){
        this.lightImg.visible=flag
    }
    //是否显示光柱
    public isLight():boolean{
        return this.lightImg.visible;
    }
    //是否领取
    public isReceive():boolean{
        return this.receiveImg.visible;
    }
    
    /**
     * 设置奖励数据
     * @param data 
     */
    public setContent(data:any){
        this.target = data.target;
        this.mid=data.mid;
        this.targetLab.text=this.target.toString()+"人";        
        if(this.acout1){
            this.ibg1.visible=true;
            this.acout1.text = data.ac1;
            this.aImg1.source = data.ai1;
        }
        
        if(data.ac2){
            this.ibg2.visible=true;
            this.acout2.text = data.ac2; 
            this.aImg2.source = data.ai2;
        }

        
    }
}
