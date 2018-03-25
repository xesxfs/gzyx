/**
 * 底部菜单管理类
 * @author eyanlong
 * @date 2017/2/21
 */

class BottomMenuManager extends SingleClass{
	private bottomMenu:ObjectPool;

	public constructor() {
		super();
		this.bottomMenu = ObjectPool.getPool(BottomMenus.NAME);		
	}

	/**获取一个消息弹框A，有确定和取消按钮 */
	public getBoxA():BottomMenus{
		var menu:BottomMenus = this.bottomMenu.getObject();
		menu.removeFromeScene();
		menu.skinName = "BottomMenuASkin";
		return menu;
	}

	/**获取一个消息弹框B，只有确定按钮 */
	public getBoxB():BottomMenus{
		var menu:BottomMenus = this.bottomMenu.getObject();
		menu.removeFromeScene();
		menu.skinName = "BottomMenuBSkin";
		return menu;
	}
	
	/**获取一个消息弹框C, 无任何按钮*/
	public getBoxC():BottomMenus{
        var menu: BottomMenus = this.bottomMenu.getObject();
		menu.removeFromeScene();
        menu.skinName = "BottomMenuCSkin";
        return menu;
	}

	public getBoxD():BottomMenus{
        var menu: BottomMenus = this.bottomMenu.getObject();
		menu.removeFromeScene();
        menu.skinName = "BottomMenuDSkin";
        return menu;
	}

	/**获取当前底部菜单 */
	public getCurentBottomMenu() {
		return this.bottomMenu.getObject();
	}
}