import ConstantsApp from "../app/ConstantsApp";
import MapSelectionScreen from "./MapSelectionScreen";
import LoadingScreen from "./LoadingScreen";
import ScreenBase from "../fewfre/screens/ScreenBase";
import ImageSprite from "../fewfre/display/ImageSprite";
import TextSprite from "../fewfre/display/TextSprite";
import FillSprite from "../fewfre/display/FillSprite";
import ButtonImageSprite from "../fewfre/display/ButtonImageSprite";
import Global from "../fewfre/Global";
import Utils from "../fewfre/utils/Utils";
import CustomSprite from "../fewfre/display/CustomSprite";
import Mouse from "../fewfre/input/Mouse";
import Sprite from "../fewfre/display/Sprite";
import CircleMarker from "../display/CircleMarker";
import Vector from "../fewfre/math/Vector";

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
	marks : CircleMarker[];
	draggingMark : CircleMarker;
	
	mouseDownX : number;
	mouseDownY : number;
	mapDragX : number;
	mapDragY : number;
	
	curTileX : number;
	curTileY : number;
	
	sidebar : FillSprite;
	sidebarTrayTop : Sprite;
	sidebarTrayBottom : Sprite;
	// resizeFunction : any;
	
	protected _buildScreen() : void {
		this.data = ConstantsApp.screenData;
		this.marks = [];
		
		this.curTileX = 0;
		this.curTileY = 0;
		
		this.spriteManager.add(new FillSprite({ color:0, width:ConstantsApp.STAGE_WIDTH, height:ConstantsApp.STAGE_HEIGHT, origin:0 }));
		
		this.map = this.spriteManager.add(new ImageSprite({ asset:this.data.mapAsset, origin:0, x:ConstantsApp.STAGE_CENTER_X-this.data.spawnX, y:ConstantsApp.STAGE_CENTER_Y-this.data.spawnY }));
		this._clampMapToSides();
		
		this.tileDiag = MapScreen.TILE_DIAG * this.data.scale;
		
		if(ConstantsApp.showUrlParams) {
			ConstantsApp.showUrlParams = false;
			if(Utils.getUrlParameter("c")) {
				let tMarks = Utils.getUrlParameter("c").split("|");
				for(let i=0; i<tMarks.length; i++) {
					let [tTileX, tTileY] = tMarks[i].split(",");
					// let tTileXDif = parseInt(tTileX) - this.data.spawnTileX;
					// let tTileYDif = parseInt(tTileY) - this.data.spawnTileY;
					// let tTILE_WIDTH = MapScreen.TILE_SIZEX*this.data.scale, tTILE_HEIGHT = MapScreen.TILE_SIZEY*this.data.scale;
					// let tXDif = (tTileXDif*tTILE_WIDTH) + (tTileYDif*tTILE_WIDTH),
					// 	tYDif = (-tTileXDif*tTILE_HEIGHT) + (tTileYDif*tTILE_HEIGHT);
					
					// this.map.x = ConstantsApp.STAGE_CENTER_X-this.data.spawnX - tXDif;
					// this.map.y = ConstantsApp.STAGE_CENTER_Y-this.data.spawnY - tYDif;
					var tPos = this._coordToPos(parseInt(tTileX), parseInt(tTileY));
					this.map.to(ConstantsApp.STAGE_CENTER_X-tPos.x, ConstantsApp.STAGE_CENTER_Y-tPos.y);
					this._clampMapToSides();
					this.marks.push(this.map.add(new CircleMarker({}).toVector(tPos).setTile(parseInt(tTileX), parseInt(tTileY))));
				}
			}
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
		
		this.sidebar = this.spriteManager.add(new FillSprite({ color:"#EEE", width:100, height:ConstantsApp.STAGE_HEIGHT, x:100*0.5, y:ConstantsApp.STAGE_CENTER_Y }));
		
		// Top part of sidebar
		this.sidebarTrayTop = this.sidebar.add(new Sprite({ y:-ConstantsApp.STAGE_CENTER_Y, }));
		let tY = 35*0.5;//-ConstantsApp.STAGE_CENTER_Y+35*0.5;
		this.sidebarTrayTop.add(new FillSprite({ color:0, width:100, height:35, alpha:0.5, y:tY }));
		this.coords = this.sidebarTrayTop.add(new TextSprite({ text:"0, 0", y:tY }));
		
		tY = 35 + 20*0.5 + 2;//-ConstantsApp.STAGE_CENTER_Y+35 + 20*0.5 + 2;
		this.sidebarTrayTop.add(new FillSprite({ color:0, width:100, height:20, alpha:0.5, y:tY }));
		this.sidebarTrayTop.add(new TextSprite({ text:"(BETA)", fontSize:11, y:tY }));
		
		// Bottom part of sidebar
		this.sidebarTrayBottom = this.sidebar.add(new Sprite({ y:ConstantsApp.STAGE_CENTER_Y, }));
		let tBtn:ButtonImageSprite;
		
		tY = -12;//ConstantsApp.STAGE_CENTER_Y-12;
		tY += -75/2;
		tBtn = this.sidebarTrayBottom.add(new ButtonImageSprite({ asset:"home_btn", y:tY, }));
		tBtn.onClick.add(this._onHomeClick, this);
		
		if(Utils.copyToClipboardSupported()) {
			tY += -75/2 -43/2 -2;
			tBtn = this.sidebarTrayBottom.add(new ButtonImageSprite({ asset:"black_button", y:tY }));
			tBtn.add(new TextSprite({ text:"🔗Share", y:0 }));
			tBtn.onClick.add(this._onCopyToClipboardClick, this);
		}
		
		tY += -43/2 -43/2 -2;
		tBtn = this.sidebarTrayBottom.add(new ButtonImageSprite({ asset:"black_button", y:tY }));
		let tText = tBtn.add(new TextSprite({ text:"Add Circle", fontSize:14, y:0 }));
		tBtn.onClick.add(this._onAddCircleClick, this);
		
		tBtn = null;
		
		// ConstantsApp.onResize.add(this.resizeFunction = (pOldWidth, pOldHeight)=>{
		// 	console.log(tPos);
		// 	this.map.to(ConstantsApp.STAGE_CENTER_X-tPos.x, ConstantsApp.STAGE_CENTER_Y-tPos.y);
		// 	this._clampMapToSides();
			
			
		// });
	}
	onResize(pOldWidth:number, pOldHeight:number) : void {
		// this.map.to(ConstantsApp.STAGE_CENTER_X-(this.map.x+pOldWidth*0.5), ConstantsApp.STAGE_CENTER_Y-(this.map.y+pOldHeight*0.5));
		this.map.x += (ConstantsApp.STAGE_WIDTH-pOldWidth)*0.5;
		this.map.y += (ConstantsApp.STAGE_HEIGHT-pOldHeight)*0.5;
		this._clampMapToSides();
			
		this.sidebar.sizeY = ConstantsApp.STAGE_HEIGHT;
		this.sidebar.y = ConstantsApp.STAGE_CENTER_Y;
		this.sidebarTrayTop.y = -ConstantsApp.STAGE_CENTER_Y;
		this.sidebarTrayBottom.y = ConstantsApp.STAGE_CENTER_Y;
	}
	dispose() : void {
		super.dispose();
		this.data = null;
		this.map = null;
		this.coords = null;
		this.marks = null;
		this.draggingMark = null;
		this.sidebar = null;
		this.sidebarTrayTop = null;
		this.sidebarTrayBottom = null;
		// ConstantsApp.onResize.remove(this.resizeFunction);
		// this.resizeFunction = null;
	}
	protected _addEventListeners() : void {
		Mouse.onMouseDown.add(this._onMouseDown, this);
		Mouse.onMouseMove.add(this._onMouseMove, this);
		Mouse.onWheel.add(this._onWheel, this);
	}
	protected _removeEventListeners() : void {
		Mouse.onMouseDown.remove(this._onMouseDown, this);
		Mouse.onMouseMove.remove(this._onMouseMove, this);
		Mouse.onWheel.remove(this._onWheel, this);
	}
	
	protected _onAddCircleClick() : void {
		this.draggingMark = this.spriteManager.add(new CircleMarker({ x:Mouse.mouseX, y:Mouse.mouseY }));
	}
	protected _onCopyToClipboardClick(pButton:ButtonImageSprite) : void {
		let tLink = `${ConstantsApp.SHORT_URL}?z=${this.data.id}`;
		let tCoords:string[] = [];
		for(let i=0; i < this.marks.length; i++) {
			tCoords.push(this.marks[i].tileX+","+this.marks[i].tileY);
		}
		if(tCoords.length > 0) { tLink += "&c="+tCoords.join("|"); }
		Utils.copyTextToClipboard(tLink);
		let tText = pButton.children[0] as TextSprite;
		tText.text = "Copied!"
		setTimeout(()=>{ tText.text="🔗Share" }, 1000);
	}
	protected _onHomeClick() {
		Global.screenManager.push(LoadingScreen);
		Global.assets.loadPacks(["initial"]).then(() => {
			Global.screenManager.pushAndReplace(MapSelectionScreen);
		});
	}
	
	update(dt) : void {
		super.update(dt);
	}
	_onMouseDown() : void {
		this.mouseDownX = Mouse.mouseX;
		this.mouseDownY = Mouse.mouseY;
		this.mapDragX = this.map.x;
		this.mapDragY = this.map.y;
		
		if(this.draggingMark != null) {
			this.spriteManager.remove(this.draggingMark);
			this.marks.push( this.map.add(this.draggingMark).setTile(this.curTileX, this.curTileY).toVector(this._coordToPos(this.curTileX, this.curTileY)) );
			this.draggingMark = null;
		}
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
			let tTileX = this.curTileX = this.data.spawnTileX + Math.floor(tXDist / (this.tileDiag));//sideB / (this.tileDiag));
			let tTileY = this.curTileY = this.data.spawnTileY + Math.floor(tYDist / (this.tileDiag));//sideA / (this.tileDiag));
			this.coords.text = `${tTileX}, ${tTileY}`;
			this.coords.updateFont(Global.context);
		}
		
		if(this.draggingMark != null) {
			this.draggingMark.to(Mouse.mouseX, Mouse.mouseY);
		}
	}
	_onWheel(pDeltaY:number) : void {
		// console.log(pDeltaY);
		// this.map.scale += pDeltaY*0.01;
		// this.map.scale = Math.min(Math.max(this.map.scale, 0.5), 2);
		// this._clampMapToSides();
	}
	_clampMapToSides() : void {
		this.map.x = Utils.clamp(this.map.x, -(this.map.width*this.map.scale - ConstantsApp.STAGE_WIDTH), 0);
		this.map.y = Utils.clamp(this.map.y, -(this.map.height*this.map.scale - ConstantsApp.STAGE_HEIGHT), 0);
	}
	_loopAngle(pAngle:number, pMax:number=360) : number {
		if(pAngle < 0) { return this._loopAngle(pAngle+pMax); }
		else if(pAngle > pMax) { return this._loopAngle(pAngle-pMax); }
		return pAngle;
	}
	
	_coordToPos(pTileX:number, pTileY:number) : Vector {
		let tTileXDif = pTileX - this.data.spawnTileX;
		let tTileYDif = pTileY - this.data.spawnTileY;
		let tTILE_WIDTH = MapScreen.TILE_SIZEX*this.data.scale, tTILE_HEIGHT = MapScreen.TILE_SIZEY*this.data.scale;
		let tXDif = (tTileXDif*tTILE_WIDTH) + (tTileYDif*tTILE_WIDTH),
			tYDif = (-tTileXDif*tTILE_HEIGHT) + (tTileYDif*tTILE_HEIGHT);
		return new Vector(this.data.spawnX + tXDif, this.data.spawnY + tYDif);
	}
	
	// TODO
	_posToCoord(pX:number, pY:number) : Vector {
		return new Vector();
	}
}