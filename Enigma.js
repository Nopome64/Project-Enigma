/// <reference path="./rendering.js"/>

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//rotates string right
String.prototype.rotate = function (i) {
	i=Math.mod(i,this.length)
	return this.slice(-i) + this.slice(0, -i);
};
Math.mod=(n,d)=> ((n % d) + d) % d;
	
	

class EnigmaMachine {
	rotorMappings = {
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
	rotorNotches={



	}
	constructor() {
		this.state = {
			rotorPositions: [0, 0, 0],
			ringPosition: [0, 0, 0],
		};
		this.config = {
			rotors: {
				reflector: this.rotorMappings.RefB,
				rotorLeft: this.rotorMappings.III,
				rotorMid: this.rotorMappings.II,
				rotorRight: this.rotorMappings.I,
			},
		};
	}

	rotorSpin(){
		let RP = this.state.rotorPositions;

		RP[2]=Math.mod(++RP[2],alphabet.length);




		if (RP[2]===17){
			RP[1]=Math.mod(++RP[1],alphabet.length);


			if (RP[1]===22){
				RP[0]=Math.mod(++RP[0],alphabet.length);
		}



	}
	}	
	/**
	 * 
	 * @param {string} input 
	 */
	encode(input) {
		let word="";
		input=input.toUpperCase();
		for (let letter of input){
			this.rotorSpin();
			word+=this.encodeChar(letter,false);
			
		}
		this.encodeChar(input.slice(-1));
		return word;
		
	}

	encodeChar(char,highlight=true) {
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
			
			char= alphabet[alphabet.rotate(rotation).indexOf(char)];
			char= toalpha[fromalpha.indexOf(char)];
			char= alphabet[alphabet.rotate(-rotation).indexOf(char)];

			return char;
			
		}
		let RP = this.state.rotorPositions;
		let rotors = this.config.rotors;
		let path=[];

		path.push(char);
		char = enclod(alphabet,rotors.rotorRight, char,RP[2]);
		path.push(char);
		char = enclod(alphabet,rotors.rotorMid, char,RP[1]);
		path.push(char);
		char = enclod(alphabet,rotors.rotorLeft, char,RP[0]);
		path.push(char);
		char = enclod(alphabet,rotors.reflector, char);
		path.push(char);
		char = enclod(rotors.rotorLeft, alphabet, char,RP[0]);
		path.push(char);
		char = enclod(rotors.rotorMid, alphabet, char,RP[1]);
		path.push(char);
		char = enclod(rotors.rotorRight, alphabet, char,RP[2]);
		path.push(char);

		highlight && Highlightpath(path);
		
		return char;
	}

	reset() {
		this.state.rotorPositions = [0, 0, 0];
		this.state.ringPositions = [0, 0, 0];
	}
}
