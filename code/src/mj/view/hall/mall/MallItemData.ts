/**
 * 商城item数据
 * @author huanglong
 *  2017/03/09
 */

class MallItemData {

    /**商品Id */
    public goodsId:number;
	/**商品名 */
	public goodsName:string;
	/**图标资源地址 */
	public iconUrl:string;
	/**描述 */
	public descStr:string;
	/**价格 */
	public price:number;

	public constructor(data = null) {
		this.init(data);
	}

	/**设置默认值或数据 */
	private init(data:any) {
		this.goodsName = "局数卡x1";
		this.iconUrl = "hall_ten_card_png";
		this.descStr = "可以开设好友房牌局";
		this.price = 6;
	}

	public setData(data:any) {
        this.goodsId = data.id;
        this.goodsName = data.name;
        this.iconUrl = App.getController("HallController").getUrl(data.id);
        this.descStr = data.desc;
        this.price = data.buy_money;
	}
}