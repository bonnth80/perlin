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


// Toggles
btnToggle1.addEventListener("click", function(){
	// console.log("Toggle1");
})

btnToggle2.addEventListener("click", function(){
	// console.log("Toggle2");
})

btnToggle3.addEventListener("click", function(){
	// console.log("Toggle3");
})

btnToggle4.addEventListener("click", function(){
	// console.log("Toggle4");
})


//----------------------------------------
//			INITIALIZATION
//----------------------------------------
// Set up canvas ruler Guides
var layers = {
	layer1: {
		id: "layer1",
		color: "#8888DD",
		interval: 8,
		dotSize: 5,
		min: 0,
		max: 200,
		set: []
	},
	layer2: {
		id: "layer2",
		color: "#55DD55",
		interval: 4,
		dotSize: 4,
		min: 4,
		max: 160,
		set: []
	},
	layer3: {
		id: "layer3",
		color: "#EEAA33",
		interval: 2,
		dotSize: 3,
		min: 80,
		max: 140,
		set: []
	},
	layer4: {
		id: "layer4",
		color: "#EE6666",
		interval: 1,
		dotSize: 2,
		min: 100,
		max: 120,
		set: []
	}
}


const TOT_COLOR						= "black";
var setTotals							= [];
var perlinSetData					= [layers.layer1.set,
											layers.layer2.set,
											layers.layer3.set,
											layers.layer4.set,
											setTotals];

const NUM_DATA_POINTS			= 80;
const CANV_WIDTH					= c.width;

drawGuides();


//----------------------------------------
//			BUTTON FUNCTIONS
//----------------------------------------

// Generate
btnGenerate.addEventListener("click", function(){
	// console.log("Generate");
	clearChart();

	layers.layer1.set = generateLayer(layers.layer1);
	layers.layer2.set = generateLayer(layers.layer2);
	layers.layer3.set = generateLayer(layers.layer3);
	layers.layer4.set = generateLayer(layers.layer4);

	renderLayer(layers.layer4);
	renderLayer(layers.layer3);
	renderLayer(layers.layer2);
	renderLayer(layers.layer1);
	//renderLayer1();

	lerpSetX(layers.layer1);
	lerpSetX(layers.layer2);
	lerpSetX(layers.layer3);

	generateTotals(layers);
	// console.log(perlinSetData);

	renderTotal(layers);

})

//----------------------------------------
//			FUNCTIONS
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
		canv.fillText(i*(NUM_DATA_POINTS/CANV_WIDTH),i+2,199)
	}
}

function generateLayer(objectX) {
	var set = [];
	for (var i = 0; i <= NUM_DATA_POINTS; i+=1){
		var val = Math.floor(Math.random()*(objectX.max-objectX.min)+objectX.min);
		if (i%objectX.interval==0)
			set[i] = val;
		else set[i] = 0;
	}
	return set;
}


function generateTotals(objectY) {
	for (var i = 0; i <= NUM_DATA_POINTS; i+=1) {
		perlinSetData[4][i] = objectY.layer1.set[i]
									+ objectY.layer2.set[i]
									+ objectY.layer3.set[i]
									+ objectY.layer4.set[i];
	}
}

function renderLayer(objectX) {
	// console.log ("rendering Layer: " + objectX.id);
	canv.beginPath();

	// start line
	canv.strokeStyle = objectX.color;
	canv.moveTo(0, objectX.set[0]);

	// draw line
	for (var i = 0; i <= NUM_DATA_POINTS; i+=objectX.interval) {
		canv.lineTo(i*(CANV_WIDTH/NUM_DATA_POINTS),200-objectX.set[i]);		
	}
	canv.stroke();
	
	// draw dot
	canv.fillStyle = objectX.color;
	for (var i = 0; i <= NUM_DATA_POINTS; i+=objectX.interval) {
		canv.beginPath();
		canv.arc(i*(CANV_WIDTH/NUM_DATA_POINTS), 200-objectX.set[i], objectX.dotSize, 2, 360);
		canv.fill();
	}
}

function renderTotal(objectY) {
	scaledSet = scaleTotalForChart(objectY);
	// console.log("rendering Totals");
	canv.beginPath();
	canv.strokeStyle = TOT_COLOR;
	canv.moveTo(0, scaledSet[0]);

	for (var i = 0; i <= NUM_DATA_POINTS; i+=1) {
		canv.lineTo(i*(CANV_WIDTH/NUM_DATA_POINTS),200-scaledSet[i]);		
	}
	canv.stroke();
	
	canv.fillStyle = TOT_COLOR;
	for (var i = 0; i <= NUM_DATA_POINTS; i+=1) {
		canv.beginPath();
		canv.arc(i*(CANV_WIDTH/NUM_DATA_POINTS), 200-scaledSet[i], 2, 2, 360);
		canv.fill();
	}
}

function scaleTotalForChart(objectY){
	var scaledSet = [];
	var totalMaxVal = objectY.layer1.max
						+ objectY.layer2.max
						+ objectY.layer3.max
						+ objectY.layer4.max;
	
	for (var i = 0; i < NUM_DATA_POINTS; i++){
		scaledSet[i] = perlinSetData[4][i]*(200/totalMaxVal);
	}

	return scaledSet;
}

function lerp(a,b,f) 
{
    return (a * (1.0 - f)) + (b * f);
}

function lerpSetX(objectX) {
	var mySet = objectX.set;
	for (var i = 0; i < mySet.length-1; i++){
		mySet[i] = lerp(mySet[Math.floor(i/objectX.interval)*objectX.interval],mySet[Math.floor(i/objectX.interval+1)*objectX.interval],(i%objectX.interval)/objectX.interval);
		//console.log(mySet[i]);
	}
	return mySet;
}

function lerpSet(set, interval) {
	var mySet = set;
	for (var i = 0; i < mySet.length-1; i++){
		mySet[i] = lerp(mySet[Math.floor(i/interval)*interval],mySet[Math.floor(i/interval+1)*interval],(i%interval)/interval);
		//console.log(mySet[i]);
	}
	return mySet;
}