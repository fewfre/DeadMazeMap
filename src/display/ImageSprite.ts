import Sprite from "./Sprite";
import Global from "../utils/Global";

export default class ImageSprite extends Sprite
{
	protected file : any;
	
	constructor(pProp) {
		super(pProp);
		this.file = Global.assets.file(pProp.asset);
	}
	
	dispose() : void {
		super.dispose();
		this.file = null;
	}
	
	get width() : number { return this.file.width; }
	get height() : number { return this.file.height; }
	
	protected _customDraw(ctx:CanvasRenderingContext2D) : void {
		// ctx.save();
		// this._drawSetup(ctx);
		ctx.drawImage(this.file.asset, this._getDrawX(), this._getDrawY(), this.width*this.scaleX, this.height*this.scaleY);
		// ctx.restore();
		// this._drawChildren(ctx);
	}
}