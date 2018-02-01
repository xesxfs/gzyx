class LocalStorageUtil extends SingleClass{
	public constructor() {
		super();
	}


	public set allowMusic(allow:boolean){
		this.saveItem("allowMusic",(allow?"1":"0"))
	}

	public get allowMusic():boolean{
		var item =this.loadItem("allowMusic")
		if(item==null){
			this.allowMusic=true;
			item="1"
		}
		return !!parseInt(item);
	}

	public set allowEffect(allow:boolean){
		this.saveItem("allowEffect",(allow?"1":"0"))
	}

	public get allowEffect():boolean{
		var item =this.loadItem("allowEffect")
		if(item==null){
			this.allowEffect=true;
			item="1"
		}
		return !!parseInt(item);
	}
	

	public set autoVoice(allow:boolean){
		this.saveItem("autoVoice",(allow?"1":"0"))
	}

	public get autoVoice():boolean{
		var item =this.loadItem("autoVoice")
		if(item==null){
			this.autoVoice=true;
			item="1"
		}
		return !!parseInt(item);
	}

	private saveItem(key:string,data:string){
		if(!key)return
		egret.localStorage.setItem(key,data)
	}


	private loadItem(key:string):string{
		if(!key)return
		return egret.localStorage.getItem(key);
	}


}