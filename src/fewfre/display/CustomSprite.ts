import Sprite from "./Sprite";

interface CustomSpriteProp extends SpriteProp {
	draw : (ctx:CanvasRenderingContext2D) => void,
}

export default class CustomSprite extends Sprite
{
	myDraw : (ctx:CanvasRenderingContext2D) => void;
	
	constructor(pProp:CustomSpriteProp) {
		super(pProp);
		this.myDraw = pProp.draw;
	}
	
	dispose() : void {
		super.dispose();
		this.myDraw = null;
	}
	
	get width() : number { return undefined; }
	get height() : number { return undefined; }
	
	protected _customDraw(ctx:CanvasRenderingContext2D) : void {
		this.myDraw(ctx);
	}
}