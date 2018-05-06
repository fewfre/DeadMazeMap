import Sprite from "./Sprite";

export default class CustomSprite extends Sprite
{
	myDraw : (ctx:CanvasRenderingContext2D) => void;
	
	constructor(pProp) {
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