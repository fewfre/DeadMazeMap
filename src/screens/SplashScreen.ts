import ConstantsApp from "../app/ConstantsApp";
import ScreenBase from "../fewfre/screens/ScreenBase";
import TextSprite from "../fewfre/display/TextSprite";

export default class SplashScreen extends ScreenBase
{
	_titleText : SplashTitle;
	
	protected _buildScreen() : void {
		this._titleText = this.spriteManager.add(new SplashTitle({
			text:"Dead Maze Map Explorer",
			x:ConstantsApp.STAGE_CENTER_X, y:ConstantsApp.STAGE_CENTER_Y*0.5,
			fontSize:50, fontName:"Palatino Linotype, Book Antiqua, Palatino, serif", fontStyle:"bolder",
		}));
	}
	onResize(pOldWidth:number, pOldHeight:number) : void {
		this._titleText.to(ConstantsApp.STAGE_CENTER_X, ConstantsApp.STAGE_CENTER_Y*0.5);
	}
	dispose() : void {
		super.dispose();
		this._titleText = null;
	}
}

class SplashTitle extends TextSprite
{
	protected _customDraw(ctx:CanvasRenderingContext2D) : void {
		super._customDraw(ctx);
		
		var grd:CanvasGradient = ctx.createRadialGradient(
			this._getDrawX()-this.width*0.25, this._getDrawY(), this.width*0.5,
			this._getDrawX()-this.width*0.25, this._getDrawY(), this.width
		);
		grd.addColorStop(0,"#61c419");
		grd.addColorStop(0.5,"#8ab66b");
		grd.addColorStop(1,"#398235");
		
		ctx.strokeStyle = grd;
		ctx.miterLimit = 2;
		ctx.lineJoin = 'circle';
		
		// draw an outline, then filled
		ctx.lineWidth = 7;
		ctx.strokeText(this._text, this._getDrawX(), this._getDrawY());
		ctx.lineWidth = 1;
		ctx.fillText(this._text, this._getDrawX(), this._getDrawY());
	}
}