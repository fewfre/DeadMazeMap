import SpriteManager from "../display/SpriteManager";
import Global from "../utils/Global";

export default class ScreenBase
{
	protected spriteManager : SpriteManager;
	
	constructor() {
		this._addEventListeners();
		this.spriteManager = new SpriteManager();
		this._buildScreen();
	}
	protected _buildScreen() : void { } // Override
	protected _addEventListeners() : void { } // Override
	protected _removeEventListeners() : void { } // Override
	
	dispose() : void {
		this._removeEventListeners();
		this.spriteManager.dispose();
	}
	update(dt:number) : void {
		this.spriteManager.update(dt);
	}
}