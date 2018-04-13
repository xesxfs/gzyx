class ClubPanel extends BasePanel {
	public constructor() {
		super();
		this.skinName = "ClubPanelSkin";
	}

	public backMyBtn: how.Button;
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

	protected childrenCreated() {
		this.ctrl = App.getController(HallController.NAME) as HallController;
		this.clubLst.itemRenderer = ClubItem;
	}

	protected onEnable() {
		this.setCenter();
		this.initData();

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		App.EventManager.addEvent(EventConst.showRoom, this.onShowRoom, this);
	}

	protected onRemove() {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		App.EventManager.removeEvent(EventConst.showRoom, this.onShowRoom, this);
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
				this.joinClub();
				break;
			case this.createBackBtn:
			case this.joinBackBtn:
				this.backClubList();
				break;

			default:
				break;
		}
	}

	/** 返回俱乐部列表模块 */
	private backClubList() {
		this.clubNameTxt.text = this.clubIdTxt.text = "";
		this.joinOkBtn.visible = true;
		this.joinBtn.visible = false;
		this.searchGrp.visible = false;
		this.showPanel(PanelType.clubList);
	}

	private onShowRoom(data: any) {
		this.ctrl.sendClubRoomList(data["id"]);
		this.clubNameLab.text = data["name"];
		this.clubIdLab.text = data["id"];
	}

	/** 创建俱乐部 */
	private createClub() {
		let clubName = StringTool.trim(this.clubNameTxt.text);

		if (clubName == "") {
			Tips.error("请输入俱乐部名称");
			return;
		}

		this.ctrl.sendCreateClub(clubName);
	}

	/** 加入俱乐部 */
	private joinClub() {
		let clubId = StringTool.trim(this.clubIdTxt.text);

		if (clubId == "") {
			Tips.error("请输入俱乐部id");
		}

		this.ctrl.sendCheckClub(clubId);
	}

	/** 显示查询的俱乐部信息 */
	public showClubInfo(data: any) {
		this.searchClubLab.text = data["name"];
		this.searchMgrIdLab.text = "管理员：" + data["uid"];
		this.headImg.source = data["avater_url"];
		this.searchGrp.visible = true;
		this.joinBtn.visible = true;
		this.joinOkBtn.visible = false;
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

	private initData() {
		let arr = ProtocolHttp.rev_ClubList.club_list;	//俱乐部列表
		arr.forEach((element) => {
			element["headUrl"] = element["user"]["avater_url"];
		})
		this.clubLst.dataProvider = new eui.ArrayCollection(arr);
		this.roomLst.dataProvider = new eui.ArrayCollection([]);
	}

	/** 更新俱乐部下的房间列表 */
	public updateClubRoom() {
		let arr = ProtocolHttp.rev_ClubRoomList.room_list;
		arr.forEach((element) => {
			element["headUrl"] = element["user"]["avater_url"];
		})
		this.roomLst.dataProvider = new eui.ArrayCollection(arr);
	}
}

enum PanelType {
	createClub,
	joinClub,
	clubList,
}