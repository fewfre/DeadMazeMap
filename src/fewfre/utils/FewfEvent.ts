export default class FewfEvent
{
	private _list : any[];//((...args:any[]) => void)[];
	
	constructor() {
		this._list = [];
	}
	add(pCallback) : void {
		if(this._list.indexOf(pCallback) <= 0) {
			this._list.push(pCallback);
		}
	}
	remove(pCallback) : void {
		for (var i = this._list.length; 0 < i--;)
			if (this._list[i] == pCallback) {
				this._list.splice(i, 1);
				break
			}
	}
	dispatch(...args) : void {
		if(!this._list) { return; } // TODO: Don't dispose this object in the middle of dispatching!
		for (var i = 0; i < this._list.length; i++) {
			if(!this._list) { return; } // TODO: Don't dispose this object in the middle of dispatching!
			this._list[i].apply(null, arguments);
			if(!this._list) { return; } // TODO: Don't dispose this object in the middle of dispatching!
		}
	}
	dispose() : void {
		for (; 0 < this._list.length;) this._list.pop();
		this._list = null
	}
}