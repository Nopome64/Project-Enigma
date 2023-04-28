import { Highlightpath } from "./rendering.js";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
declare global {
	interface String {
		rotate:(i: number)=> string;
	}
}

//rotates string right
String.prototype.rotate = function (i) {
	return this.slice(-i) + this.slice(0, -i);
};
export class EnigmaMachine {
	state: {
		rotorPositions: number[];
		ringPositions: number[];
	}
	config: {
		rotors: {
			reflector: string;
			rotorLeft: string;
			rotorMid: string;
			rotorRight: string;
		}
	}
	rotormappings = {
		I: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
		II: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
		III: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
		IV: "ESOVPZJAYQUIRHXLNFTGKDCMWB",
		V: "VZBRGITYUPSDNHLXAWMJQOFECK",
		VI: "JPGVOUMFYQBENHZRDKASXLICTW",
		VII: "NZJHGRCXMYSWBOUFAIVLPEKQDT",
		VIII: "FKQHTLXOCBJSPDZRAMEWNIUYGV",
		RefA: "EJMZALYXVBWFCRQUONTSPIKHGD",
		RefB: "YRUHQSLDPXNGOKMIEBFZCWVJAT",
		RefC: "FVPJIAOYEDRZXWGCTKUQSBNMHL",
	};

	constructor() {
		this.state = {
			rotorPositions: [0, 0, 0, 0],
			ringPositions: [0, 0, 0, 0],
		};
		this.config = {
			rotors: {
				reflector: this.rotormappings.RefB,
				rotorLeft: this.rotormappings.III,
				rotorMid: this.rotormappings.II,
				rotorRight: this.rotormappings.I,
			},
		};
	}

	encode(input:string) {
		// todo
	}

	encodeChar(char:string) {
		/**
     *
     * @param {string} rotor
     * @param {string} char
     * @returns
     */
		function enclod(fromalpha:string, toalpha:string, char:string) {
			return toalpha[fromalpha.indexOf(char)];
		}
		let path=[];
		path.push(char);
		char = enclod(alphabet, this.config.rotors.rotorRight, char);
		path.push(char);
		char = enclod(alphabet, this.config.rotors.rotorMid, char);
		path.push(char);
		char = enclod(alphabet, this.config.rotors.rotorLeft, char);
		path.push(char);
		char = enclod(alphabet, this.config.rotors.reflector, char);
		path.push(char);
		char = enclod(this.config.rotors.rotorLeft, alphabet, char);
		path.push(char);
		char = enclod(this.config.rotors.rotorMid, alphabet, char);
		path.push(char);
		char = enclod(this.config.rotors.rotorRight, alphabet, char);
		path.push(char);
		console.log(path);
		Highlightpath(path);
		return char;
	}

	reset() {
		this.state.rotorPositions = [0, 0, 0, 0];
		this.state.ringPositions = [0, 0, 0, 0];
	}
}
