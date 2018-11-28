import ConstantsApp from "../app/ConstantsApp";
import ParticleEmitter from "../display/ParticleEmitter";
import ScreenBase from "../fewfre/screens/ScreenBase";
import Sprite from "../fewfre/display/Sprite";
import FillSprite from "../fewfre/display/FillSprite";
import TextSprite from "../fewfre/display/TextSprite";
import Mouse from "../fewfre/input/Mouse";
import GearSprite from "../display/GearSprite";

export default class LoadingScreen extends ScreenBase
{
	_bg : FillSprite;
	_spinner : Sprite;
	_loadingText : TextSprite;
	
	_spinnerParticleTray : Sprite;
	// _spinnerParticleEmitter : ParticleEmitter;
	_particleEmitter : ParticleEmitter;
	_cornerEmitters : ParticleEmitter[];
	
	protected _buildScreen() : void {
		this._bg = this.spriteManager.add(new FillSprite({ color:0, width:ConstantsApp.STAGE_WIDTH*1.5, height:ConstantsApp.STAGE_HEIGHT*1.5, x:ConstantsApp.STAGE_CENTER_X, y:ConstantsApp.STAGE_CENTER_Y, alpha:0.5 }));
		this._particleEmitter = this.spriteManager.add(new ParticleEmitter({ vx:250, vy:250, spawnSpeed:0.05 }));
		
		let vx = 145, vy = 145, spawnSpeed = 0.3, offset = 115;
		this._cornerEmitters = [
			this.spriteManager.add(new ParticleEmitter({ x:offset, y:offset, color:"lightgreen", vx:vx, vy:vy, spawnSpeed:spawnSpeed, alpha:0.5 })),
			this.spriteManager.add(new ParticleEmitter({ x:offset, y:ConstantsApp.STAGE_HEIGHT - offset, color:"yellow", vx:vx, vy:vy, spawnSpeed:spawnSpeed, alpha:0.5 })),
			this.spriteManager.add(new ParticleEmitter({ x:ConstantsApp.STAGE_WIDTH - offset, y:offset, color:"aquamarine", vx:vx, vy:vy, spawnSpeed:spawnSpeed, alpha:0.5 })),
			this.spriteManager.add(new ParticleEmitter({ x:ConstantsApp.STAGE_WIDTH - offset, y:ConstantsApp.STAGE_HEIGHT - offset, color:"darkolivegreen", vx:vx, vy:vy, spawnSpeed:spawnSpeed, alpha:0.5 })),
		];
		
		this._spinnerParticleTray = this.spriteManager.add(new Sprite({  }));
		this._spinnerParticleTray.add(new ParticleEmitter({ x:ConstantsApp.STAGE_CENTER_X, y:ConstantsApp.STAGE_CENTER_Y, color:"grey", vx:250, vy:25, spawnSpeed:0.05, alpha:0.5 }));
		this._spinnerParticleTray.add(new ParticleEmitter({ x:ConstantsApp.STAGE_CENTER_X, y:ConstantsApp.STAGE_CENTER_Y, color:"grey", vx:250, vy:25, spawnSpeed:0.05, alpha:0.5, rotation:45 }));
		this._spinnerParticleTray.add(new ParticleEmitter({ x:ConstantsApp.STAGE_CENTER_X, y:ConstantsApp.STAGE_CENTER_Y, color:"grey", vx:250, vy:25, spawnSpeed:0.05, alpha:0.5, rotation:90 }));
		this._spinnerParticleTray.add(new ParticleEmitter({ x:ConstantsApp.STAGE_CENTER_X, y:ConstantsApp.STAGE_CENTER_Y, color:"grey", vx:250, vy:25, spawnSpeed:0.05, alpha:0.5, rotation:135 }));
		
		this._spinner = this.spriteManager.add(new GearSprite({ x:ConstantsApp.STAGE_CENTER_X, y:ConstantsApp.STAGE_CENTER_Y }));
		this._loadingText = this.spriteManager.add(new TextSprite({ text:"Loading...", x:ConstantsApp.STAGE_CENTER_X, y:ConstantsApp.STAGE_CENTER_Y + 115, fontSize:25 }));
	}
	onResize(pOldWidth:number, pOldHeight:number) : void {
		this._bg.to(ConstantsApp.STAGE_CENTER_X, ConstantsApp.STAGE_CENTER_Y);
		this._bg.setSize(ConstantsApp.STAGE_WIDTH*1.5, ConstantsApp.STAGE_HEIGHT*1.5);
		
		this._spinner.to(ConstantsApp.STAGE_CENTER_X, ConstantsApp.STAGE_CENTER_Y);
		this._loadingText.to(ConstantsApp.STAGE_CENTER_X, ConstantsApp.STAGE_CENTER_Y+115);
		
		this._spinnerParticleTray.children.forEach(obj => {
			obj.to(ConstantsApp.STAGE_CENTER_X, ConstantsApp.STAGE_CENTER_Y);
		});
		
		let offset = 115;
		this._cornerEmitters[0].to(offset, offset);
		this._cornerEmitters[1].to(offset, ConstantsApp.STAGE_HEIGHT - offset);
		this._cornerEmitters[2].to(ConstantsApp.STAGE_WIDTH - offset, offset);
		this._cornerEmitters[3].to(ConstantsApp.STAGE_WIDTH - offset, ConstantsApp.STAGE_HEIGHT - offset);
	}
	dispose() : void {
		super.dispose();
		this._bg = null;
		this._spinner = null;
		this._loadingText = null;
		
		this._spinnerParticleTray = null;
		this._particleEmitter = null;
		this._cornerEmitters = null;
	}
	update(dt:number) : void {
		super.update(dt);
		this._spinner.rotation += 90 * dt;
		this._spinnerParticleTray.rotation += 90 * dt;
		
		this._particleEmitter.spawnLocTo(Mouse.mouseX, Mouse.mouseY);
	}
}