import ScreenBase from "./ScreenBase";

export default class ScreenManager
{
	protected _screens : ScreenBase[];
	
	constructor() {
		this._screens = [];
	}
	
	dispose() : void {
		for(var i = 0; i < this._screens.length; i++) {
			this._screens[i].dispose();
		}
		this._screens = null;
	}
	
	update(dt:number) : void {
		for(var i = 0; i < this._screens.length; i++) {
			this._screens[i].update(dt);
		}
	}
	
	push(pScreenName) : ScreenBase {
		this._screens.push(new pScreenName());
		return this._screens[this._screens.length-1];
	}
	
	pushAndReplace(pScreenName) : ScreenBase {
		for(var i = 0; i < this._screens.length; i++) {
			this._screens[i].dispose();
		}
		this._screens = [ new pScreenName() ];
		return this._screens[this._screens.length-1];
	}
}