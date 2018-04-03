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

	public constructor() {
		super();
		this.skinName = "BackpackPanelSkin";
	}

	protected childrenCreated() {
		App.EventManager.addEvent(EventConst.ShowItemDesc, this.onShowItem, this);
		this.userBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	private onTouch() {
		//使用物品
		if (this._focusItem) {
			var httpsend = new HttpSender();
			var request = ProtocolHttp.send_UseItem;
			request.param.item_id = this._focusItem["id"];
			request.param.uid = App.DataCenter.UserInfo.selfUser.userID;
			httpsend.send(request, this.revUseItem, this);
		}
		this.userBtn.enabled = false;
	}

	private revUseItem(rev: any) {
		if (rev.data) {
			if (rev.data.type == ItemType.GOLD) {
				//更新金币信息
				App.EventManager.sendEvent(EventConst.UpdateGold, rev.data.reward);
			} else if (rev.data.type == ItemType.DIAMOND) {
				//更新钻石信息
				App.EventManager.sendEvent(EventConst.UpdateDiamond, rev.data.reward)
			}

			//更新物品的数量
			let num = this._focusItem["num"];
			if (num > 0) {
				console.log(num);
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

	protected onEnable() {
		this.setCenter();
		this.update();
	}

	protected onRemove() {

	}

	private update() {
		var nArr = []

		var itemList = App.DataCenter.BagInfo.itemList;
		// 商品商品列表和兑换卷
		var arr2 = ProtocolHttp.rev_ViewBag.item_list.concat(ProtocolHttp.rev_ViewBag.discount_list);
		arr2.forEach((element) => {
			var item = {};
			item["id"] = element["id"];
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