/**
 *
 * @author chenwei
 *
 */
class GoldRoomBtn extends eui.Button{
	public constructor() {
    	super()
	}
	//底注
	public base_money:number;
	//最小准入金额
    public min_money: number;
    //最大准入金额
    public max_money: number;
    // 房间等级    
    public room_lv:Room_Level;
    //游戏类型     
    public game_type:GAME_TYPE
    //房间规则
    public game_maima:number;   
    
    private baseMoneyLab:eui.Label;
    private minMoneyLab:eui.Label;
    private configLab:eui.Label

    public init(){
        this.baseMoneyLab.text = "底注：" + this.base_money.toString();
        this.configLab.text =this.game_maima? this.game_maima.toString() + "匹马":"无马";
        if(this.max_money==0){
            this.minMoneyLab.text = this.formateMoney(this.min_money)+"以上";            
        }else{
            this.minMoneyLab.text = this.formateMoney(this.min_money) + "-" + this.formateMoney(this.max_money);
        }
        
       
        
    }
    
    public formateMoney(gold:number):string{
        let goldStr=""
        if(gold>=1000&&gold<10000){
            gold=gold/1000
            goldStr=gold+"千"
        }else if(gold>=10000){
            gold=gold/10000
            goldStr=gold+"万"
        }
        return goldStr
    }
}
