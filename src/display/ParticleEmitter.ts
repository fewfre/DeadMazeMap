import Sprite from "../fewfre/display/Sprite";

export default class ParticleEmitter extends Sprite
{
	particles:any[];
	noOfParticles:number;
	maxParticleSize:number;
	
	spawnX:number;
	spawnY:number;
	color:any;
	spawnSpeed:number;
	vx:number;
	vy:number;
	ax:number;
	ay:number;
	
	_spawnTimer:number;
	
	constructor(pProp) {
		super(pProp);
		
		this.particles = [];
		this.noOfParticles = 2000;
		this.maxParticleSize = 5;
		this._spawnTimer = 0;
		
		this.color = pProp.color || "green";
		this.vx = pProp.vx || 0;
		this.vy = pProp.vy || 0;
		this.ax = pProp.ax || 0;
		this.ay = pProp.ay || 0;
		
		this.spawnX = 0;
		this.spawnY = 0;
		this.spawnSpeed = pProp.spawnSpeed || 0.1;
	}
	
	protected _newParticle() {
		// Create a new particle
			this.particles[this.particles.length] = {
				'id':this.particles.length,
				'x': this.x + this.spawnX, 'y': this.y + this.spawnY,
				'vx':Math.random() * this.vx - (this.vx*0.5), 'vy':Math.random() * this.vy - (this.vy*0.5),
				'ax':this.ax, 'ay':this.ay,
				'size': Math.floor( ( Math.random() * this.maxParticleSize ) + 2.5 ),
				'life': 0,
				'death': Math.random() * 200 - 5
			};
	}
	
	spawnLocTo(pX:number, pY:number) : void {
		this.spawnX = pX;
		this.spawnY = pY;
	}
	
	update(dt:number) : void {
		super.update(dt);
		
		// Update the particles
		for (var i = 0; i < this.particles.length; i++) {
			this.particles[i].vx += this.particles[i].ax * dt;
			this.particles[i].vy += this.particles[i].ay * dt;
			this.particles[i].x += this.particles[i].vx * dt;
			this.particles[i].y += this.particles[i].vy * dt;
			this.particles[i].life++;

			// Remove dead particles
			if( this.particles[i].life > this.particles[i].death ) {
				this.particles.splice(i, 1);
			}
		}
		
		// Create new particles
		this._spawnTimer -= dt;
		if(this._spawnTimer <= 0) {
			let tNum = Math.ceil(-this._spawnTimer/this.spawnSpeed);
			this._spawnTimer = this.spawnSpeed;
			for(var i = 0; i < tNum; i++) {
				if( this.particles.length < this.noOfParticles ) {
					this._newParticle();
				}
			}
		}
	}
	
	protected _customDraw(ctx:CanvasRenderingContext2D) : void {
		for (var i = 0; i < this.particles.length; i++) {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.particles[i].x,this.particles[i].y,this.particles[i].size,this.particles[i].size);
		}
	}
}