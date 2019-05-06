//----------------------------------------
//			VARIABLE INITIALIZATION
//----------------------------------------

// Canvas Variables
var c = document.getElementById("canvas");
var canv = c.getContext("2d");

// Button Variables
var btnGenerate = document.getElementById("btnGenerate");

var btnToggle1 = document.getElementById("btnToggle1");
var btnToggle2 = document.getElementById("btnToggle2");
var btnToggle3 = document.getElementById("btnToggle3");
var btnToggle4 = document.getElementById("btnToggle4");

//----------------------------------------
//			INITIALIZATION
//----------------------------------------

// layer data
var layers = [
	{
		set: [],
		max: 200,
		min: 20,
		interval: 8,
		calcLayer: true,
		renderLayer: true,
		color: "#AFAFEF",
		dotSize: 5
	},
	{
		set: [],
		max: 160,
		min: 40,
		interval: 4,
		calcLayer: true,
		renderLayer: true,
		color: "#99EE99",
		dotSize: 4
	},
	{
		set: [],
		max: 140,
		min: 60,
		interval: 2,
		calcLayer: true,
		renderLayer: true,
		color: "#FFCC66",
		dotSize: 3
	},
	{
		set: [],
		max: 120,
		min: 80,
		interval: 1,
		calcLayer: true,
		renderLayer: true,
		color: "#FF9999",
		dotSize: 2,
	}
];

appController = {
	totals: [],
	perlin: [],
	color: "#000",
	numDataPoints: 80
}

// Set up canvas ruler Guides
const CANV_WIDTH					= c.width;
drawGuides();

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

//----------------------------------------
//			Grid Rendering
//----------------------------------------

function clearChart(){
	canv.clearRect(0, 0, 800, 200);
	drawGuides();
}

function drawGuides(){
	canv.beginPath()
	canv.font = "9px Arial"
	canv.strokeStyle = "#DDDDFF";

	for (var i = 0; i <= 200; i += 20) {
		canv.moveTo(0, i - 0.5);
		canv.lineTo(800, i - 0.5);
		canv.stroke();
	}

	for (var i = 0; i <= 800; i += 20) {
		canv.moveTo(i + 0.5, 200);
		canv.lineTo(i + 0.5, 0);
		canv.stroke();
	}

	canv.beginPath()
	canv.strokeStyle = "#000000";

	for (var i = 0; i <= 200; i += 20) {
		canv.moveTo(0, i - 0.5);
		canv.lineTo(10, i - 0.5);
		canv.stroke();
		canv.fillText(200 - i, 11, i+2)
	}	

	for (var i = 0; i <= CANV_WIDTH; i += 20) {
		canv.moveTo(i + 0.5, 200);
		canv.lineTo(i + 0.5, 190);
		canv.stroke();
		canv.fillText(i * (appController.numDataPoints / CANV_WIDTH),i + 2, 199)
	}
}

//----------------------------------------
//			Data Generation
//----------------------------------------

function generatePerlin() {
	/*	P = ((maxA-minA) * (A[i] + B[i] + C[i] ...) / maxTotal) - minA	*/

	generateLayerData();
	perlin(layers);
	renderPerlin();
}

function generateLayerData() {
	// generate individual layer data
	layers.forEach(function(e){
		e.set = generateLayer(e);
	})
}

function perlin(objectX) {
	for (var i = 0; i <= appController.numDataPoints; i++) {
		appController.totals[i] = 0;

		objectX.forEach(function(e){
			if (e.calcLayer) {
				appController.totals[i] += e.set[i];
			}
		})
	}

	appController.perlin = perlinScale(appController.totals);
}

function renderPerlin(){	
	clearChart();

	// render individual layers
	layers.forEach(function(e){
		if (e.calcLayer && e.renderLayer)
			renderLayer(e);
	})

	// render perlin
	renderTotal(appController);
}

function generateLayer(objectX) {
	var set = [];
	var nextVal = Math.floor(Math.random() * (objectX.max - objectX.min) + objectX.min);;
	var currentVal = 0.0;
	set[0] = currentVal;

	for (var i = 0; i <= appController.numDataPoints; i += 1){		
		if (i % objectX.interval == 0){
			set[i] = currentVal = nextVal;
			nextVal = Math.floor(Math.random() * (objectX.max - objectX.min) + objectX.min);
		}
		else {			
			set[i] = lerp(currentVal,nextVal,(i % objectX.interval / objectX.interval));
		}
	}

	return set;
}

function perlinScale(totals){
	var scaledSet = [];
	var totalMaxVal = 0.0;

	layers.forEach(function(e){
		if (e.calcLayer)
			totalMaxVal += e.max;
	})
	
	for (var i = 0; i <= appController.numDataPoints; i++){
		scaledSet[i] = totals[i] / totalMaxVal * 200;
	}

	return scaledSet;
}

//----------------------------------------
//			Data Rendering
//----------------------------------------

function renderLayer(objectX) {
	canv.beginPath();

	// start line
	canv.strokeStyle = objectX.color;
	canv.moveTo(0, objectX.set[0]);

	// draw line
	for (var i = 0; i <= appController.numDataPoints; i += objectX.interval) {
		canv.lineTo(i*(CANV_WIDTH/appController.numDataPoints), 200 - objectX.set[i]);		
	}
	canv.stroke();
	
	// draw dot
	canv.fillStyle = objectX.color;
	for (var i = 0; i <= appController.numDataPoints; i += objectX.interval) {
		canv.beginPath();
		canv.arc(i * (CANV_WIDTH / appController.numDataPoints), 200 - objectX.set[i], objectX.dotSize, 2, 360);
		canv.fill();
	}
}

function renderTotal(objectY) {
	canv.beginPath();
	canv.strokeStyle = appController.color;
	canv.moveTo(0, objectY.perlin[0]);

	for (var i = 0; i <= appController.numDataPoints; i += 1) {
		canv.lineTo(i * (CANV_WIDTH / appController.numDataPoints), 200 - objectY.perlin[i]);		
	}

	canv.stroke();	
	canv.fillStyle = appController.color;

	for (var i = 0; i <= appController.numDataPoints; i += 1) {
		canv.beginPath();
		canv.arc(i * (CANV_WIDTH / appController.numDataPoints), 200 - objectY.perlin[i], 2, 2, 360);
		canv.fill();
	}
}

function lerp(a,b,f) 
{	
	return a  - (f * a) + (f * b);
}