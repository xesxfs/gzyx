<?php
	require_once "jssdk.php";
	$jssdk = new JSSDK("wx041061b03111a778", "c78b96451e98fa5745e5b0d5ff64c7d1");
	$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <title>长沙麻将</title>
    <meta name="viewport" content="width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="full-screen" content="true"/>
    <meta name="screen-orientation" content="portrait"/>
    <meta name="x5-fullscreen" content="true"/>
    <meta name="360-fullscreen" content="true"/>
    <style>
        html, body {
            -ms-touch-action: none;
            background: #888888;
            padding: 0;
            border: 0;
            margin: 0;
            height: 100%;
        }
    </style>

    <!--这个标签为通过egret提供的第三方库的方式生成的 javascript 文件。删除 modules_files 标签后，库文件加载列表将不会变化，请谨慎操作！-->
    <!--modules_files_start-->
	<script egret="lib" src="libs/modules/egret/egret.js" src-release="libs/modules/egret/egret.min.js"></script>
	<script egret="lib" src="libs/modules/egret/egret.web.js" src-release="libs/modules/egret/egret.web.min.js"></script>
	<script egret="lib" src="libs/modules/eui/eui.js" src-release="libs/modules/eui/eui.min.js"></script>
	<script egret="lib" src="libs/modules/res/res.js" src-release="libs/modules/res/res.min.js"></script>
	<script egret="lib" src="libs/modules/socket/socket.js" src-release="libs/modules/socket/socket.min.js"></script>
	<script egret="lib" src="libs/modules/tween/tween.js" src-release="libs/modules/tween/tween.min.js"></script>
	<script egret="lib" src="libs/modules/game/game.js" src-release="libs/modules/game/game.min.js"></script>
	<script egret="lib" src="libs/modules/dragonBones/dragonBones.js" src-release="libs/modules/dragonBones/dragonBones.min.js"></script>
	<script egret="lib" src="libs/modules/particle/particle.js" src-release="libs/modules/particle/particle.min.js"></script>
	<script egret="lib" src="libs/modules/md5/md5.js" src-release="libs/modules/md5/md5.min.js"></script>
	<!--modules_files_end-->

    <!--这个标签为不通过egret提供的第三方库的方式使用的 javascript 文件，请将这些文件放在libs下，但不要放在modules下面。-->
    <!--other_libs_files_start-->
	<script egret="lib" src="libs/cryptoJS/base64.js"></script>
	<script egret="lib" src="libs/cryptoJS/rc4.js"></script>
    <!--other_libs_files_end-->

    <!--这个标签会被替换为项目中所有的 javascript 文件。删除 game_files 标签后，项目文件加载列表将不会变化，请谨慎操作！-->
    <!--game_files_start-->
	<script src="main.min.js"></script>
	<!--game_files_end-->
</head>
<body>


    <div style="margin: auto;width: 100%;height: 100%;" class="egret-player"
         data-entry-class="Main"
         data-orientation="auto"
         data-scale-mode="fixedWidth"
         data-frame-rate="30"
         data-content-width="750"
         data-content-height="1334"
         data-show-paint-rect="false"
         data-multi-fingered="2"
         data-show-fps="true" data-show-log="false"
         data-log-filter="" data-show-fps-style="x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9">
    </div>
    <script>
        egret.runEgret({renderMode:"canvas"});
    </script>

	<!-------------- 微信分享 --------------->
	<script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>
	<script>
		wx.config({
			debug:true,
			appId:'<?php echo $signPackage['appId'];?>',
			timestamp:'<?php echo $signPackage['timestamp'];?>',
			nonceStr:'<?php echo $signPackage['nonceStr'];?>',
			signature:'<?php echo $signPackage['signature'];?>',
			jsApiList:['onMenuShareTimeline', 'onMenuShareAppMessage','startRecord','stopRecord','playVoice', 'onVoiceRecordEnd',
					'uploadVoice','downloadVoice','chooseWXPay']
		});

		wx.ready(function(){
			wxShare(0);
		});

		//微信分享配置,deskCode=房号
		function wxShare(deskCode){
			var titleStr = "广东麻将标题";
			var descStr = "广东麻将描述";
			var linkStr = "http://gamemj.com/mj/index.php" + "?deskCode=" + deskCode;
			var imgUrlStr = "http://gamemj.com/share.jpg";
			
			if(deskCode > 0){
				titleStr += " 房号:" + deskCode;
			}

			console.log("微信分享房号:" + deskCode);

			wx.onMenuShareAppMessage({
				title:titleStr,
				desc:descStr,
				link:linkStr,
				imgUrl:imgUrlStr,
				success:function(){

				}
			});

			wx.onMenuShareTimeline({
				title:titleStr,
				link:linkStr,
				imgUrl:imgUrlStr,
				success:function(){
					
				}
			});
		}
	</script>
	<!-------------- end 微信分享 --------------->

	 <!------------  微信语音 ------------------>
	 <script>
		//开始录音
    	function startRecord(){
			wx.startRecord();
		}
		
		//停止录音
    	function stopRecord(){
    		wx.stopRecord({
				success: function (res) {
					var localId = res.localId;
					uploadVoice(localId);
				}
	    	});
    	}

		//播放语音
		function playVoice(localId){
			wx.playVoice({
				localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
			});
		}
		
		// 录音时间超过一分钟没有停止的时候会执行 complete 回调
		wx.onVoiceRecordEnd({
			complete: function (res) {
				var localId = res.localId; 
				uploadVoice(localId);
			}
		});

		//上传录音
		function uploadVoice(localId){
			wx.uploadVoice({
				localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
				isShowProgressTips: 1, // 默认为1，显示进度提示
					success: function (res) {
					var serverId = res.serverId; // 返回音频的服务器端ID
					window["gameScene"].sendRecord(serverId);
				}
			});
		}
		
		//下载语音
		function downloadVoice(serverId){
			wx.downloadVoice({
				serverId: serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
				isShowProgressTips: 1, // 默认为1，显示进度提示
				success: function (res) {
					var localId = res.localId; // 返回音频的本地ID
					playVoice(localId);
				}
			});
		}
	</script>
	<!------------ end 微信语音 ------------------>
	 <!------------  微信支付 --------------------->
		<script>
			function onBridgeReady(data){
				 WeixinJSBridge.invoke('getBrandWCPayRequest',data, function(res){console.log(res)});
			}

		</script>

	 <!------------ end 微信支付 ------------------>

</body>
</html>
