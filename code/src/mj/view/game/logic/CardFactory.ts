/**
 * 麻将牌工厂，单例类
 * @author chenkai
 * @date 2016/6/29
 */
class CardFactory {
	private cardPool: ObjectPool;   //牌对象池

	public constructor() {
		this.cardPool = ObjectPool.getPool(Card.NAME);
	}

	/**
	 * 获取手牌
	 * @cardValue 牌值
	 * @userPos 用户位置
	 */
	public getHandCard(cardValue: number, userPos: UserPosition): Card {
		var card: Card = this.cardPool.getObject();
		card.setHandSkin(cardValue, userPos);
		//设置鼠标点击事件
		card.touchEnabled = (userPos == UserPosition.Down) ? true : false;
		return card;
	}

	/**
	 * 获取出牌
	 * @cardValue 牌值
	 * @userPos 用户位置
	 */
	public getOutCard(cardValue: number, userPos: UserPosition): Card {
		var card: Card = this.cardPool.getObject();
		card.setOutSkin(cardValue, userPos);
		return card;
	}

	/**
	 * 获取吃牌
	 * @cardValue 牌值
	 * @userPos 用户位置
	 */
	public getEatCard(cardValue: number, userPos: UserPosition): Card {
		var card: Card = this.cardPool.getObject();
		card.setEatSkin(cardValue, userPos);
		return card;
		// if(userPos == UserPosition.Down){
		//     var card: Card = this.cardPool.getObject();
		//     card.setEatSkin(cardValue,userPos);
		//     return card;
		// }else if(userPos == UserPosition.Up){
		// 	var card: Card = this.cardPool.getObject();
		//     card.setUpEatSkin(cardValue,userPos);
		//     return card;
		// }else{
		// return this.getOutCard(cardValue, userPos);
		// }
	}

    /**
	 * 获取暗杠
	 * @cardValue 牌值
	 * @userPos 用户位置
	 */
	public getAnGangCard(cardValue: number, userPos: UserPosition) {
		var card: Card = this.cardPool.getObject();
		card.setAnGangSkin(cardValue, userPos);
		return card;
	}

	private static instance: CardFactory;
	public static getInstance(): CardFactory {
		if (this.instance == null) {
			this.instance = new CardFactory();
		}
		return this.instance;
	}
}
