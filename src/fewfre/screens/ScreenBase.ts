import SpriteManager from "../display/SpriteManager";
import ConstantsApp from "../../app/ConstantsApp";

export default class ScreenBase
{
	protected spriteManager : SpriteManager;
	protected _resizeFunction:any;
	
	constructor() {
		this._addEventListeners();
		this.spriteManager = new SpriteManager();
		this._buildScreen();
		
		ConstantsApp.onResize.add(this._resizeFunction = (pOldWidth, pOldHeight)=>{
			this.onResize(pOldWidth, pOldHeight);
		});
	}
	protected _buildScreen() : void { } // Override
	protected _addEventListeners() : void { } // Override
	protected _removeEventListeners() : void { } // Override
	
	dispose() : void {
		this._removeEventListeners();
		this.spriteManager.dispose();
		ConstantsApp.onResize.remove(this._resizeFunction);
		this._resizeFunction = null;
	}
	update(dt:number) : void {
		this.spriteManager.update(dt);
	}
	onResize(pOldWidth:number, pOldHeight:number) : void { } // Override
}