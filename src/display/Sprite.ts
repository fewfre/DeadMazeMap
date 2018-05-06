import ConstantsApp from "../app/ConstantsApp";

export default class Sprite
{
	children : Sprite[];
	parent : Sprite;
	doDelete : boolean;
	
	x : number;
	y : number;
	alpha : number;
	rotation : number;
	
	scaleX : number;
	scaleY : number;
	originX : number;
	originY : number;
	
	constructor(pProp:SpriteProp) {
		this.children = [];
		this.parent = null;
		this.doDelete = false;
		
		this.x = pProp.x || 0;
		this.y = pProp.y || 0;
		this.alpha = pProp.alpha != null ? pProp.alpha : 1;
		this.rotation = pProp.rotation || 0;
		
		this.scale = pProp.scale != null ? pProp.scale : 1;
		this.scaleX = pProp.scaleX != null ? pProp.scaleX : this.scale;
		this.scaleY = pProp.scaleY != null ? pProp.scaleY : this.scale;
		
		this.origin = pProp.origin != null ? pProp.origin : 0.5;
		this.originX = pProp.originX != null ? pProp.originX : this.origin;
		this.originY = pProp.originY != null ? pProp.originY : this.origin;
		// this._addEventListeners();
	}
	
	dispose() : void {
		// this._removeEventListeners();
		for(var i = this.children.length-1; i >= 0; i--) {
			this.children[i].dispose();
			this.children[i] = null;
		}
		this.children = null;
		this.parent = null;
	}
	// _addEventListeners() : void { } // Override
	// _removeEventListeners() : void { } // Override
	
	get scale() : number { return this.scaleX; }
	set scale(pVal) { this.scaleX = this.scaleY = pVal; }
	
	get origin() : number { return this.originX; }
	set origin(pVal) { this.originX = this.originY = pVal; }
	
	get width() : number { return 0; } // Override
	get height() : number { return 0; } // Override
	
	to(pX:number, pY:number) : this {
		this.x = pX;
		this.y = pY;
		return this;
	}
	
	add<T extends Sprite>(pSprite:T) : T {
		this.children.push(pSprite);
		pSprite.parent = this;
		return pSprite;
	}
	
	update(dt:number) : void {
		// Override
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].update(dt);
		}
	}
	
	protected _getDrawX() : number { return (this.parent != null ? this.parent._getDrawX() : 0) + this.x; }
	protected _getDrawY() : number { return (this.parent != null ? this.parent._getDrawY() : 0) + this.y; }
	protected _getDrawRotation() : number { return (this.parent != null ? this.parent._getDrawRotation() : 0) + this.rotation; }
	
	draw(ctx:CanvasRenderingContext2D) : void {
		ctx.save();
		this._drawSetup(ctx);
		ctx.restore();
		this._drawChildren(ctx);
	}
	
	protected _customDraw(ctx:CanvasRenderingContext2D) : void {
		// Override
	}
	
	protected _drawChildren(ctx:CanvasRenderingContext2D) : void {
		// for(var i = this.children.length-1; i >= 0; i--) {
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].draw(ctx);
		}
	}
	
	protected _drawSetup(ctx:CanvasRenderingContext2D) : void {
		ctx.globalAlpha = this.alpha;
		ctx.translate(this._getDrawX(), this._getDrawY());
		ctx.rotate(this._getDrawRotation()*ConstantsApp.DEG2RAD);
		ctx.translate(-this._getDrawX() - this.width*this.scaleX*this.originX, -this._getDrawY() - this.height*this.scaleY*this.originY);
		this._customDraw(ctx);
	}
}