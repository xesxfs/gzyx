/**
 * @author chen
 * 
 * 2017-1-12
 */
class Avater extends BaseUI {
    public constructor() {
        super();
        this.skinName = "avaterSkin";
    }

    private avater: eui.Image;

    /**
     * 加载头像
     */
    private loadImage(url) {
        if (url && url != "" && url != 1) {
            this.avater.source = url;
        }

    }

    /**组件创建完毕*/
    protected childrenCreated() {

    }

    /**添加到场景中*/
    protected onEnable() {

    }

    /**从场景中移除*/
    protected onRemove() {

    }
}