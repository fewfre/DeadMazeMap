import ConstantsApp from "./app/ConstantsApp";
import LoadingScreen from "./screens/LoadingScreen";
import SplashScreen from "./screens/SplashScreen";
import MapSelectionScreen from "./screens/MapSelectionScreen";
import MapScreen from "./screens/MapScreen";
import Global from "./fewfre/Global";
import Mouse from "./fewfre/input/Mouse";
import Utils from "./fewfre/utils/Utils";

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
		Global.screenManager.push(SplashScreen);
		
		// This allows the page's onload to be called right away (instead of waiting for contents to be loaded). This way iframes see the app's loading screen.
		setTimeout(()=>{
			// Preload
			if(Utils.getUrlParameter("z")) {// && Utils.getUrlParameter("c")
				ConstantsApp.showUrlParams = true;
				let tZoneData = ConstantsApp.mapDatas[ Utils.getUrlParameter("z") ];
				// Global.assets.load(Manifest.assetPacks[ tZoneData.packName ].concat( ConstantsApp.assetPacks["map"] ), ()=>{
				Global.assets.loadPacks([ "preload", tZoneData.packName, "map" ]).then(()=>{
					ConstantsApp.screenData = tZoneData;
					Global.screenManager.pushAndReplace(MapScreen);
				});
			} else {
				Global.assets.loadPacks(["preload"]).then(()=>{
					this._onInitialLoad();
				});
			}
		}, 10);
		
		// Update
		window.requestAnimationFrame(this.update.bind(this));
		window.addEventListener("resize", this._onResize.bind(this), true);
	}
	
	private _onInitialLoad() {
		Global.assets.loadPacks(["initial"]).then(()=>{
			this._onMapSelectionLoad();
		});
	}

	private _onMapSelectionLoad() {
		Global.screenManager.pushAndReplace(MapSelectionScreen);
	}

	private update(time) { let dt = (time-this.lastTime)/1000; this.lastTime = time;
		Global.context.clearRect(0, 0, Global.canvas.width, Global.canvas.height);
		Global.screenManager.update(dt);
		window.requestAnimationFrame(this.update.bind(this));
	}
	
	private _onResize(e) {
		// console.log(document.body.clientWidth, document.body.clientHeight);
		Global.canvas.width = document.body.clientWidth; Global.canvas.height = document.body.clientHeight;
		let tOldWidth = ConstantsApp.STAGE_WIDTH, tOldHeight = ConstantsApp.STAGE_HEIGHT;
		ConstantsApp.init();
		ConstantsApp.onResize.dispatch(tOldWidth, tOldHeight);
	}
}
// We want Main to be an instance class.
export default new Main();
