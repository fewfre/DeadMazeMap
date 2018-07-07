import MapScreen from "../screens/MapScreen";
import Global from "../fewfre/Global";
import Utils from "../fewfre/utils/Utils";
import FewfEvent from "../fewfre/utils/FewfEvent";
import Manifest from "./Manifest";

export default class ConstantsApp
{
	static readonly VERSION : string = "0.4";
	static readonly SOURCE_URL : string = "https://github.com/fewfre/DeadMazeMap";
	static readonly SHORT_URL : string = "http://fewfre.com/dmmap";

	static readonly OPTION_DEBUG : boolean = !!Utils.getUrlParameter("debug");
	
	static STAGE_WIDTH : number;// = canvas.width;
	static STAGE_HEIGHT : number;// = canvas.height;
	static STAGE_CENTER_X : number;// = canvas.width*0.5
	static STAGE_CENTER_Y : number;// = canvas.height*0.5;
	
	static readonly DEG2RAD : number = Math.PI/180
	static readonly RAD2DEG : number = 180/Math.PI;
	
	static screenData : any;
	static showUrlParams : boolean = false;
	
	static onResize	: FewfEvent = new FewfEvent();
	
	static init() : void {
		ConstantsApp.STAGE_WIDTH = Global.canvas.width;
		ConstantsApp.STAGE_HEIGHT = Global.canvas.height;
		ConstantsApp.STAGE_CENTER_X = Global.canvas.width*0.5
		ConstantsApp.STAGE_CENTER_Y = Global.canvas.height*0.5;
	}
	
	// static readonly VIGNETTE_BASE : string = "https://vignette.wikia.nocookie.net/deadmaze/images";
	
	// static readonly assetPacks : { [packname:string]:(string|{ id:string, src:string })[]; } = {
	// 	preload: [
	// 		"https://fewfre.com/images/avatar.jpg?tag=dmmap&ref="+encodeURIComponent(document.referrer),
	// 	],
	// 	initial: [
	// 		"images/github.png",
	// 		// URBAN
	// 		{ id:"sac_icon", src:"https://www.transformice.com/images/x_deadmeat/x_interfaces/monde/zones/38.png" },
	// 		{ id:"bodega_icon", src:"https://www.transformice.com/images/x_deadmeat/x_interfaces/monde/zones/45.png" },
	// 		{ id:"santa_icon", src:"https://www.transformice.com/images/x_deadmeat/x_interfaces/monde/zones/46.png" },
	// 		{ id:"mazon_icon", src:"https://www.transformice.com/images/x_deadmeat/x_interfaces/monde/zones/10.png" },
	// 		{ id:"mall_icon", src:"https://www.transformice.com/images/x_deadmeat/x_interfaces/monde/zones/11.png" },
	// 		// DESERT
	// 		{ id:"walker_icon", src:"https://www.transformice.com/images/x_deadmeat/x_interfaces/monde/zones/15.png" },
	// 		{ id:"museum_icon", src:"https://www.transformice.com/images/x_deadmeat/x_interfaces/monde/zones/39.png" },
	// 		{ id:"highway_icon", src:"https://www.transformice.com/images/x_deadmeat/x_interfaces/monde/zones/49.png" },
	// 		{ id:"mesa_icon", src:"https://www.transformice.com/images/x_deadmeat/x_interfaces/monde/zones/63.png" },
	// 	],
	// 	map: [
	// 		{ id:"home_btn", src:"https://vignette.wikia.nocookie.net/transformice/images/4/41/Menu_icon.png/revision/latest/scale-to-width-down/75?cb=20151223164027&t=.png" },
	// 		{ id:"black_button", src:"images/black_button.png" },
	// 	],
	// };
	
	static readonly mapDatas : { [mapkey:string]:MapData; } = {
		// URBAN
		sac: { id:"sac", packName:"zone_sac", mapAsset:"sac_map", iconAsset:"sac_icon", spawnX:642, spawnY:612, spawnTileX:117, spawnTileY:109, scale:81/758, },//3.923076923076923/MapScreen.TILE_DIAG },
		bay: { id:"bay", packName:"zone_bodega", mapAsset:"bodega_map", iconAsset:"bodega_icon", spawnX:1792, spawnY:1363, spawnTileX:169, spawnTileY:227, scale:105/600, },
		santa: { id:"santa", packName:"zone_santa", mapAsset:"santa_map", iconAsset:"santa_icon", spawnX:475, spawnY:1024, spawnTileX:149, spawnTileY:190, scale:60/420, },
		mazon: { id:"mazon", packName:"zone_mazon", mapAsset:"mazon_map", iconAsset:"mazon_icon", spawnX:1450, spawnY:1160, spawnTileX:306, spawnTileY:203, scale:44/240, },
		mall: { id:"mall", packName:"zone_mall", mapAsset:"mall_map", iconAsset:"mall_icon", spawnX:1345, spawnY:531, spawnTileX:229, spawnTileY:86, scale:82/660, },
		// DESERT
		walker: { id:"walker", packName:"zone_walker", mapAsset:"walker_map", iconAsset:"walker_icon", spawnX:3714, spawnY:420, spawnTileX:460, spawnTileY:298, scale:45/300, },
		museum: { id:"museum", packName:"zone_museum", mapAsset:"museum_map", iconAsset:"museum_icon", spawnX:1333, spawnY:722, spawnTileX:262, spawnTileY:90, scale:117/640, },
		highway: { id:"highway", packName:"zone_highway", mapAsset:"highway_map", iconAsset:"highway_icon", spawnX:154, spawnY:1974, spawnTileX:41, spawnTileY:144, scale:158/904, },
		mesa: { id:"mesa", packName:"zone_mesa", mapAsset:"mesa_map", iconAsset:"mesa_icon", spawnX:430, spawnY:1004, spawnTileX:50, spawnTileY:65, scale:180/980, },
	};
}