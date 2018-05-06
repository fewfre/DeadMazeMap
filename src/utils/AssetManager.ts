export default class AssetManager
{
	private _loadingCount : number;
	private _files : { [key:string]:{ id:string, name:string, asset:HTMLImageElement, width:number, height:number } };
	
	constructor() {
		this._loadingCount = 0;
		this._files = {};
	}
	
	file(pID:string) : any {
		if(this._files[pID]) { return this._files[pID]; }
		console.error(`[AssetManager](file) Attempted to use unloaded asset '${pID}'`);
		return null;
	}
	
	load(pArray:(string|{ id:string, src:string })[], pCallback?:()=>void) : void {
		for(var i = 0; i < pArray.length; i++) {
			this._loadImage(pArray[i], pCallback);
		}
	}
	
	private _loadImage(pSource, pCallback:()=>void) : void {
		let tFileID = null, tFilePath = pSource, tName, tType;
		if(pSource.id) { tFileID = pSource.id; tFilePath = pSource.src; }
		if(tFilePath.indexOf("/") > -1) {
			[, tName, tType] = /(?:\/+)(?!.*\/)(.*)\.(.*)/g.exec(tFilePath);
		} else {
			[tName, tType] = tFilePath.split(".");
		}
		tFileID = tFileID || tName;
		this._loadingCount++;
		// Don't load an already loaded file.
		if(this._files[tFileID]) {
			setTimeout(()=>{
				this._loadingCount--;
				if(this._loadingCount == 0) { if(pCallback) pCallback(); }
			});
			return;
		}
		let tImage = new Image();
		tImage.src = tFilePath;
		tImage.onload = (e)=>{
			this._loadingCount--;
			// console.log("(_loadImage)", tName, tType);
			this._files[tFileID] = { id:tFileID, name:tName, asset:tImage, width:tImage.width, height:tImage.height };
			tImage = null;
			if(this._loadingCount == 0) { if(pCallback) pCallback(); }
		};
		tImage.onerror = (e)=>{
			console.error("[AssetManager](_loadImage) Failed to load asset: "+tFileID+": "+tFilePath);
			setTimeout(()=>{
				this._loadingCount--;
				if(this._loadingCount == 0) { if(pCallback) pCallback(); }
			});
		};
	}
}