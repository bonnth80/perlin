// Button Variables
var btnGenerate = document.getElementById("btnGenerate");

var btnToggle1 = document.getElementById("btnToggle1");
var btnToggle2 = document.getElementById("btnToggle2");
var btnToggle3 = document.getElementById("btnToggle3");
var btnToggle4 = document.getElementById("btnToggle4");

//----------------------------------------
//			BUTTON FUNCTIONS
//----------------------------------------

// Generate
btnGenerate.addEventListener("click", generatePerlin);

// Toggles
btnToggle1.addEventListener("click", function(){
	layers[0].calcLayer = !layers[0].calcLayer;
	perlin(layers);
	renderPerlin();
});

btnToggle2.addEventListener("click", function(){
	layers[1].calcLayer = !layers[1].calcLayer;
	perlin(layers);
	renderPerlin();
});

btnToggle3.addEventListener("click", function(){
	layers[2].calcLayer = !layers[2].calcLayer;
	perlin(layers);
	renderPerlin();
});

btnToggle4.addEventListener("click", function(){
	layers[3].calcLayer = !layers[3].calcLayer;
	perlin(layers);
	renderPerlin();
});