class ClubPanel extends BasePanel {
	public constructor() {
		super();
		this.skinName = "ClubPanelSkin";
	}

	public backBtn: how.Button;
	public addBtn: how.Button;
	public msgBtn: how.Button;
	public memberBtn: how.Button;
	public setBtn: how.Button;
	public createRoomBtn: how.Button;
	public refreshBtn: how.Button;
	public myClubLab: eui.Label;
	public clubNameLab: eui.Label;
	public clubIdLab: eui.Label;
	public clubScl: eui.Scroller;
	public clubLst: eui.List;
	public roomLst: eui.List;
	public createClubGrp: eui.Group;
	public clubNameTxt: eui.EditableText;
	public createOkBtn: how.Button;
	public createBackBtn: how.Button;
	public joinClubGrp: eui.Group;
	public clubIdTxt: eui.EditableText;
	public joinOkBtn: how.Button;
	public joinBackBtn: how.Button;
	public joinBtn: how.Button;
	public clubMenber: ClubMember;
	public clubMenu: ClubMenu;
	public searchGrp: eui.Group;
	public searchClubLab: eui.Label;
	public searchMgrIdLab: eui.Label;
	public headImg: eui.Image;

	public ctrl: HallController;

	private _menuArr: Array<eui.Button>;
	private _menuPos: Array<number>;

	protected childrenCreated() {
		this.ctrl = App.getController(HallController.NAME) as HallController;
		this.clubLst.itemRenderer = ClubItem;
		this.roomLst.itemRenderer = ClubRoomItem;

		this._menuArr = [this.msgBtn, this.memberBtn, this.setBtn];
		this._menuPos = [this.msgBtn.x, this.memberBtn.x, this.setBtn.x];
	}

	protected onEnable() {
		this.setCenter();

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		App.EventManager.addEvent(EventConst.SelectedClub, this.onSelectedClub, this);
	}

	protected onRemove() {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		App.EventManager.removeEvent(EventConst.SelectedClub, this.onSelectedClub, this);
	}

	private onTouch(evt: egret.TouchEvent) {
		switch (evt.target) {
			case this.addBtn:
				this.clubMenu.showMenu(MenuType.createClub);
				break;
			case this.createOkBtn:
				this.createClub();
				break;
			case this.joinOkBtn:
				this.checkClub();
				break;
			case this.joinBtn:
				this.joinClud();
				break;
			case this.createBackBtn:
			case this.joinBackBtn:
				this.backClubList();
				break;
			case this.setBtn:
				this.clubMenu.showMenu(MenuType.myClub);
				break;
			case this.backBtn:
				this.hide();
				break;
			case this.createRoomBtn:
				let panel = App.PanelManager.open(PanelConst.CreateRoomPanel) as CreateRoomPanel;
				panel.initData(this._focusClub["id"]);
				break;
			case this.memberBtn:
				this.ctrl.sendClubMembers(this._focusClub["id"]);
				break;
			case this.msgBtn:
				this.ctrl.sendClubRequest(this._focusClub["id"]);
				break;
			case this.refreshBtn:
				this.refresh();
				break;

			default:
				break;
		}
	}

	/** 刷新俱乐部列表和房间列表 */
	private refresh() {
		this.ctrl.sendClubList();
		if (this._focusClub) {
			this.ctrl.sendClubRoomList(this._focusClub["id"]);
		}
		this.refreshBtn.visible = false;
		egret.setTimeout(function () { this.refreshBtn.visible = true; }, this, 5000);
	}

	/** 显示俱乐部成员模块 */
	public showMember() {
		this.clubMenber.showMember(ClubMemberType.members, this._focusClub["id"]);
	}

	/** 显示请求加入俱乐部申请模块 */
	public showClubRequest() {
		this.clubMenber.showMember(ClubMemberType.apply, this._focusClub["id"]);
	}

	/** 返回俱乐部列表模块 */
	public backClubList() {
		this.clubNameTxt.text = this.clubIdTxt.text = "";
		this.joinOkBtn.visible = true;
		this.joinBtn.visible = false;
		this.searchGrp.visible = false;
		this.showPanel(PanelType.clubList);
	}

	private _focusClub: Object;	// 当前选中的俱乐部信息
	private _clubItem: ClubItem;
	private onSelectedClub(data: any) {
		this.ctrl.sendClubRoomList(data["id"]);
		//显示俱乐部信息
		this.clubNameLab.text = data["name"];
		this.clubIdLab.text = "俱乐部ID：" + data["id"];
		this._focusClub = data;

		if (this._clubItem) this._clubItem.selectImg.visible = false;
		this._clubItem = this.clubLst.getChildAt(this.clubLst.selectedIndex) as ClubItem;
		this._clubItem.selectImg.visible = true;

		// 检测是否自己的俱乐部
		if (this._focusClub["uid"] == App.DataCenter.UserInfo.selfUser.userID) {
			// this.msgBtn.visible = this.memberBtn.visible = this.setBtn.visible = this.createRoomBtn.visible = true;
			this.menuEffect();
		} else {
			this.msgBtn.visible = this.memberBtn.visible = this.setBtn.visible = false;
		}
	}

	private menuEffect() {
		let btn;
		for (var i = 0; i < this._menuArr.length; i++) {
			btn = this._menuArr[i];
			btn.x = 1280;
			btn.visible = true;
			egret.Tween.get(btn).to({ x: this._menuPos[i] }, 300, egret.Ease.backOut);
		}

		this.createRoomBtn.y = App.StageUtils.stageHeight;
		this.createRoomBtn.visible = true;
		egret.Tween.get(this.createRoomBtn).to({ y: 637 }, 300, egret.Ease.backOut);
	}

	/** 解散俱乐部 */
	public dissolveClub() {
		if (this._focusClub && this._focusClub["uid"] == App.DataCenter.UserInfo.selfUser.userID) {
			let fun = function () {
				this.ctrl.sendDissolveClub(this._focusClub["id"]);
			};
			App.MsgBoxManager.getBoxA().showMsg("是否确定解散俱乐部？", fun, this);
		} else {
			Tips.error("您无操作权限");
		}
	}

	/** 显示俱乐部更名弹窗 */
	public showClubRename() {
		App.PopUpManager.addPopUp(new ClubRename());
	}

	/** 更新俱乐部名称 */
	public updateClubRname(cName) {
		this.ctrl.sendUpdateClubName(this._focusClub["id"], cName);
		this._focusClub["name"] = cName;
		this.clubNameLab.text = cName;
	}

	/** 解散成功后清除俱乐部信息 */
	public clearClubInfo() {
		let arr = ProtocolHttp.rev_ClubList.club_list;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i]["id"] == this._focusClub["id"]) {
				this._clubCollection.removeItemAt(i)
				break;
			}
		}
		this._clubCollection.refresh();

		this.clubNameLab.text = this.clubIdLab.text = "";
		this._focusClub = null;
		this.roomLst.dataProvider = new eui.ArrayCollection([]);
		this.setBtn.visible = this.msgBtn.visible = this.memberBtn.visible = false;
	}

	/** 创建俱乐部 */
	private createClub() {
		let clubName = StringTool.trim(this.clubNameTxt.text);

		if (clubName == "") {
			Tips.error("请输入俱乐部名称");
			return;
		}

		this.ctrl.sendCreateClub(clubName);
		this.clubNameTxt.text = "";
	}

	/** 根据ID查询俱乐部 */
	private checkClub() {
		let clubId = StringTool.trim(this.clubIdTxt.text);

		if (clubId == "") {
			Tips.error("请输入俱乐部id");
		}

		this.ctrl.sendCheckClub(clubId);
	}

	private _clubInfo: Object;
	/** 显示查询的俱乐部信息 */
	public showClubInfo(data: any) {
		this._clubInfo = data;
		this.searchClubLab.text = data["name"];
		this.searchMgrIdLab.text = "管理员：" + data["uid"];
		this.headImg.source = data["avater_url"];
		this.searchGrp.visible = true;
		this.joinBtn.visible = true;
		this.joinOkBtn.visible = false;
	}

	/** 加入查询到的俱乐部 */
	private joinClud() {
		if (this._clubInfo) {
			this.ctrl.sendJoinInClub(this._clubInfo["id"], "申请加入");
		}
	}

	public showPanel(type: PanelType) {
		this.createClubGrp.visible = false;
		this.clubScl.visible = false;
		this.joinClubGrp.visible = false;

		switch (type) {
			case PanelType.clubList:
				//显示俱乐部列表
				this.clubScl.visible = true;
				break;
			case PanelType.createClub:
				//显示创建俱乐部
				this.createClubGrp.visible = true;
				break;
			case PanelType.joinClub:
				//显示加入俱乐部
				this.joinClubGrp.visible = true;
			default:
				break;
		}
	}

	private _clubCollection: eui.ArrayCollection;
	public initData() {
		this.showPanel(PanelType.clubList);

		let arr = ProtocolHttp.rev_ClubList.club_list;	//俱乐部列表
		arr.forEach((element) => {
			element["headUrl"] = element["user"]["avater_url"];
		})

		this._clubCollection = new eui.ArrayCollection(arr);
		this.clubLst.dataProvider = this._clubCollection;
		this.roomLst.dataProvider = new eui.ArrayCollection([]);
	}

	/** 更新俱乐部下的房间列表 */
	public updateClubRoom() {
		let arr = ProtocolHttp.rev_ClubRoomList.room_list;
		arr.forEach((element) => {
			element["headUrl"] = element["user"]["avater_url"];
			element["player_num"] = element["online_count"] + "/" + element["player_num"];
		})
		this.roomLst.dataProvider = new eui.ArrayCollection(arr);
	}

	public deleteSucc() {
		this.clubMenber.updateMembers();
	}

	public applySucc() {
		this.clubMenber.updateApply();
	}
}

enum PanelType {
	createClub,
	joinClub,
	clubList,
}