/// <reference path="./rendering.js"/>

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//rotates string right
String.prototype.rotate = function (i) {
	i=((i%this.length)+this.length)%this.length;
	return this.slice(-i) + this.slice(0, -i);
};
class EnigmaMachine {
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
			rotorPositions: [0, 0, 0],
			ringPosition: [0, 0, 0],
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

	encode(input) {
		// todo
	}

	encodeChar(char) {
		/**
     *
     * @param {string} rotor
     * @param {string} char
     * @returns
     */
		function enclod(fromalpha, toalpha, char,rotation) {
			// if (rotation !== 0){
			// 	enclod(alphabet,alphabet.rotate(rotation),char);
			// }
			//alternate (incomplete)method to the one below
			
			char= alphabet[alphabet.rotate(-rotation).indexOf(char)];
			char= toalpha[fromalpha.indexOf(char)];
			char= alphabet[alphabet.rotate(rotation).indexOf(char)];
			return char;
			
		}
		let RP = this.state.rotorPositions;
		let rotors = this.config.rotors;
		let path=[];
		path.push(char);
		char = enclod(alphabet,rotors.rotorRight, char,RP[2]);
		path.push(char);
		char = enclod(alphabet,rotors.rotorMid, char);
		path.push(char);
		char = enclod(alphabet,rotors.rotorLeft, char);
		path.push(char);
		char = enclod(alphabet,rotors.reflector, char);
		path.push(char);
		char = enclod(rotors.rotorLeft, alphabet, char);
		path.push(char);
		char = enclod(rotors.rotorMid, alphabet, char);
		path.push(char);
		char = enclod(rotors.rotorRight, alphabet, char,RP[2]);
		path.push(char);
		Highlightpath(path);
		return char;
	}

	reset() {
		this.state.rotorPositions = [0, 0, 0];
		this.state.ringPositions = [0, 0, 0];
	}
}
