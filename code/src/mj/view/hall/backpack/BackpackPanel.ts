/**
 * 背包界面
 * @author chen 
 * @date 2017/2/22
 */
class BackpackPanel extends BasePanel {
	public iconImg: eui.Image;
	public userBtn: eui.Button;
	public nameLab: eui.Label;
	public descLab: eui.Label;
	public numLab: eui.Label;
	public itemLst: eui.List;
	public haveLab: eui.Label;
	public closeBtn: eui.Button;

	public constructor() {
		super();
		this.skinName = "BackpackPanelSkin";
	}

	protected childrenCreated() {

	}

	protected onEnable() {
		this.setCenter();
		this.update();

		App.EventManager.addEvent(EventConst.ShowItemDesc, this.onShowItem, this);
		App.EventManager.addEvent(EventConst.UseItem, this.revUseItem, this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	protected onRemove() {
		App.EventManager.removeEvent(EventConst.ShowItemDesc, this.onShowItem, this);
		App.EventManager.removeEvent(EventConst.UseItem, this.revUseItem, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		this.clearItemInfo();
	}

	private onTouch(evt: egret.TouchEvent) {
		switch (evt.target) {
			case this.userBtn:
				//使用物品
				if (this._focusItem) {
					(App.getController(HallController.NAME) as HallController).sendUseItem(this._focusItem["id"]);
				}
				this.userBtn.enabled = false;
				break;
			case this.closeBtn:
				this.hide();
				break;

			default:
				break;
		}

	}

	private revUseItem(data: any) {
		let msg: string = "恭喜您获得";

		if (data.type == ItemType.GOLD) {
			msg += data.reward + "金币 ";
			//更新金币信息
			App.EventManager.sendEvent(EventConst.UpdateGold, data.reward);
		} else if (data.type == ItemType.DIAMOND) {
			msg += data.reward + "钻石 ";
			//更新钻石信息
			App.EventManager.sendEvent(EventConst.UpdateDiamond, data.reward)
		}

		// 提示获得物品信息
		if (data.type == ItemType.LOTTERY) {
			let arr: Array<Object> = data.reward_info;
			let reward;
			arr.forEach((item) => {
				//获取物品名称
				reward = App.DataCenter.BagInfo.itemList[item["id"]];
				if (reward) {
					msg += reward["name"] + "x1";
				}
			});
		}

		App.MsgBoxManager.getBoxB().showMsg(msg);

		//更新物品的数量
		let num = this._focusItem["num"];
		if (num > 0) {
			num--;
			this._focusItem["num"] = num;
			//清空显示信息
			if (num == 0) {
				this.clearItemInfo();
			} else {
				this.numLab.text = num + "";
				this.userBtn.enabled = true;
			}
		}
	}

	private _focusItem: Object;
	//显示物品详细信息
	private onShowItem(data: any) {
		this.iconImg.source = data["icon"];
		this.descLab.text = data["desc"];
		this.numLab.text = data["num"];
		this.nameLab.text = data["name"];
		this.haveLab.text = "拥有：";
		this._focusItem = data;

		// 4和0不可以被使用
		if (data.type == ItemType.SYSTEM || data.type == ItemType.EXCHANGE) {
			this.userBtn.enabled = false
		} else {
			this.userBtn.enabled = true;
		}
	}

	private clearItemInfo() {
		this.iconImg.source = "item_null_png";
		this.descLab.text = "";
		this.numLab.text = "";
		this.nameLab.text = "";
		this._focusItem = null;
		this.userBtn.enabled = false;
	}

	private update() {
		var nArr = []

		var itemList = App.DataCenter.BagInfo.itemList;
		// 商品商品列表和兑换卷
		var arr2 = ProtocolHttp.rev_ViewBag.item_list.concat(ProtocolHttp.rev_ViewBag.discount_list);
		console.log(arr2);
		
		arr2.forEach((element) => {
			var item = {};
			item["id"] = element["type"] == ItemType.EXCHANGE ? element["item_id"] : element["id"];
			item["name"] = element["name"];
			item["type"] = element["type"];

			if (element["num"]) {
				item["num"] = element["num"];
			}

			if (element["reward"]) {
				item["reward"] = element["reward"];	//兑换价值 仅仅在type为2和3时有效
			}

			if (element["sign"]) {
				item["sign"] = element["sign"];		//兑换码
			}

			//从物品列表中获取图标和商品描述
			if (itemList[item["id"]]) {
				item["icon"] = "item_" + itemList[item["id"]]["icon_id"] + "_png";
				item["desc"] = itemList[item["id"]]["desc"];
			}
			nArr.push(item);
		});

		this.itemLst.itemRenderer = BackpackItem;
		this.itemLst.dataProvider = new eui.ArrayCollection(nArr);
	}

	/**返回 */
	protected back() {
		this.hide();
	}

}