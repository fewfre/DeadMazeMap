import Sprite from "../fewfre/display/Sprite";
import ConstantsApp from "../app/ConstantsApp";

export default class GearSprite extends Sprite
{
	strokeWidth : number = 3;
	
	constructor(pProp:SpriteProp) {
		super(pProp);
	}
	
	dispose() : void {
		super.dispose();
	}
	
	get width() : number { return undefined; }
	get height() : number { return undefined; }
	
	protected _customDraw(ctx:CanvasRenderingContext2D) : void {
		ctx.beginPath();
		ctx.arc(0, 0, 35, 0, 2 * Math.PI, false);
		ctx.lineWidth = 20;
		ctx.strokeStyle = 'darkgrey';
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(0, 0, 35, 0, 2 * Math.PI, false);
		ctx.lineWidth = 20-(this.strokeWidth*2);
		ctx.strokeStyle = 'grey';
		ctx.stroke();
		
		// Now draw pegs of gear
		ctx.lineWidth = this.strokeWidth;
		ctx.strokeStyle="darkgrey";
		ctx.fillStyle="grey";
		
		let size = 20, sizeH = size*0.5, xx = 45 - this.strokeWidth*1.5;
		for(var i = 0; i < 8; i++) {
			ctx.rotate(45*i*ConstantsApp.DEG2RAD);
			ctx.beginPath();
			ctx.moveTo(xx,-sizeH);
			ctx.lineTo(xx+size,-sizeH);
			ctx.lineTo(xx+size,sizeH);
			ctx.lineTo(xx,sizeH);
			ctx.fill();
			ctx.stroke();
		}
	}
}