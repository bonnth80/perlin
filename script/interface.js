// Button Variables
var btnGenerate = document.getElementById("btnGenerate");

var btnToggle1 = document.getElementById("btnToggle1");
var btnToggle2 = document.getElementById("btnToggle2");
var btnToggle3 = document.getElementById("btnToggle3");
var btnToggle4 = document.getElementById("btnToggle4");

var btnShow1 = document.getElementById("btnShow1");
var btnShow2 = document.getElementById("btnShow2");
var btnShow3 = document.getElementById("btnShow3");
var btnShow4 = document.getElementById("btnShow4");

//----------------------------------------
//			BUTTON FUNCTIONS
//----------------------------------------

// Generate
btnGenerate.addEventListener("click", generatePerlin);

// Toggles
btnToggle1.addEventListener("click", function(){
   layers[0].calcLayer = !layers[0].calcLayer;
   
   if (layers[0].calcLayer)
      this.style.backgroundColor = "#fffa66";
   else
      this.style.backgroundColor = "#c5c4b8"

	perlin(layers);
	renderPerlin();
});

btnToggle2.addEventListener("click", function(){
   layers[1].calcLayer = !layers[1].calcLayer;
   
   if (layers[1].calcLayer)
      this.style.backgroundColor = "#fffa66";
   else
      this.style.backgroundColor = "#c5c4b8"

	perlin(layers);
	renderPerlin();
});

btnToggle3.addEventListener("click", function(){
	layers[2].calcLayer = !layers[2].calcLayer;
   
   if (layers[2].calcLayer)
      this.style.backgroundColor = "#fffa66";
   else
      this.style.backgroundColor = "#c5c4b8"

	perlin(layers);
	renderPerlin();
});

btnToggle4.addEventListener("click", function(){
	layers[3].calcLayer = !layers[3].calcLayer;
   
   if (layers[3].calcLayer)
      this.style.backgroundColor = "#fffa66";
   else
      this.style.backgroundColor = "#c5c4b8"

	perlin(layers);
	renderPerlin();
});

// Show / Hide
btnShow1.addEventListener("click", function(){
   layers[0].renderLayer = !layers[0].renderLayer;
   
   if (layers[0].renderLayer)
      this.style.backgroundColor = "#fffa66";
   else
      this.style.backgroundColor = "#c5c4b8"

	perlin(layers);
	renderPerlin();
});

btnShow2.addEventListener("click", function(){
   layers[1].renderLayer = !layers[1].renderLayer;
   
   if (layers[1].renderLayer)
      this.style.backgroundColor = "#fffa66";
   else
      this.style.backgroundColor = "#c5c4b8"

	perlin(layers);
	renderPerlin();
});

btnShow3.addEventListener("click", function(){
	layers[2].renderLayer = !layers[2].renderLayer;
   
   if (layers[2].renderLayer)
      this.style.backgroundColor = "#fffa66";
   else
      this.style.backgroundColor = "#c5c4b8"

	perlin(layers);
	renderPerlin();
});

btnShow4.addEventListener("click", function(){
	layers[3].renderLayer = !layers[3].renderLayer;
   
   if (layers[3].renderLayer)
      this.style.backgroundColor = "#fffa66";
   else
      this.style.backgroundColor = "#c5c4b8"

	perlin(layers);
	renderPerlin();
});