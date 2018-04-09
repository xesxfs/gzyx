module how {
	/**
	 * 所有按钮的基类
	 * 带按下缩放功能，按下声音功能，按下改变颜色功能（后面2个功能暂未加入）
	 * @author none
	 *
	 */
    export class Button extends eui.Button {
        private static _mask: eui.Rect;
        public isNeedMask: boolean = true;
        public scaleDuration: number = 100;
        public scaleWhenDown: number = 0.95;
        public disableInterval: number = 300;
        public soundPath: string = "window_open_mp3";
        /*是否需要缩放*/
        public isScale: boolean = true;

        public groupScale: eui.Group;//若包含复杂内容(如：animator)，在设计时把所有内容放在此GROUP中
        /*自我创建的包含按钮内容的group，用来缩放*/
        private _scaleGroup: eui.Group;
        private _visible: boolean = false;
        public constructor() {
            super();
            this.addEventListener(egret.Event.RESIZE, this.onSizeOne, this);
        }

        public childrenCreated() {
            if (this.groupScale) {
                this._scaleGroup = this.groupScale;
            }
            else {
                this._scaleGroup = new eui.Group();
            }

            //this._visible = this.visible;
            this._scaleGroup.visible = false;

            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchOutSide, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        }
        protected setSkin(skin: eui.Skin): void {
            super.setSkin(skin);
            if (this._scaleGroup && this._scaleGroup.parent) {
                this._scaleGroup.parent.removeChild(this._scaleGroup);
                this._scaleGroup = new eui.Group();
                this.initGroupScale();
            }
        }
        /*第一次接收resize事件的时候处理缩放逻辑（没有找到更好的获取组件宽高的事件）*/
        private onSizeOne(): void {
            this.removeEventListener(egret.Event.RESIZE, this.onSizeOne, this);
            this.initGroupScale();
        }

        private initGroupScale(): void {
            if (this._scaleGroup.anchorOffsetX > 0)
                return;

            //获取宽高是关键
            var mWidth: number = this.width;
            var mHeight: number = this.height;

            if (this._scaleGroup != this.groupScale && this._scaleGroup.numChildren <= 0) {
                var display: egret.DisplayObject = null;
                while (this.numChildren > 0) {
                    display = this.getChildAt(0);
                    this._scaleGroup.addChild(display);
                }
                this.addChild(this._scaleGroup);
            }

            this._scaleGroup.width = mWidth;
            this._scaleGroup.height = mHeight;
            this._scaleGroup.anchorOffsetX = mWidth * 0.5;
            this._scaleGroup.anchorOffsetY = mHeight * 0.5;
            this._scaleGroup.x = mWidth * 0.5;
            this._scaleGroup.y = mHeight * 0.5;
            this.width = mWidth;
            this.height = mHeight;

            this._scaleGroup.visible = true;
        }

        protected onTouchBegin(e: egret.TouchEvent): void {
            if (this.isScale) {
                this._scaleGroup.scaleX = this.scaleWhenDown;
                this._scaleGroup.scaleY = this.scaleWhenDown;
            }

            if (!this.isNeedMask) {
                return;
            }

            //防止快速点击加上遮罩
            if (!Button._mask) {
                Button._mask = new eui.Rect();
                Button._mask.fillColor = 0x000000;
                Button._mask.fillAlpha = 0;
            }
            Button._mask.width = this.stage.width;
            Button._mask.height = this.stage.height;
            this.stage.addChild(Button._mask);
            egret.setTimeout((argStage: egret.Stage): void => {
                argStage.removeChild(Button._mask);
            }, this, this.disableInterval, this.stage);
        }

        private onTouchEnd(e: egret.TouchEvent): void {
            if (this.isScale) {
                this._scaleGroup.scaleX = 1;
                this._scaleGroup.scaleY = 1;
            }
        }

        private onTouchOutSide(e: egret.TouchEvent): void {
            this.onTouchEnd(null);
            //            var target = this.stage.$hitTest(e.stageX,e.stageY);
            if (this.stage && this.stage.contains(Button._mask) && e.target.hitTestPoint(e.stageX, e.stageY)) {//是自己加的遮罩并且点击的是按钮区域，需要发一次egret.TouchEvent.TOUCH_TAP事件
                egret.TouchEvent.dispatchTouchEvent(e.target, egret.TouchEvent.TOUCH_TAP, true, true, e.stageX, e.stageX, e.touchPointID, false);
            }
        }

        //状态改变的时候设置缩放
        private setScaleByStatus(): void {
            var curState: string = this.getCurrentState();
            this.scaleX = this.scaleY = curState == "down" ? this.scaleWhenDown : 1;
        }
        private onTouchTab(e: egret.TouchEvent): void {
            if (RES.hasRes(this.soundPath)) {
            }
        }
    }
}
