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
		id: "layer1",
		color: "#AFAFEF",
		interval: 8,
		dotSize: 5,
		min: 20,
		max: 200,
		set: [],
		calcLayer: true
	},
	{
		id: "layer2",
		color: "#99EE99",
		interval: 4,
		dotSize: 4,
		min: 40,
		max: 160,
		set: [],
		calcLayer: true
	},
	{
		id: "layer3",
		color: "#FFCC66",
		interval: 2,
		dotSize: 3,
		min: 60,
		max: 140,
		set: [],
		calcLayer: true
	},
	{
		id: "layer4",
		color: "#FF9999",
		interval: 1,
		dotSize: 2,
		min: 80,
		max: 120,
		set: [],
		calcLayer: true
	}
];

appController = {
	renderLayers: [true,true,true,true],
	calcLayers: [true,true,true,true],
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
	// layers[0].calcLayer = !layers[0].calcLayer;
	// perlin();
});

btnToggle2.addEventListener("click", function(){
	// console.log("Toggle2");
});

btnToggle3.addEventListener("click", function(){
	// console.log("Toggle3");
});

btnToggle4.addEventListener("click", function(){
	// console.log("Toggle4");
});

//----------------------------------------
//			Grid Rendering
//----------------------------------------

function clearChart(){
	canv.clearRect(0,0,800,200);
	drawGuides();
}

function drawGuides(){
	canv.beginPath()
	canv.font = "9px Arial"
	canv.strokeStyle = "#DDDDFF";

	for (var i = 0; i <= 200; i+=20) {
		canv.moveTo(0,i-.5);
		canv.lineTo(800,i-.5);
		canv.stroke();
	}

	for (var i = 0; i <= 800; i+=20) {
		canv.moveTo(i+.5,200);
		canv.lineTo(i+.5,0);
		canv.stroke();
	}

	canv.beginPath()
	canv.strokeStyle = "#000000";

	for (var i = 0; i <= 200; i+=20) {
		canv.moveTo(0,i-.5);
		canv.lineTo(10,i-.5);
		canv.stroke();
		canv.fillText(200-i,11,i+2)
	}	

	for (var i = 0; i <= CANV_WIDTH; i+=20) {
		canv.moveTo(i+.5,200);
		canv.lineTo(i+.5,190);
		canv.stroke();
		canv.fillText(i*(appController.numDataPoints/CANV_WIDTH),i+2,199)
	}
}

//----------------------------------------
//			Data Generation
//----------------------------------------

function generatePerlin() {
	/*
		P = ((maxA-minA) * (A[i] + B[i] + C[i] ...) / maxTotal) - minA
	*/

	generateLayerData();
	perlin(layers);
	renderPerlin();
}

function generateLayerData() {
	// generate individual layer data
	layers.forEach(function(e){
		e.set = generateLayer_wLerp(e);
	})
}

function perlin(objectX) {
	for (var i = 0; i <= appController.numDataPoints; i+=1) {
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
		renderLayer(e);
	})
	// render perlin
	renderTotal(appController);
}

function generateLayer_wLerp(objectX) {
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
	console.log(totals);
	for (var i = 0; i <= appController.numDataPoints; i++){
		scaledSet[i] = totals[i]/totalMaxVal*200;
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
	for (var i = 0; i <= appController.numDataPoints; i+=objectX.interval) {
		canv.lineTo(i*(CANV_WIDTH/appController.numDataPoints),200-objectX.set[i]);		
	}
	canv.stroke();
	
	// draw dot
	canv.fillStyle = objectX.color;
	for (var i = 0; i <= appController.numDataPoints; i+=objectX.interval) {
		canv.beginPath();
		canv.arc(i*(CANV_WIDTH/appController.numDataPoints), 200-objectX.set[i], objectX.dotSize, 2, 360);
		canv.fill();
	}
}

function renderTotal(objectY) {
	canv.beginPath();
	canv.strokeStyle = appController.color;
	canv.moveTo(0, objectY.perlin[0]);

	for (var i = 0; i <= appController.numDataPoints; i+=1) {
		canv.lineTo(i*(CANV_WIDTH/appController.numDataPoints),200-objectY.perlin[i]);		
	}
	canv.stroke();
	
	canv.fillStyle = appController.color;
	for (var i = 0; i <= appController.numDataPoints; i+=1) {
		canv.beginPath();
		canv.arc(i*(CANV_WIDTH/appController.numDataPoints), 200-objectY.perlin[i], 2, 2, 360);
		canv.fill();
	}
}

function lerp(a,b,f) 
{	
	return a  - (f * a) + (f * b);
}