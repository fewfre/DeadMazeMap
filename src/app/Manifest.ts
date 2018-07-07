interface ManifestAssetData { id:string, src:string }
interface ManifestPackData extends Array<string>{}

export default class Manifest
{
	static readonly VIGNETTE_BASE : string = "https://vignette.wikia.nocookie.net/deadmaze/images";
	
	// static readonly assets : { [assetname:string]:(string|ManifestAssetData); } = {
	static readonly assets : { [assetname:string]:string } = {
		avatar: "https://fewfre.com/images/avatar.jpg?tag=dmmap&ref="+encodeURIComponent(document.referrer),
		github: "images/github.png",
		home_btn: "https://vignette.wikia.nocookie.net/transformice/images/4/41/Menu_icon.png/revision/latest/scale-to-width-down/75?cb=20151223164027&t=.png",
		black_button: "images/black_button.png",
		// URBAN icons
		sac_icon: "https://www.transformice.com/images/x_deadmeat/x_interfaces/monde/zones/38.png",
		bodega_icon: "https://www.transformice.com/images/x_deadmeat/x_interfaces/monde/zones/45.png",
		santa_icon: "https://www.transformice.com/images/x_deadmeat/x_interfaces/monde/zones/46.png",
		mazon_icon: "https://www.transformice.com/images/x_deadmeat/x_interfaces/monde/zones/10.png",
		mall_icon: "https://www.transformice.com/images/x_deadmeat/x_interfaces/monde/zones/11.png",
		// DESERT icons
		walker_icon: "https://www.transformice.com/images/x_deadmeat/x_interfaces/monde/zones/15.png",
		museum_icon: "https://www.transformice.com/images/x_deadmeat/x_interfaces/monde/zones/39.png",
		highway_icon: "https://www.transformice.com/images/x_deadmeat/x_interfaces/monde/zones/49.png",
		mesa_icon: "https://www.transformice.com/images/x_deadmeat/x_interfaces/monde/zones/63.png",
		// Maps
		sac_map: Manifest.VIGNETTE_BASE+"/9/95/Sacramento_Suburbs_map.png/revision/latest/scale-to-width-down/10000?cb=20180225223817&t=.png",
		bodega_map: Manifest.VIGNETTE_BASE+"/a/a4/Bodega_Bay_map.png/revision/latest/scale-to-width-down/10000?cb=20180506075130&t=.png",
		santa_map: Manifest.VIGNETTE_BASE+"/2/29/Downtown_Santa_Rosa_map.png/revision/latest/scale-to-width-down/10000?cb=20180225223817&t=.png",
		mazon_map: Manifest.VIGNETTE_BASE+"/1/1d/Mazon_College_map.png/revision/latest/scale-to-width-down/10000?cb=20180217173501&t=.png",
		mall_map: Manifest.VIGNETTE_BASE+"/9/94/Sunset_Mall_map.png/revision/latest/scale-to-width-down/10000?cb=20180128180227&t=.png",
		walker_map: Manifest.VIGNETTE_BASE+"/7/73/Walker_River_map.png/revision/latest/scale-to-width-down/10000?cb=20180215195419&t=.png",
		museum_map: Manifest.VIGNETTE_BASE+"/7/73/Arizona_Jurassic_Museum_map.png/revision/latest/scale-to-width-down/10000?cb=20180304145247&t=.png",
		highway_map: Manifest.VIGNETTE_BASE+"/b/bc/Highway_99_map.png/revision/latest/scale-to-width-down/10000?cb=20180309011141&t=.png",
		mesa_map: Manifest.VIGNETTE_BASE+"/f/fa/Blue_Mesa_map.png/revision/latest/scale-to-width-down/10000?cb=20180323133818&t=.png",
	};
	
	static readonly assetPacks : { [packname:string]:ManifestPackData; } = {
		preload: ["avatar"],
		initial: ["github",
			"sac_icon", "bodega_icon", "santa_icon", "mazon_icon", "mall_icon",
			"walker_icon", "museum_icon", "highway_icon", "mesa_icon",
		],
		map: ["home_btn", "black_button"],
		// Maps
		zone_sac: ["sac_map"],
		zone_bodega: ["bodega_map"],
		zone_santa: ["santa_map"],
		zone_mazon: ["mazon_map"],
		zone_mall: ["mall_map"],
		zone_walker: ["walker_map"],
		zone_museum: ["museum_map"],
		zone_highway: ["highway_map"],
		zone_mesa: ["mesa_map"],
	};
	
	// static getDataList(pAssetNames:string[]) : ManifestPackData {
	// 	let tList = [];
	// 	for(var i = 0; i < pAssetNames.length; i++) {
	// 		tList.push({ id:pAssetNames[i], src:Manifest.assets[ pAssetNames[i] ] });
	// 	}
	// 	pAssetNames = null;
	// 	return tList;
	// }
}