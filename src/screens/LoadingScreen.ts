import Sprite from "../display/Sprite";
import FillSprite from "../display/FillSprite";
import ConstantsApp from "../app/ConstantsApp";
import ScreenBase from "./ScreenBase";
import CustomSprite from "../display/CustomSprite";
import ParticleEmitter from "../display/ParticleEmitter";
import Mouse from "../utils/Mouse";
import TextSprite from "../display/TextSprite";

export default class LoadingScreen extends ScreenBase
{
	spinner : Sprite;
	_particleEmitter : ParticleEmitter;
	
	protected _buildScreen() : void {
		this.spriteManager.add(new FillSprite({ color:0, width:ConstantsApp.STAGE_WIDTH*1.5, height:ConstantsApp.STAGE_HEIGHT*1.5, x:ConstantsApp.STAGE_CENTER_X, y:ConstantsApp.STAGE_CENTER_Y, alpha:0.5 }));
		this._particleEmitter = this.spriteManager.add(new ParticleEmitter({ vx:250, vy:250, spawnSpeed:0.1 }));
		
		let vx = 145, vy = 145, spawnSpeed = 0.3, offset = 115;
		this.spriteManager.add(new ParticleEmitter({ x:offset, y:offset, color:"lightgreen", vx:vx, vy:vy, spawnSpeed:spawnSpeed, alpha:0.5 }));
		this.spriteManager.add(new ParticleEmitter({ x:offset, y:ConstantsApp.STAGE_HEIGHT - offset, color:"yellow", vx:vx, vy:vy, spawnSpeed:spawnSpeed, alpha:0.5 }));
		this.spriteManager.add(new ParticleEmitter({ x:ConstantsApp.STAGE_WIDTH - offset, y:offset, color:"aquamarine", vx:vx, vy:vy, spawnSpeed:spawnSpeed, alpha:0.5 }));
		this.spriteManager.add(new ParticleEmitter({ x:ConstantsApp.STAGE_WIDTH - offset, y:ConstantsApp.STAGE_HEIGHT - offset, color:"darkolivegreen", vx:vx, vy:vy, spawnSpeed:spawnSpeed, alpha:0.5 }));
		this.spriteManager.add(new ParticleEmitter({ x:ConstantsApp.STAGE_CENTER_X, y:ConstantsApp.STAGE_CENTER_Y, color:"grey", vx:vx*2, vy:vy*2, spawnSpeed:spawnSpeed/2.5, alpha:0.5 }));
		
		this.spinner = this.spriteManager.add(new CustomSprite({ x:ConstantsApp.STAGE_CENTER_X, y:ConstantsApp.STAGE_CENTER_Y, draw:(ctx)=>{
			let strokeWidth = 3;
			
			ctx.beginPath();
			ctx.arc(0, 0, 35, 0, 2 * Math.PI, false);
			ctx.lineWidth = 20;
			ctx.strokeStyle = 'darkgrey';
			ctx.stroke();
			
			ctx.beginPath();
			ctx.arc(0, 0, 35, 0, 2 * Math.PI, false);
			ctx.lineWidth = 20-(strokeWidth*2);
			ctx.strokeStyle = 'grey';
			ctx.stroke();
			
			// Now draw pegs of gear
			ctx.lineWidth = strokeWidth;
			ctx.strokeStyle="darkgrey";
			ctx.fillStyle="grey";
			
			let size = 20, sizeH = size*0.5, xx = 45 - strokeWidth*1.5;
			for(var i = 0; i < 8; i++) {
				ctx.rotate(45*i*ConstantsApp.DEG2RAD);
				ctx.beginPath();
				ctx.moveTo(xx,-sizeH);
				ctx.lineTo(xx+size,-sizeH);
				ctx.lineTo(xx+size,sizeH);
				ctx.lineTo(xx,sizeH);
				ctx.fill();
				ctx.stroke();
			}
		} }));
		this.spriteManager.add(new TextSprite({ text:"Loading...", x:ConstantsApp.STAGE_CENTER_X, y:ConstantsApp.STAGE_CENTER_Y + 115, fontSize:25 }));
	}
	update(dt:number) : void {
		super.update(dt);
		this.spinner.rotation += 90 * dt;
		
		this._particleEmitter.spawnLocTo(Mouse.mouseX, Mouse.mouseY);
	}
	dispose() : void {
		super.dispose();
	}
}