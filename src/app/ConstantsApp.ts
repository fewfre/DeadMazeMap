import ScreenBase from "../screens/ScreenBase";
import Global from "../utils/Global";
import MapScreen from "../screens/MapScreen";
import Utils from "../utils/Utils";

export default class ConstantsApp
{
	static readonly VERSION : string = "0.1";
	static readonly SOURCE_URL : string = "https://github.com/fewfre/DeadMazeMap";

	static readonly OPTION_DEBUG : boolean = !!Utils.getUrlParameter("debug");
	
	static STAGE_WIDTH : number;// = canvas.width;
	static STAGE_HEIGHT : number;// = canvas.height;
	static STAGE_CENTER_X : number;// = canvas.width*0.5
	static STAGE_CENTER_Y : number;// = canvas.height*0.5;
	
	static readonly DEG2RAD : number = Math.PI/180
	static readonly RAD2DEG : number = 180/Math.PI;
	
	static screenData : any;
	static showUrlParams : boolean = false;
	
	static init() : void {
		ConstantsApp.STAGE_WIDTH = Global.canvas.width;
		ConstantsApp.STAGE_HEIGHT = Global.canvas.height;
		ConstantsApp.STAGE_CENTER_X = Global.canvas.width*0.5
		ConstantsApp.STAGE_CENTER_Y = Global.canvas.height*0.5;
	}
	
	static readonly VIGNETTE_BASE : string = "https://vignette.wikia.nocookie.net/transformice/images";
	
	static readonly assetPacks : { [packname:string]:(string|{ id:string, src:string })[]; } = {
		preload: [
			"http://fewfre.com/images/avatar.jpg?tag=dmmap&ref="+encodeURIComponent(document.referrer),
		],
		initial: [
			"images/github.png",
			{ id:"sac_icon", src:"http://www.transformice.com/images/x_deadmeat/x_interfaces/monde/zones/38.png" },
			{ id:"bodega_icon", src:"http://www.transformice.com/images/x_deadmeat/x_interfaces/monde/zones/45.png" },
			{ id:"santa_icon", src:"http://www.transformice.com/images/x_deadmeat/x_interfaces/monde/zones/46.png" },
			{ id:"mazon_icon", src:"http://www.transformice.com/images/x_deadmeat/x_interfaces/monde/zones/10.png" },
			{ id:"mall_icon", src:"http://www.transformice.com/images/x_deadmeat/x_interfaces/monde/zones/11.png" },
		],
		map: [
			{ id:"home_btn", src:ConstantsApp.VIGNETTE_BASE+"/4/41/Menu_icon.png/revision/latest/scale-to-width-down/75?cb=20151223164027&t=.png" },
		],
	};
	
	static readonly mapDatas : { [mapkey:string]:MapData; } = {
		sac: { mapAsset:"sac_map", iconAsset:"sac_icon", spawnX:642, spawnY:612, spawnTileX:117, spawnTileY:109, scale:81/758,//3.923076923076923/MapScreen.TILE_DIAG
			// loadList:[ { id:"sac_map", src:"images/sac_map.png" } ], scale:3.923076923076923/MapScreen.TILE_DIAG },//scale:0.085 },//scale:0.11 },
			loadList:[
				{ id:"sac_map", src:ConstantsApp.VIGNETTE_BASE+"/9/95/Sacramento_Suburbs_map.png/revision/latest/scale-to-width-down/10000?cb=20180225223817&t=.png" }
			],
		},
		bay: { mapAsset:"bodega_map", iconAsset:"bodega_icon", spawnX:1792, spawnY:1363, spawnTileX:169, spawnTileY:227, scale:105/600,
			loadList:[
				{ id:"bodega_map", src:ConstantsApp.VIGNETTE_BASE+"/a/a4/Bodega_Bay_map.png/revision/latest/scale-to-width-down/10000?cb=20180506075130&t=.png" }
			],
		},
		santa: { mapAsset:"santa_map", iconAsset:"santa_icon", spawnX:475, spawnY:1024, spawnTileX:149, spawnTileY:190, scale:60/420,
			loadList:[
				{ id:"santa_map", src:ConstantsApp.VIGNETTE_BASE+"/2/29/Downtown_Santa_Rosa_map.png/revision/latest/scale-to-width-down/10000?cb=20180225223817&t=.png" }
			],
		},
	};
}