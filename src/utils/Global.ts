import AssetManager from "./AssetManager";
import SpriteManager from "../display/SpriteManager";
import ScreenManager from "../screens/ScreenManager";

export default class Global
{
	static readonly assets : AssetManager = new AssetManager();
	static readonly screenManager : ScreenManager = new ScreenManager();
	static canvas : HTMLCanvasElement;
	static context : CanvasRenderingContext2D;
}