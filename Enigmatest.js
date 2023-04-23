let Machine1 = new EnigmaMachine();
window.addEventListener("keydown", (e) => {
	draw();
	Highlightpath(Machine1.encodeChar(e.key.toUpperCase()));
});
