class ClubMember extends BaseUI {
	public constructor() {
		super();

		this.skinName = "ClubMemberSkin";
	}

	public deleteBtn: how.Button;
	public agreeBtn: how.Button;
	public membersLst: eui.List;
	public rect: eui.Rect;
	public memberGrp: eui.Group;

	private _clubId: number;							//俱乐部ID
	private _membersCollction: eui.ArrayCollection;		//俱乐部成员数据
	private _applyCollection: eui.ArrayCollection;		//俱乐部申请加入数据

	private get ctrl(): HallController {
		return App.getController(HallController.NAME) as HallController;
	}

	protected childrenCreated() {
		this.membersLst.itemRenderer = ClubMemberItem;
	}

	/**添加到场景中*/
	protected onEnable() {
		this.setCenter();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		App.EventManager.addEvent(EventConst.SelectedMember, this.onSelectMember, this);
	}

	private onTouch(evt: egret.TouchEvent) {
		switch (evt.target) {
			case this.deleteBtn:
				this.deleteMember();
				break;
			case this.agreeBtn:
				this.agreeApply();
				break;
			case this.rect:
				this.visible = false;
				break;

			default:
				break;
		}
	}

	public initMembers() {
		this.memberGrp.x = 980;
		let data = ProtocolHttp.rev_ClubMembers.list;
		this._membersCollction = new eui.ArrayCollection(data);
		this.membersLst.dataProvider = this._membersCollction;
		this.deleteBtn.visible = true;
	}

	public initApply() {
		this.memberGrp.x = 900;
		let data = ProtocolHttp.rev_ClubRequest.apply_list;
		data.forEach((element) => {
			element["id"] = element["uid"];
			element["nick_name"] = element["user"]["nick_name"];
		})

		this._applyCollection = new eui.ArrayCollection(data);
		this.membersLst.dataProvider = this._applyCollection;
		this.agreeBtn.visible = true;
	}

	private _focusMember: Object;			//当前选中的成员数据
	private _focusItem: ClubMemberItem;		//当前选中的ITEM UI
	/** 选中成员 */
	public onSelectMember(data: Object) {
		this._focusMember = data;
		if (this._focusItem) {
			this._focusItem.selectImg.visible = false;
		}
		this._focusItem = this.membersLst.getChildAt(this.membersLst.selectedIndex) as ClubMemberItem;
		this._focusItem.selectImg.visible = true;
	}

	/** 删除成员 */
	private deleteMember() {
		if (this._focusMember) {
			if (this._focusMember["id"] == App.DataCenter.UserInfo.selfUser.userID) {
				Tips.error("无法删除自己");
				return;
			}

			let callback = function () {
				this.ctrl.sendExitClub(this._clubId, this._focusMember["id"]);
			};
			App.MsgBoxManager.getBoxA().showMsg("是否踢出 " + this._focusMember["nick_name"], callback, this)
		} else {
			Tips.info("请选择俱乐部成员");
		}
	}

	/** 同意申请 */
	private agreeApply() {
		if (this._focusMember) {
			this.ctrl.sendHandleRequest(this._clubId, AgreeStatus.yes, this._focusMember["id"]);
		} else {
			Tips.info("请选择一条加入请求")
		}
	}

	/** 显示成员列表
	 * @param type 成员列表或者申请加入请求
	 * @param clubId 俱乐部ID
	 */
	public showMember(type: ClubMemberType, clubId: number) {
		this._focusMember = null;
		this._clubId = clubId;
		this.deleteBtn.visible = this.agreeBtn.visible = false;
		switch (type) {
			case ClubMemberType.members:
				this.initMembers();
				break;
			case ClubMemberType.apply:
				this.initApply();
				break;

			default:
				break;
		}
		this.visible = true;
	}

	/** 成员删除后更新列表 */
	public updateMembers() {
		this._membersCollction.removeItemAt(this.membersLst.selectedIndex);
		this._membersCollction.refresh();
		this._focusMember = null;
	}

	/** 操作申请记录后更新列表 */
	public updateApply() {
		this._applyCollection.removeItemAt(this.membersLst.selectedIndex);
		this._applyCollection.refresh();
		this._focusMember = null;
	}

	/**从场景中移除*/
	protected onRemove() {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		App.EventManager.removeEvent(EventConst.SelectedMember, this.onSelectMember, this);
	}
}

class ClubMemberItem extends eui.ItemRenderer {
	constructor() {
		super();
		this.skinName = "ClubMemberItemSkin";
	}
	public selectImg: eui.Image;

	protected childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	private onTouch() {
		this.selectImg.visible = true;
		App.EventManager.sendEvent(EventConst.SelectedMember, this.data);
	}
}

enum ClubMemberType {
	members,	//俱乐部成员
	apply,		//入会申请
}

enum AgreeStatus {
	yes = 1,	//同意加入
	no = 2,		//拒绝加入
}