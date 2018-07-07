import ImageSprite from "./ImageSprite";
import FewfEvent from "../utils/FewfEvent";
import Mouse from "../input/Mouse";

interface ButtonImageSpriteProp extends SpriteProp {
	asset : string,
}

export default class ButtonImageSprite extends ImageSprite
{
	protected _flagEnabled : boolean;
	onClick : FewfEvent;
	
	actualScaleX : number;
	actualScaleY : number;
	
	constructor(pProp:ButtonImageSpriteProp) {
		super(pProp);
		
		this._flagEnabled = true;
		this.onClick = new FewfEvent();
		
		this.actualScaleX = this.scaleX;
		this.actualScaleY = this.scaleY;
		
		this._addEventListeners();
	}
	
	dispose() : void {
		this._removeEventListeners();
		super.dispose();
		this.onClick.dispose();
		this.onClick = null;
	}
	
	private _onClickBinded : any;
	protected _addEventListeners() : void {
		Mouse.onClick.add(this._onClickBinded = this._onClick.bind(this));
	}
	protected _removeEventListeners() : void {
		Mouse.onClick.remove(this._onClickBinded);
		this._onClickBinded = null;
	}
	
	update(dt:number) : void {
		this.scale = this.containsMouse() ? 1.1 : 1;
	}
	
	containsMouse() : boolean {
		return Math.abs(Mouse.mouseX - this._getDrawX()) <= this.width*0.5 && Math.abs(Mouse.mouseY - this._getDrawY()) <= this.height*0.5;
	}
	
	enable() : this {
		this._flagEnabled = true;
		return this;
	}
	
	disable() : this {
		this._flagEnabled = false;
		return this;
	}
	
	private _onClick() : void {
		if(this._flagEnabled && this.containsMouse()) {
			this.onClick.dispatch();
		}
	}
}