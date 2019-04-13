import Sprite from "../fewfre/display/Sprite";
import ImageSprite from "../fewfre/display/ImageSprite";
import World from "../data/World";
import ConstantsApp from "../app/ConstantsApp";
	
const TILE_WIDTH : number = 42;
const TILE_HEIGHT : number = 21;
const tileScale : number = 0.35;

export default class MapTilesSprite extends Sprite
{
	worldData : World;
	tiles : ImageSprite[][];
	drawTileTop : number;
	drawTileBottom : number;
	drawTileLeft : number;
	drawTileRight : number;
	
	constructor(pWorld:World, pProp:SpriteProp) {
		super(pProp);
		this.worldData = pWorld;
		this.tiles = [];
		
		// for (let i = 0; i < this.data.world.tiles.length; i++) {
		for (let i = this.worldData.tiles.length-1; i >= 0; i--) {
			this.tiles[i] = [];
			for (let j = 0; j < this.worldData.tiles[i].length; j++) {
				const tile = this.worldData.tiles[i][j];
				let x = i*TILE_WIDTH*tileScale + j*TILE_WIDTH*tileScale, y=i*-TILE_HEIGHT*tileScale + j*TILE_HEIGHT*tileScale + tile.offset*tileScale;
				this.addTileSprite(i, j, new ImageSprite({ asset:"floor"+tile.ground, origin:0, scale:tileScale, x:75+x, y:ConstantsApp.STAGE_CENTER_Y+y }));
			}
		}
		this.drawTileTop = 0;
		this.drawTileLeft = 0;
		this.drawTileBottom = this.worldData.height-1;
		this.drawTileRight = this.worldData.width-1;
	}
	
	dispose() : void {
		super.dispose();
	}
	
	addTileSprite(x:number, y:number, pSprite:ImageSprite) : ImageSprite {
		this.tiles[x][y] = pSprite;
		pSprite.parent = this;
		return pSprite;
	}
	
	protected _drawChildren(ctx:CanvasRenderingContext2D) : void {
		// for(var i = 0; i < this.children.length; i++) {
		// 	this.children[i].draw(ctx);
		// }
		for (let x = this.drawTileRight; x >= this.drawTileLeft; x--) {
			for (let y = this.drawTileTop; y < this.drawTileBottom; y++) {
				this.tiles[x][y].draw(ctx);
			}
		}
	}
	
	updateDrawArea() :void {
		/*****************************************
		* X-COORD
		******************************************/
		this.drawTileLeft = 0;
		this.drawTileRight = this.worldData.width-1;
		
		// Get left most coord - keep going down each column until a tile is visible, then mark it as "left most tile" and exit
		this.drawTileLeft = -1;
		for (let xx = 0; xx < this.worldData.width-1; xx++) {
			for (let yy = 0; yy < this.worldData.height-1; yy++) {
				const tileX = this._getDrawX()+this.tiles[xx][yy].x-(TILE_WIDTH*tileScale);
				const tileY = this._getDrawY()+this.tiles[xx][yy].y-(TILE_HEIGHT*tileScale);
				// Find first onscreen tile coming from the left
				if(tileX >= 0 && ( tileY > 0 && tileY < ConstantsApp.STAGE_HEIGHT )) {
					this.drawTileLeft = xx;
					// console.log("LEFT MOST TILE: ", xx, this._getDrawX(), tileX);
					break;
				}
			}
			if(this.drawTileLeft > -1) { break; }
		}
		
		// Get right most coord - keep going up each column until a tile is visible, then mark it as "right most tile" and exit
		this.drawTileRight = -1;
		for (let xx = this.worldData.width-1; xx >= 0; xx--) {
			for (let yy = 0; yy < this.worldData.height-1; yy++) {
				const tileX = this._getDrawX()+this.tiles[xx][yy].x+(TILE_WIDTH*tileScale);
				const tileY = this._getDrawY()+this.tiles[xx][yy].y+(TILE_HEIGHT*tileScale);
				// Find first onscreen tile coming from the right
				if(tileX <= ConstantsApp.STAGE_WIDTH && ( tileY > 0 && tileY < ConstantsApp.STAGE_HEIGHT )) {
					this.drawTileRight = xx;
					// console.log("RIGHT MOST TILE: ", xx, this._getDrawX(), tileX);
					break;
				}
			}
			if(this.drawTileRight > -1) { break; }
		}
		
		/*****************************************
		* Y-COORD
		******************************************/
		this.drawTileTop = 0;
		this.drawTileBottom = this.worldData.height-1;
		
		// Get top most coord - keep going down each row until a tile is visible, then mark it as "top most tile" and exit
		this.drawTileTop = -1;
		for (let yy = 0; yy < this.worldData.height-1; yy++) {
			for (let xx = 0; xx < this.worldData.width-1; xx++) {
				const tileX = this._getDrawX()+this.tiles[xx][yy].x-(TILE_WIDTH*tileScale);
				const tileY = this._getDrawY()+this.tiles[xx][yy].y-(TILE_HEIGHT*tileScale);
				// Find first onscreen tile coming from the top
				if(tileY >= 0 && ( tileX > 0 && tileX < ConstantsApp.STAGE_WIDTH )) {
					this.drawTileTop = yy;
					// console.log("TOP MOST TILE: ", yy, this._getDrawY(), tileY);
					break;
				}
			}
			if(this.drawTileTop > -1) { break; }
		}
		
		// Get bottom most coord - keep going up each row until a tile is visible, then mark it as "bottom most tile" and exit
		this.drawTileBottom = -1;
		for (let yy = this.worldData.height-1; yy >= 0; yy--) {
			for (let xx = 0; xx < this.worldData.width-1; xx++) {
				const tileX = this._getDrawX()+this.tiles[xx][yy].x+(TILE_WIDTH*tileScale);
				const tileY = this._getDrawY()+this.tiles[xx][yy].y+(TILE_HEIGHT*tileScale);
				// Find first onscreen tile coming from the right
				if(tileY <= ConstantsApp.STAGE_HEIGHT && ( tileX > 0 && tileX < ConstantsApp.STAGE_WIDTH )) {
					this.drawTileBottom = yy;
					// console.log("BOTTOM MOST TILE: ", yy, this._getDrawY(), tileY);
					break;
				}
			}
			if(this.drawTileBottom > -1) { break; }
		}
		
		// console.log(`(updateDrawArea) top:${this.drawTileTop}, bottom:${this.drawTileBottom}, left:${this.drawTileLeft}, right:${this.drawTileRight}`);
	}
	
	// get width() : number { return undefined; }
	// get height() : number { return undefined; }
	
	// protected _customDraw(ctx:CanvasRenderingContext2D) : void {
		
	// }
}