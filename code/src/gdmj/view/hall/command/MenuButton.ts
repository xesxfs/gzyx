/**
 * 底部菜单按钮
 * @author chenwei
 *
 */
class MenuButton extends eui.Button {
        public constructor() {
                super()
        }

        protected childrenCreated() {
                this.setNewsFlag(false);
        }

        /**
         * 设置小红点
         * @visible 是否显示
         */
        public setNewsFlag(visible: boolean) {
                let news: eui.Image = <eui.Image>this.getChildAt(1);
                news.visible = visible;
        }




}
