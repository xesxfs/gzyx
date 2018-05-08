/**
 *
 * @author chenwei
 *
 */
class RoomInfo {
	public constructor() {
    	this.deskList =[];
    	this.init();
	}	
	//桌子列表
	public deskList:Array<DeskInfo>;
	//当前桌子
    private curDesk:DeskInfo;	
    //二维码
    public QrUrl:string;

    public roomType:number;  //好友房为1 匹配房为2
        
    public clean(){
        this.init();
    }
    
    public getCurDesk():DeskInfo{
        return this.curDesk
    }
    
    private init() {
        this.deskList = [];
        this.curDesk =null;
    }
    
    public readDeskList(data:Array<any>){
        this.clean();
        data.forEach((deskInfo)=>{            
            let desk:DeskInfo =new DeskInfo();
            desk.readData(deskInfo);
            this.deskList.push(desk);   
            })
                
        this.sortDesk(this.deskList);
    }
    
    public sortDesk(deskList){
        let len = deskList.length;
        
        for(var i = 0;i < len;i++) {
            for(var j = i + 1;j < len;j++) {
                if(deskList[i].deskID > deskList[j].deskID) {
                    var temp = deskList[i];
                    deskList[i] = deskList[j];
                    deskList[j] = temp;
                }
            }
        }
    }
    
    public setCurDesk(deskNo:number){
        this.curDesk = this.getDeskByNo(deskNo);
    }
    

    public setCurDeskById(deskId:number){
        this.curDesk = this.getDeskById(deskId);
    }
    
    public addDesk(data){
        let desk :DeskInfo =new DeskInfo();
        desk.readData(data);
        this.deskList.push(desk);        
    }
    
    public exCurDesk(data){      
        let isChange:boolean =false;
        let config;      
        if(data.basePoint) {
            this.curDesk.basePoint = data.basePoint;   
            isChange = true;
        }
        if(data.deskName) {
            this.curDesk.deskName = data.deskName;
            
        }
        config = data.gameConfig
        if(!config) return;
        for(let key in config) {
            this.curDesk.gameConfig[key] = config[key]
            isChange =true;
        }
        return isChange;
    }
    public getDeskById(deskId: number): DeskInfo {
        let findDesk: DeskInfo;
        for(let i = 0;i < this.deskList.length;i++) {
            let desk = this.deskList[i]
            if(deskId == desk.deskID) {
                findDesk = desk;
                return findDesk;
            }
        }
        console.log("no find deskId:",deskId);
    }
    
    public getDeskByNo(deskNo:number):DeskInfo{        
        let findDesk:DeskInfo;        
        for(let i =0;i<this.deskList.length;i++){
            let desk =this.deskList[i]
            if(deskNo == desk.deskNo) {
                findDesk = desk;
                return findDesk;
            }    
        }
      console.log("no find deskNo:",deskNo);        
    }	
}
    enum RoomType{
        FriendRoom=1,
        MatchRoom = 2
    }