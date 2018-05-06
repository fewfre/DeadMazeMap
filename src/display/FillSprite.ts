import Sprite from "./Sprite";

export default class FillSprite extends Sprite
{
	color : any;
	sizeX : number;
	sizeY : number;
	
	constructor(pProp) {
		super(pProp);
		this.color = pProp.color;
		this.sizeX = pProp.width;
		this.sizeY = pProp.height;
	}
	
	dispose() : void {
		super.dispose();
	}
	
	get width() : number { return this.sizeX; }
	get height() : number { return this.sizeY; }
	
	protected _customDraw(ctx:CanvasRenderingContext2D) : void {
		// ctx.save();
		// this._drawSetup(ctx);
		ctx.fillStyle = this.color;
		ctx.fillRect(this._getDrawX(), this._getDrawY(), this.width*this.scaleX, this.height*this.scaleY);
		// ctx.restore();
		// this._drawChildren(ctx);
	}
}