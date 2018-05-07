import Sprite from "./Sprite";
import Global from "../Global";

export default class SpriteManager
{
	protected sprites : Sprite[];
	
	constructor() {
		this.sprites = [];
	}
	
	dispose() : void {
		for(var i = this.sprites.length-1; i >= 0; i--) {
			this.sprites[i].dispose();
			this.sprites[i] = null;
		}
		this.sprites = null;
	}
	
	add<T extends Sprite>(pSprite:T) : T {
		this.sprites.push(pSprite);
		return pSprite;
	}
	
	clear() : void {
		for(var i = 0; i < this.sprites.length; i++) {
			this.sprites[i].doDelete = true;
		}
	}
	
	update(dt:number) : void {
		let tFlagDelete = false;
		// Draw - reverse order to have newest on top.
		// for(var i = this.sprites.length-1; i >= 0; i--) {
		for(var i = 0; i < this.sprites.length; i++) {
			this.sprites[i].update(dt);
			this.sprites[i].draw(Global.context);
			if(this.sprites[i].doDelete) { tFlagDelete = true; }
		}
		if(tFlagDelete) {
			for(var i = this.sprites.length-1; i >= 0; i--) {
				if(this.sprites[i].doDelete) {
					this.sprites[i].dispose();
					this.sprites[i] = null;
					this.sprites.splice(i, 1);
				}
			}
		}
	}
}