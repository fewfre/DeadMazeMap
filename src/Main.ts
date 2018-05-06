import Global from "./utils/Global";
import ConstantsApp from "./app/ConstantsApp";
import LoadingScreen from "./screens/LoadingScreen";
import MapSelectionScreen from "./screens/MapSelectionScreen";
import Mouse from "./utils/Mouse";
import Utils from "./utils/Utils";
import MapScreen from "./screens/MapScreen";

//######################################
// Main (instance class) - Start script and store values.
//######################################
class Main
{
	// Storage
	lastTime : number = 0;
	
	// Singleton constructor
	constructor() {
		Global.canvas = <HTMLCanvasElement>document.querySelector("#map");
		Global.context = Global.canvas.getContext("2d");
		Global.canvas.width = document.body.clientWidth; Global.canvas.height = document.body.clientHeight;
		ConstantsApp.init();
		Mouse.init();
		
		Global.screenManager.pushAndReplace(LoadingScreen);
		
		// Preload
		if(Utils.getUrlParameter("z") && Utils.getUrlParameter("c")) {
			ConstantsApp.showUrlParams = true;
			let tZoneData = ConstantsApp.mapDatas[ Utils.getUrlParameter("z") ];
			Global.assets.load(tZoneData.loadList.concat( ConstantsApp.assetPacks["map"] ), ()=>{
				ConstantsApp.screenData = tZoneData;
				Global.screenManager.pushAndReplace(MapScreen);
			});
		} else {
			Global.assets.load(ConstantsApp.assetPacks["preload"], this._onInitialLoad.bind(this));
		}
		
		// Update
		window.requestAnimationFrame(this.update.bind(this));
	}
	
	private _onInitialLoad() {
		Global.assets.load(ConstantsApp.assetPacks["initial"], this._onMapSelectionLoad.bind(this));
	}

	private _onMapSelectionLoad() {
		Global.screenManager.pushAndReplace(MapSelectionScreen);
	}

	private update(time) { let dt = (time-this.lastTime)/1000; this.lastTime = time;
		Global.context.clearRect(0, 0, Global.canvas.width, Global.canvas.height);
		Global.screenManager.update(dt);
		window.requestAnimationFrame(this.update.bind(this));
	}
}
// We want Main to be an instance class.
export default new Main();