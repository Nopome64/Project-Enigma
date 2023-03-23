const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//rotates string right
String.prototype.rotate = function (i) {
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
			rotorPositions: [0, 0, 0, 0],
			ringPosition: [0, 0, 0, 0],
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
		function enclod(fromalpha, toalpha, char) {
			return toalpha[fromalpha.indexOf(char)];
		}
		char = enclod(alphabet, this.config.rotors.rotorRight, char);
		char = enclod(alphabet, this.config.rotors.rotorMid, char);
		char = enclod(alphabet, this.config.rotors.rotorLeft, char);
		char = enclod(alphabet, this.config.rotors.reflector, char);
		char = enclod(this.config.rotors.rotorLeft, alphabet, char);
		char = enclod(this.config.rotors.rotorMid, alphabet, char);
		char = enclod(this.config.rotors.rotorRight, alphabet, char);
		return char;
	}

	reset() {
		this.state.rotorPositions = [0, 0, 0, 0];
		this.state.ringPositions = [0, 0, 0, 0];
	}
}
