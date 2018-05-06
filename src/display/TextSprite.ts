import Sprite from "./Sprite";

export default class TextSprite extends Sprite
{
	text : string;
	color : any;
	protected font : string;
	fontName : string;
	fontSize : number;
	fontStyle : string;
	sizeX : number;
	sizeY : number;
	
	constructor(pProp) {
		super(pProp);
		this.text = pProp.text || "";
		this.color = pProp.color || "white";
		this.fontName = pProp.fontName || "Arial";
		this.fontSize = pProp.fontSize || 16;
		this.fontStyle = pProp.fontStyle || "";//"bold";
		this.sizeX = this.sizeY = 0;
		// this.updateFont();
	}
	
	dispose() : void {
		super.dispose();
	}
	
	get width() : number { return this.sizeX; }
	get height() : number { return this.sizeY; }
	
	updateFont(ctx:CanvasRenderingContext2D) : void {
		this.font = `${this.fontStyle} ${this.fontSize * this.scale}px ${this.fontName}`;
		ctx.save();
		ctx.font = this.font;
		this.sizeX = ctx.measureText(this.text).width;
		this.sizeY = this.fontSize;
		ctx.restore();
	}
	protected _customDraw(ctx:CanvasRenderingContext2D) : void {
		if(!this.font) { this.updateFont(ctx); }
		ctx.fillStyle = this.color;
		ctx.font = this.font;
		ctx.fillText(this.text, this._getDrawX(), this._getDrawY());
	}
}