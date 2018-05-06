import ImageSprite from "../display/ImageSprite";
import Mouse from "../utils/Mouse";
import TextSprite from "../display/TextSprite";
import Utils from "../utils/Utils";
import FillSprite from "../display/FillSprite";
import ConstantsApp from "../app/ConstantsApp";
import ScreenBase from "./ScreenBase";
import Global from "../utils/Global";
import CustomSprite from "../display/CustomSprite";
import ButtonImageSprite from "../display/ButtonImageSprite";
import MapSelectionScreen from "./MapSelectionScreen";
import LoadingScreen from "./LoadingScreen";

export default class MapScreen extends ScreenBase
{
	// 10 tiles is ~400x200 at a right angle.
	static readonly TILE_SIZEX : number = 40; // Base on the dialional distance across a tile, this is the "x" distance from the triangle.
	static readonly TILE_SIZEY : number = 20; // Base on the dialional distance across a tile, this is the "y" distance from the triangle.
	static readonly TILE_DIAG : number = 44.72;//46;//46.07;
	static readonly TILE_ANGLE : number = -26.57;//27;//-27.121;
	static readonly TILE_ANGLE2 : number = -180+26.57;//-90-(90+MapScreen.TILE_ANGLE);
	
	data : MapData;
	map : ImageSprite;
	coords : TextSprite;
	tileDiag : number;
	
	mouseDownX : number;
	mouseDownY : number;
	mapDragX : number;
	mapDragY : number;
	
	private _onMouseDownBinded : any;
	private _onMouseMoveBinded : any;
	
	protected _buildScreen() : void {
		this.data = ConstantsApp.screenData;
		this.map = this.spriteManager.add(new ImageSprite({ asset:this.data.mapAsset, origin:0, x:ConstantsApp.STAGE_CENTER_X-this.data.spawnX, y:ConstantsApp.STAGE_CENTER_Y-this.data.spawnY, fontStyle:"bold" }));
		this._clampMapToSides();
		
		this.spriteManager.add(new FillSprite({ color:0, width:90, height:35, alpha:0.5, originX:1, originY:0, x:ConstantsApp.STAGE_WIDTH, y:0 }));
		this.coords = this.spriteManager.add(new TextSprite({ originX:1, originY:0, x:ConstantsApp.STAGE_WIDTH-15, y:23 }));
		
		this.spriteManager.add(new FillSprite({ color:0, width:90, height:35, alpha:0.5, originX:0, originY:0, x:0, y:0 }));
		this.spriteManager.add(new TextSprite({ text:"BETA", originX:0, originY:0, x:15, y:23 }));
		
		this.spriteManager.add(new ButtonImageSprite({ asset:"home_btn", x:15+75/2, y:ConstantsApp.STAGE_HEIGHT-15-75/2, }))
		.onClick.add(() => {
			Global.screenManager.push(LoadingScreen);
			Global.assets.load(ConstantsApp.assetPacks["initial"], () => {
				Global.screenManager.pushAndReplace(MapSelectionScreen);
			});
		});
		
		this.tileDiag = MapScreen.TILE_DIAG * this.data.scale;
		
		if(ConstantsApp.showUrlParams) {
			ConstantsApp.showUrlParams = false;
			let [tTileX, tTileY] = Utils.getUrlParameter("c").split(",");
			let tTileXDif = parseInt(tTileX) - this.data.spawnTileX;
			let tTileYDif = parseInt(tTileY) - this.data.spawnTileY;
			let tTILE_WIDTH = MapScreen.TILE_SIZEX*this.data.scale, tTILE_HEIGHT = MapScreen.TILE_SIZEY*this.data.scale;
			let tXDif = (tTileXDif*tTILE_WIDTH) + (tTileYDif*tTILE_WIDTH),
				tYDif = (-tTileXDif*tTILE_HEIGHT) + (tTileYDif*tTILE_HEIGHT);
			
			this.map.x = ConstantsApp.STAGE_CENTER_X-this.data.spawnX - tXDif;
			this.map.y = ConstantsApp.STAGE_CENTER_Y-this.data.spawnY - tYDif;
			this._clampMapToSides();
			
			this.map.add(new CustomSprite({ x:this.data.spawnX + tXDif, y:this.data.spawnY + tYDif, draw:(ctx)=>{
				let strokeWidth = 3;
				
				ctx.shadowColor = "darkred";
				ctx.shadowBlur = 3;
				
				ctx.beginPath();
				ctx.arc(0, 0, 20, 0, 2 * Math.PI, false);
				ctx.lineWidth = 10;
				ctx.strokeStyle = 'darkred';
				ctx.stroke();
				
				ctx.beginPath();
				ctx.arc(0, 0, 20, 0, 2 * Math.PI, false);
				ctx.lineWidth = 10-(strokeWidth*2);
				ctx.strokeStyle = 'red';
				ctx.stroke();
			} }));
			
		}
		if(ConstantsApp.OPTION_DEBUG) {
			// See side of triangle used to find x/y tile distances
			this.map.add(new CustomSprite({ x:this.data.spawnX, y:this.data.spawnY, draw:(ctx)=>{
				let tDistX = (-this.map.x+Mouse.mouseX - this.data.spawnX);
				let tDistY = (-this.map.y+Mouse.mouseY - this.data.spawnY);
				let tLineAngle = Math.atan2(tDistY, tDistX) * ConstantsApp.RAD2DEG;
				let tDistToTarget = Math.sqrt( tDistX*tDistX + tDistY*tDistY );// * this.data.scale;
				
				let tAngleBetweenLineAndTileAngle = tLineAngle - MapScreen.TILE_ANGLE;
				let sideH = tDistToTarget, sideA, sideB,
				angleH = 180-(Math.abs(MapScreen.TILE_ANGLE)*2), angleA = tAngleBetweenLineAndTileAngle, angleB = (180 - angleH - angleA);
				angleH *= ConstantsApp.DEG2RAD; angleA *= ConstantsApp.DEG2RAD; angleB *= ConstantsApp.DEG2RAD;
				sideA = (sideH/Math.sin(angleH)) * Math.sin(angleA);// * this.data.scale;
				sideB = (sideH/Math.sin(angleH)) * Math.sin(angleB);// * this.data.scale;
				let tXDist = sideB, tYDist = sideA;
				
				ctx.lineWidth = 5;
				
				ctx.strokeStyle = 'gold';
				
				ctx.beginPath();
				ctx.rotate(tLineAngle*ConstantsApp.DEG2RAD);
				ctx.moveTo(0,0);
				ctx.lineTo(tDistToTarget, 0);
				ctx.stroke();
				ctx.rotate(-tLineAngle*ConstantsApp.DEG2RAD);
				
				ctx.strokeStyle = 'purple';
				
				ctx.rotate(MapScreen.TILE_ANGLE*ConstantsApp.DEG2RAD);
				ctx.beginPath();
				ctx.moveTo(0,0);
				ctx.lineTo(tXDist, 0);
				ctx.translate(tXDist,0);
				// ctx.stroke();
				
				// ctx.rotate((-MapScreen.TILE_ANGLE+MapScreen.TILE_ANGLE2)*ConstantsApp.DEG2RAD);
				ctx.rotate((180-MapScreen.TILE_ANGLE+MapScreen.TILE_ANGLE2)*ConstantsApp.DEG2RAD);
				// ctx.beginPath();
				// ctx.moveTo(0,0);
				ctx.lineTo(tYDist, 0);
				ctx.stroke();
			} }));
		}
	}
	protected _addEventListeners() : void {
		Mouse.onMouseDown.add(this._onMouseDownBinded = this._onMouseDown.bind(this));
		Mouse.onMouseMove.add(this._onMouseMoveBinded = this._onMouseMove.bind(this));
	}
	protected _removeEventListeners() : void {
		Mouse.onMouseMove.remove(this._onMouseMoveBinded);
		Mouse.onMouseDown.remove(this._onMouseDownBinded);
	}
	dispose() : void {
		super.dispose();
	}
	update(dt) : void {
		super.update(dt);
	}
	_onMouseDown() : void {
		this.mouseDownX = Mouse.mouseX;
		this.mouseDownY = Mouse.mouseY;
		this.mapDragX = this.map.x;
		this.mapDragY = this.map.y;
	}
	_onMouseMove() : void {
		if(Mouse.flagMouseDown) {
			this.map.to( this.mapDragX + (Mouse.mouseX - this.mouseDownX), this.mapDragY + (Mouse.mouseY - this.mouseDownY) );
			this._clampMapToSides();
		}
		if(this.coords) {
			let tDistX = (-this.map.x+Mouse.mouseX - this.data.spawnX);
			let tDistY = (-this.map.y+Mouse.mouseY - this.data.spawnY);
			let tLineAngle = Math.atan2(tDistY, tDistX) * ConstantsApp.RAD2DEG;
			let tDistToTarget = Math.sqrt( tDistX*tDistX + tDistY*tDistY );// * this.data.scale;
			
			let tAngleBetweenLineAndTileAngle = tLineAngle - MapScreen.TILE_ANGLE;
			let sideH = tDistToTarget, sideA, sideB,
			angleH = 180-(Math.abs(MapScreen.TILE_ANGLE)*2), angleA = tAngleBetweenLineAndTileAngle, angleB = (180 - angleH - angleA);
			angleH *= ConstantsApp.DEG2RAD; angleA *= ConstantsApp.DEG2RAD; angleB *= ConstantsApp.DEG2RAD;
			sideA = (sideH/Math.sin(angleH)) * Math.sin(angleA);// * this.data.scale;
			sideB = (sideH/Math.sin(angleH)) * Math.sin(angleB);// * this.data.scale;
			let tXDist = sideB, tYDist = sideA;
			
			// // With a triangle using distance between spawn and y coord angle, find number of y tiles away from spawn.
			// let tAngleBetweenLineAndTileAngle = tLineAngle - MapScreen.TILE_ANGLE;
			// let sideH = tDistToTarget, sideA, sideB,
			// angleH = 90, angleA = tAngleBetweenLineAndTileAngle, angleB = (180 - angleH - angleA);
			// angleH *= ConstantsApp.DEG2RAD; angleA *= ConstantsApp.DEG2RAD; angleB *= ConstantsApp.DEG2RAD;
			// sideA = (sideH/Math.sin(angleH)) * Math.sin(angleA);// * this.data.scale;
			// // sideB = (sideH/Math.sin(angleH)) * Math.sin(angleB);// * this.data.scale;
			// let tYDist = sideA;
			
			// // With a triangle using distance between spawn and x coord angle, find number of x tiles away from spawn.
			// tAngleBetweenLineAndTileAngle = tLineAngle - MapScreen.TILE_ANGLE2;
			// sideH = tDistToTarget, sideA, sideB,
			// angleH = 90, angleA = tAngleBetweenLineAndTileAngle, angleB = (180 - angleH - angleA);
			// angleH *= ConstantsApp.DEG2RAD; angleA *= ConstantsApp.DEG2RAD; angleB *= ConstantsApp.DEG2RAD;
			// sideA = (sideH/Math.sin(angleH)) * Math.sin(angleA);// * this.data.scale;
			// // sideB = (sideH/Math.sin(angleH)) * Math.sin(angleB);// * this.data.scale;
			// let tXDist = sideA;
			
			// console.log("Tiles worth of dist (relative to small map) away from spawn:", tXDist, tYDist);
			let tTileX = this.data.spawnTileX + Math.floor(tXDist / (this.tileDiag));//sideB / (this.tileDiag));
			let tTileY = this.data.spawnTileY + Math.floor(tYDist / (this.tileDiag));//sideA / (this.tileDiag));
			this.coords.text = `${tTileX}, ${tTileY}`;
			this.coords.updateFont(Global.context);
		}
	}
	_clampMapToSides() : void {
		this.map.x = Utils.clamp(this.map.x, -(this.map.width - ConstantsApp.STAGE_WIDTH), 0);
		this.map.y = Utils.clamp(this.map.y, -(this.map.height - ConstantsApp.STAGE_HEIGHT), 0);
	}
	_loopAngle(pAngle:number, pMax:number=360) : number {
		if(pAngle < 0) { return this._loopAngle(pAngle+pMax); }
		else if(pAngle > pMax) { return this._loopAngle(pAngle-pMax); }
		return pAngle;
	}
}