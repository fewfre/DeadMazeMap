import Sprite from "../fewfre/display/Sprite";
import ConstantsApp from "../app/ConstantsApp";

interface CircleMarkerProp extends SpriteProp {
	
}

export default class CircleMarker extends Sprite
{
	strokeWidth : number = 3;
	tileX : number;
	tileY : number;
	
	constructor(pProp:CircleMarkerProp) {
		super(pProp);
	}
	
	dispose() : void {
		super.dispose();
	}
	
	get width() : number { return undefined; }
	get height() : number { return undefined; }
	
	setTile(pTileX:number, pTileY:number) : this {
		this.tileX = pTileX;
		this.tileY = pTileY;
		return this;
	}
	
	protected _customDraw(ctx:CanvasRenderingContext2D) : void {
		ctx.shadowColor = "darkred";
		ctx.shadowBlur = 3;
		
		ctx.beginPath();
		ctx.arc(0, 0, 20, 0, 2 * Math.PI, false);
		ctx.lineWidth = 10;
		ctx.strokeStyle = 'darkred';
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(0, 0, 20, 0, 2 * Math.PI, false);
		ctx.lineWidth = 10-(this.strokeWidth*2);
		ctx.strokeStyle = 'red';
		ctx.stroke();
	}
}