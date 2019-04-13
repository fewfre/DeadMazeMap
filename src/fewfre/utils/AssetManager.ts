import Manifest from "../../app/Manifest";

export default class AssetManager
{
	private _files : { [key:string]:{ id:string, name:string, asset:HTMLImageElement, width:number, height:number } };
	
	constructor() {
		this._files = {};
	}
	
	file(pID:string) : any {
		if(this._files[pID]) { return this._files[pID]; }
		console.error(`[AssetManager](file) Attempted to use unloaded asset '${pID}'`);
		return null;
	}
	
	isFileLoaded(pID:string) : boolean {
		return !!this._files[pID];
	}
	
	loadFile(pID) : Promise<void> {
		return this._loadImage(pID, Manifest.assets[pID]);
	}
	
	loadList(pArray:string[]) : Promise<void[]> {
		let promises = [];
		for(let i = 0; i < pArray.length; i++) {
			promises.push(this._loadImage(pArray[i], Manifest.assets[ pArray[i] ]));
		}
		return Promise.all(promises);
	}
	
	// unloadList(pArray:{ id:string, src:string }[], pCallback?:()=>void) : void {
	// 	// Todo
	// 	for(let i = 0; i < pArray.length; i++) {
	// 		this._unloadImage(pArray[i]);
	// 	}
	// 	if(pCallback) setTimeout(pCallback, 10); // Short timeout to make sure unloading is finished
	// }
	
	loadPacks(pPacks:string[]) : Promise<void[]> {
		let promises = [];
		for(let i = 0; i < pPacks.length; i++) {
			promises.push(this.loadList( Manifest.assetPacks[ pPacks[i] ] ));
		}
		return Promise.all(promises);
	}
	
	// unloadPacks(pPacks:string[], pCallback?:()=>void) : void {
	// 	for(let i = 0; i < pPacks.length; i++) {
	// 		this.unloadList( Manifest.assetPacks[ pPacks[i] ] );
	// 	}
	// 	if(pCallback) setTimeout(pCallback, 10); // Short timeout to make sure unloading is finished
	// }
	
	private _loadImage(pID:string, pFile:string) : Promise<void> {
		return new Promise((resolve, reject)=>{
			let tFileID = pID, tFilePath = pFile, tName, tType;
			if(!tFilePath) {
				console.error("(_loadImage) No file path for: "+pID);
				reject();
				return;
			}
			// if(pSource.id) { tFileID = pSource.id; tFilePath = pSource.src; }
			if(tFilePath.indexOf("/") > -1) {
				[, tName, tType] = /(?:\/+)(?!.*\/)(.*)\.(.*)/g.exec(tFilePath);
			} else {
				[tName, tType] = tFilePath.split(".");
			}
			tFileID = tFileID || tName;
			// Don't load an already loaded file.
			if(this._files[tFileID]) {
				setTimeout(()=>{
					resolve();
				});
				return;
			}
			let tImage = new Image();
			tImage.src = tFilePath;
			tImage.onload = (e)=>{
				// console.log("(_loadImage)", tName, tType);
				this._files[tFileID] = { id:tFileID, name:tName, asset:tImage, width:tImage.width, height:tImage.height };
				tImage = null;
				resolve();
			};
			tImage.onerror = (e)=>{
				console.error("[AssetManager](_loadImage) Failed to load asset: "+tFileID+": "+tFilePath);
				tImage = null;
				setTimeout(()=>{
					reject();
				});
			};
		});
	}
	
	// private _unloadImage(pSource:{ id:string, src:string }) : void {
	// 	let tFileID = pSource.id;
	// 	if(!this._files[tFileID]) { return; }//console.log("[AssetManager](_unloadImage) Asset already unloaded: "+tFileID);
	// 	// this._files[tFileID].asset.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"; // Clear source with 1x1 pixel to free memory
	// 	this._files[tFileID].asset = null;
	// 	delete this._files[tFileID];
	// }
}