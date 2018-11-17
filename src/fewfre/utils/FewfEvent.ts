// Inspired by https://github.com/photonstorm/phaser/blob/v2.6.2/src/core/Signal.js
export default class FewfEvent
{
	private _list : EventData[];//((...args:any[]) => void)[];
	private _allowDispatch : boolean;
	
	constructor() {
		this._list = [];
		this._allowDispatch = true;
	}
	add(pCallback:Function, pThisArg?:any) : void {
		if(this._getEventIndex(pCallback, pThisArg) <= 0) {
			this._list.push(new EventData(pCallback, pThisArg));
		}
	}
	remove(pCallback:Function, pThisArg?:any) : void {
		var i = this._getEventIndex(pCallback, pThisArg);
		this._list.splice(i, 1);
	}
	_getEventIndex(pCallback:Function, pThisArg?:any) : number {
		var i = this._list.length;
		while (i--) {
			if (this._list[i].listener == pCallback && this._list[i].thisArg == pThisArg) {
				return i;
			}
		}
		return -1;
	}
	dispatch(...args) : void {
		var i = this._list.length;
		while(i-- && this._allowDispatch) {
			this._list[i].listener.apply(this._list[i].thisArg, arguments);
		}
	}
	dispose() : void {
		for (; 0 < this._list.length;) this._list.pop();
		this._list = null;
		this._allowDispatch = false;
	}
}

class EventData
{
	listener: Function;
	thisArg: any;
	
	constructor(pListener: Function, pThisArg?: any) {
		this.listener = pListener;
		this.thisArg = pThisArg;
	}
}