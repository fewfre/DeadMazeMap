import MapScreen from "./MapScreen";
import FillSprite from "../display/FillSprite";
import ButtonImageSprite from "../display/ButtonImageSprite";
import Global from "../utils/Global";
import ConstantsApp from "../app/ConstantsApp";
import ScreenBase from "./ScreenBase";
import LoadingScreen from "./LoadingScreen";
import TextSprite from "../display/TextSprite";

export default class MapSelectionScreen extends ScreenBase
{
	_buttons : ButtonImageSprite[];
	
	protected _buildScreen() : void {
		this._buttons = [];
		let tray = this.spriteManager.add(new FillSprite({ color:"green", width:ConstantsApp.STAGE_WIDTH*0.8, height:ConstantsApp.STAGE_HEIGHT*0.8, x:ConstantsApp.STAGE_CENTER_X, y:ConstantsApp.STAGE_CENTER_Y }));
		let tLocations = [ "sac", "bay", "santa", "mazon", "mall", "walker", "museum", "highway", "mesa" ], tSpacing = 55, tBtn;
		for(var i = 0; i < tLocations.length; i++) {
			tBtn = tray.add(new ButtonImageSprite({ asset:ConstantsApp.mapDatas[tLocations[i]].iconAsset, x:-((tLocations.length*0.5-0.5)*tSpacing) + tSpacing*i }));
			this._buttons.push(tBtn);
			(function(self, pName){ tBtn.onClick.add(() => { self.onMapSelected(pName); }); })( this, tLocations[i] );
		}
		
		tray.add(new TextSprite({ text:"Dead Maze Map Explorer", y:-tray.height*0.5+75, fontSize:35 }));
		
		this.spriteManager.add(new TextSprite({ text:"V"+ConstantsApp.VERSION, originX:1, originY:1, x:ConstantsApp.STAGE_WIDTH-15, y:ConstantsApp.STAGE_HEIGHT-7.5 }));
		this._buttons.push(this.spriteManager.add(new ButtonImageSprite({ asset:"github", x:ConstantsApp.STAGE_WIDTH-80, y:ConstantsApp.STAGE_HEIGHT-30 })));
		this._buttons[this._buttons.length-1].onClick.add(()=>{ window.open(ConstantsApp.SOURCE_URL, '_blank'); });
	}
	dispose() : void {
		super.dispose();
		this._buttons = null;
	}
	update(dt:number) : void {
		super.update(dt);
	}
	
	onMapSelected(pName:string) : void {
		for(var i = 0; i < this._buttons.length; i++) { this._buttons[i].disable(); }
		Global.screenManager.push(LoadingScreen);
		this.loadMap(ConstantsApp.mapDatas[pName]);
	}
	
	loadMap(pMapData:MapData) : void {
		Global.assets.load(pMapData.loadList.concat( ConstantsApp.assetPacks["map"] ), ()=>{
			ConstantsApp.screenData = pMapData;
			Global.screenManager.pushAndReplace(MapScreen);
		});
	}
}