import Sprite from "./Sprite";
import Global from "../Global";

interface ImageSpriteProp extends SpriteProp {
	asset : string,
}

export default class ImageSprite extends Sprite
{
	protected file : any;
	
	constructor(pProp:ImageSpriteProp) {
		super(pProp);
		this.file = Global.assets.file(pProp.asset);
	}
	
	dispose() : void {
		super.dispose();
		this.file = null;
	}
	
	setAsset(pAsset:string) : this {
		this.file = Global.assets.file(pAsset);
		return this;
	}
	
	get width() : number { return this.file?this.file.width:0; }
	get height() : number { return this.file?this.file.height:0; }
	
	protected _customDraw(ctx:CanvasRenderingContext2D) : void {
		if(!this.file) { return; }
		// ctx.save();
		// this._drawSetup(ctx);
		ctx.drawImage(this.file.asset, this._getDrawX(), this._getDrawY(), this.width*this.scaleX, this.height*this.scaleY);
		// ctx.restore();
		// this._drawChildren(ctx);
	}
}