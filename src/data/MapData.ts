interface MapData {
	mapAsset:string,
	iconAsset:string,
	spawnX:number,
	spawnY:number,
	spawnTileX:number,
	spawnTileY:number,
	loadList:(string|{ id:string, src:string })[],
	scale:number,
}