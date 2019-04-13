class Reader {
	pos : number;
	
	constructor(public buffer:any) {
		this.buffer = buffer;
		this.pos = 0;
	}

	readBytes(nbr) {
		this.pos += nbr;
		return this.buffer.slice(this.pos-nbr, this.pos);
	}

	readU8() {
		return this.buffer[this.pos++];
	}

	readU16() {
		return this.readU8() << 8 | this.readU8();
	}

	readU32() {
		return this.readU16() << 16 | this.readU16();
	}

	readS8() {
		return (new Int8Array([this.readU8()]))[0];
	}

	readS16() {
		return (new Int8Array([this.readU16()]))[0];
	}

	readS32() {
		return (new Int8Array([this.readU32()]))[0];
	}

	readBool() {
		return this.readU8()==1;
	}
}

class Color {
	constructor(public red, public green, public blue) {}
}

class Tile {
	constructor(public x, public y, public ground, public offset, public color) {}
}

export default class World {
	tiles : Tile[][];
	constructor(public width, public height) {
		this.tiles = new Array();
	}

	static parse(buffer) {
		let reader = new Reader(buffer);
		let width = reader.readU16();
		let height = reader.readU16();
		let world = new World(width, height);
		if (!reader.readBool()) {
			// let r = new Reader(reader.readBytes(reader.readS32()));
			let r = reader;
			for (let x = 0; x<width; x++) {
				world.tiles.push(new Array());
				for (let y = 0; y<height; y++) {
					let ground_id = r.readU16();
					let y_offset = r.readS16();
					let color = new Color(r.readS8(), r.readS8(), r.readS8());
					world.tiles[x].push(new Tile(x, y, ground_id, y_offset, color));
				}
			}
		}
		return world;
	}
}