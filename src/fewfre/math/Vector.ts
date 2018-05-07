// Loosely based on: https://github.com/maxkueng/victor/blob/master/build/victor.js
export default class Vector
{
	// Storage
	private static readonly DEG2RAD : number = Math.PI/180
	private static readonly RAD2DEG : number = 180/Math.PI;
	
	x : number;
	y : number;
	
	constructor(pX:number=0, pY:number=0) {
		this.x = pX;
		this.y = pY;
	}
	
	// Accessors
	get length() : number { return Math.sqrt(this.x*this.x + this.y*this.y); }
	set length(pVal:number) { this.normalize().multiplyScalar(pVal); }
	
	get angle() : number { return Math.atan2(this.y, this.x)*Vector.RAD2DEG; }
	set angle(pVal:number) { this.rotate(pVal-this.angle) }
	
	//Methods
	to(pX:number, pY:number) : this {
		this.x = pX;
		this.y = pY;
		return this;
	}
	
	rotate(pAngle:number) : this {
		pAngle *= Vector.DEG2RAD;
		this.x = (this.x * Math.cos(pAngle)) - (this.y * Math.sin(pAngle));
		this.y = (this.x * Math.sin(pAngle)) + (this.y * Math.cos(pAngle));
		return this;
	}
	
	clone() : Vector {
		return new Vector(this.x, this.y);
	}
	
	divideScalar(scalar:number) : this {
		if (scalar !== 0) {
			this.x /= scalar;
			this.y /= scalar;
		} else {
			this.x = 0;
			this.y = 0;
		}
		return this;
	}
	
	multiplyScalar(scalar:number) : this {
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}
	
	normalize() : this {
		var length = this.length;
		
		if (length === 0) {
			this.x = 1;
			this.y = 0;
		} else {
			this.divideScalar(length);
		}
		return this;
	}
}