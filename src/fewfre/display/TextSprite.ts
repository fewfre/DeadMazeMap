import Sprite from "./Sprite";

interface TextSpriteProp extends SpriteProp {
	text ?: string,
	color ?: any,
	fontName ?: string,
	fontSize ?: number,
	fontStyle ?: string,
}

export default class TextSprite extends Sprite
{
	_text : string;
	color : any;
	protected font : string;
	fontName : string;
	fontSize : number;
	fontStyle : string;
	sizeX : number;
	sizeY : number;
	
	constructor(pProp:TextSpriteProp) {
		super(pProp);
		this._text = pProp.text || "";
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
	
	get text() : string { return this._text; }
	set text(pVal:string) { this._text = pVal; this.font = null; } // Set font to null as a flag to reset size
	
	updateFont(ctx:CanvasRenderingContext2D) : void {
		this.font = `${this.fontStyle} ${this.fontSize * this.scale}px ${this.fontName}`;
		ctx.save();
		ctx.font = this.font;
		this.sizeX = ctx.measureText(this._text).width;
		// TODO: calc height? - https://stackoverflow.com/q/15582937/1411473
		this.sizeY = this.fontSize;
		ctx.restore();
	}
	protected _customDraw(ctx:CanvasRenderingContext2D) : void {
		if(!this.font) { this.updateFont(ctx); }
		ctx.fillStyle = this.color;
		ctx.font = this.font;
		ctx.textBaseline = "top"; // By default baseline is towards the bottom, so move it to top so origin works.
		ctx.fillText(this._text, this._getDrawX(), this._getDrawY());
	}
}