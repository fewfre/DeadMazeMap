import ConstantsApp from "../app/ConstantsApp";
import ParticleEmitter from "../display/ParticleEmitter";
import ScreenBase from "../fewfre/screens/ScreenBase";
import Sprite from "../fewfre/display/Sprite";
import FillSprite from "../fewfre/display/FillSprite";
import CustomSprite from "../fewfre/display/CustomSprite";
import TextSprite from "../fewfre/display/TextSprite";
import Mouse from "../fewfre/input/Mouse";
import GearSprite from "../display/GearSprite";

export default class LoadingScreen extends ScreenBase
{
	_spinner : Sprite;
	_spinnerParticleTray : Sprite;
	// _spinnerParticleEmitter : ParticleEmitter;
	_particleEmitter : ParticleEmitter;
	
	protected _buildScreen() : void {
		this.spriteManager.add(new FillSprite({ color:0, width:ConstantsApp.STAGE_WIDTH*1.5, height:ConstantsApp.STAGE_HEIGHT*1.5, x:ConstantsApp.STAGE_CENTER_X, y:ConstantsApp.STAGE_CENTER_Y, alpha:0.5 }));
		this._particleEmitter = this.spriteManager.add(new ParticleEmitter({ vx:250, vy:250, spawnSpeed:0.05 }));
		
		let vx = 145, vy = 145, spawnSpeed = 0.3, offset = 115;
		this.spriteManager.add(new ParticleEmitter({ x:offset, y:offset, color:"lightgreen", vx:vx, vy:vy, spawnSpeed:spawnSpeed, alpha:0.5 }));
		this.spriteManager.add(new ParticleEmitter({ x:offset, y:ConstantsApp.STAGE_HEIGHT - offset, color:"yellow", vx:vx, vy:vy, spawnSpeed:spawnSpeed, alpha:0.5 }));
		this.spriteManager.add(new ParticleEmitter({ x:ConstantsApp.STAGE_WIDTH - offset, y:offset, color:"aquamarine", vx:vx, vy:vy, spawnSpeed:spawnSpeed, alpha:0.5 }));
		this.spriteManager.add(new ParticleEmitter({ x:ConstantsApp.STAGE_WIDTH - offset, y:ConstantsApp.STAGE_HEIGHT - offset, color:"darkolivegreen", vx:vx, vy:vy, spawnSpeed:spawnSpeed, alpha:0.5 }));
		
		this._spinnerParticleTray = this.spriteManager.add(new Sprite({  }));
		this._spinnerParticleTray.add(new ParticleEmitter({ x:ConstantsApp.STAGE_CENTER_X, y:ConstantsApp.STAGE_CENTER_Y, color:"grey", vx:250, vy:25, spawnSpeed:0.05, alpha:0.5 }));
		this._spinnerParticleTray.add(new ParticleEmitter({ x:ConstantsApp.STAGE_CENTER_X, y:ConstantsApp.STAGE_CENTER_Y, color:"grey", vx:250, vy:25, spawnSpeed:0.05, alpha:0.5, rotation:45 }));
		this._spinnerParticleTray.add(new ParticleEmitter({ x:ConstantsApp.STAGE_CENTER_X, y:ConstantsApp.STAGE_CENTER_Y, color:"grey", vx:250, vy:25, spawnSpeed:0.05, alpha:0.5, rotation:90 }));
		this._spinnerParticleTray.add(new ParticleEmitter({ x:ConstantsApp.STAGE_CENTER_X, y:ConstantsApp.STAGE_CENTER_Y, color:"grey", vx:250, vy:25, spawnSpeed:0.05, alpha:0.5, rotation:135 }));
		
		this._spinner = this.spriteManager.add(new GearSprite({ x:ConstantsApp.STAGE_CENTER_X, y:ConstantsApp.STAGE_CENTER_Y }));
		this.spriteManager.add(new TextSprite({ text:"Loading...", x:ConstantsApp.STAGE_CENTER_X, y:ConstantsApp.STAGE_CENTER_Y + 115, fontSize:25 }));
	}
	dispose() : void {
		super.dispose();
		this._spinner = null;
		this._spinnerParticleTray = null;
		this._particleEmitter = null;
	}
	update(dt:number) : void {
		super.update(dt);
		this._spinner.rotation += 90 * dt;
		this._spinnerParticleTray.rotation += 90 * dt;
		
		this._particleEmitter.spawnLocTo(Mouse.mouseX, Mouse.mouseY);
	}
}