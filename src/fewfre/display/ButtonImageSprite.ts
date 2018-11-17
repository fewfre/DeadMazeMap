import ImageSprite from "./ImageSprite";
import FewfEvent from "../utils/FewfEvent";
import Mouse from "../input/Mouse";

interface ButtonImageSpriteProp extends SpriteProp {
	asset : string,
}

enum BUTTON_STATE {
	Idle,
	Down,
	Over,
}

export default class ButtonImageSprite extends ImageSprite
{
	protected _flagEnabled : boolean;
	protected _buttonState : BUTTON_STATE;
	onClick : FewfEvent;
	
	actualScaleX : number;
	actualScaleY : number;
	
	constructor(pProp:ButtonImageSpriteProp) {
		super(pProp);
		
		this._flagEnabled = true;
		this._buttonState = BUTTON_STATE.Idle;
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
	
	protected _addEventListeners() : void {
		Mouse.onMouseDown.add(this._onMouseDown, this);
		Mouse.onMouseUp.add(this._onMouseUp, this);
		Mouse.onMouseMove.add(this._onMouseMove, this);
	}
	protected _removeEventListeners() : void {
		Mouse.onMouseDown.remove(this._onMouseDown, this);
		Mouse.onMouseUp.remove(this._onMouseUp, this);
		Mouse.onMouseMove.remove(this._onMouseMove, this);
	}
	
	protected _setState(pState:BUTTON_STATE) : void {
		switch(pState) {
			case BUTTON_STATE.Idle: {
				this.scale = 1;
				break;
			}
			case BUTTON_STATE.Down: {
				this.scale = 0.9;
				break;
			}
			case BUTTON_STATE.Over: {
				this.scale = 1.1;
				break;
			}
		}
		this._buttonState = pState;
	}
	
	update(dt:number) : void {
		super.update(dt);
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
		this._setState(BUTTON_STATE.Idle);
		return this;
	}
	
	protected _onMouseDown() : void {
		if(!this._flagEnabled) { return; }
		if(this.containsMouse()) {
			this._setState(BUTTON_STATE.Down);
		}
	}
	
	protected _onMouseUp() : void {
		if(!this._flagEnabled) { return; }
		if(this._buttonState == BUTTON_STATE.Idle) { return; }
		if(this.containsMouse()) {
			if(this._buttonState == BUTTON_STATE.Down) {
				this._dispatch();
			} else {
				this._setState(BUTTON_STATE.Over);
			}
		} else {
			this._setState(BUTTON_STATE.Idle);
		}
	}
	
	protected _onMouseMove() : void {
		if(!this._flagEnabled) { return; }
		switch(this._buttonState) {
			case BUTTON_STATE.Idle: {
				if(this.containsMouse()) {
					this._setState(BUTTON_STATE.Over);
				}
				break;
			}
			case BUTTON_STATE.Down: {
				// Nothing
				break;
			}
			default: {
				if(!this.containsMouse()) {
					this._setState(BUTTON_STATE.Idle);
					break;
				}
			}
		}
	}
	
	protected _dispatch() : void {
		this.onClick.dispatch(this);
	}
}