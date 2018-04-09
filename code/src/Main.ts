//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {

    private loadingView: LoadingUI;
    protected createChildren(): void {
        super.createChildren();

        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter",assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());

        //设置加载进度界面
        // this.loadingView = new LoadingUI();
        // this.stage.addChild(this.loadingView);

        //Resource资源加载库
        App.ResUtils.addConfig("resource/default.res.json", "resource/");
        App.ResUtils.loadConfig(this.onConfigComplete, this);
    }
    
    //配置文件加载完成,开始预加载皮肤主题资源和preload资源组
    private onConfigComplete(event:RES.ResourceEvent):void {
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    }

    //主题文件加载完成,开始预加载
    private onThemeLoadComplete(): void {
        App.ResUtils.loadGroup([AssetConst.Preload,AssetConst.Login], this, this.onPreloadComplete, this.onProgress);
    }
    
    //preload资源组加载完成
    private onPreloadComplete(event:RES.ResourceEvent):void {
        //this.stage.removeChild(this.loadingView);
        this.startCreateScene();
    }

    //加载进度
    private onProgress(event:RES.ResourceEvent) {
        //this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
    }

    //创建场景界面
    protected startCreateScene(): void {
        //启动
        App.getInstance().startUp();
    }   
}





