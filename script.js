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

var btnInclude1 = document.getElementById("btnInclude1");
var btnInclude2 = document.getElementById("btnInclude2");
var btnInclude3 = document.getElementById("btnInclude3");
var btnInclude4 = document.getElementById("btnInclude4");


//----------------------------------------
//			INITIALIZATION
//----------------------------------------
// Set up canvas ruler Guides
const L1_COLOR						= "#8888DD";
const L1_INTERVAL 				= 8;
const L1_MIN							= 0;
const L1_MAX							= 200;
var set1									= [];

const L2_COLOR						= "#55DD55";
const L2_INTERVAL 				= 4;
const L2_MIN							= 40;
const L2_MAX							= 160;
var set2									= [];

const L3_COLOR						= "#EEAA33";
const L3_INTERVAL 				= 2;
const L3_MIN							= 80;
const L3_MAX							= 140;
var set3									= [];

const L4_COLOR						= "#EE6666";
const L4_INTERVAL 				= 1;
const L4_MIN							= 100;
const L4_MAX							= 120;
var set4									= [];

const TOT_COLOR						= "black";
var setTotals							= [];
var perlinSetData					= [set1,set2,set3,set4,setTotals];

const NUM_DATA_POINTS			= 80;
const CANV_WIDTH					= c.width;

drawGuides();


//----------------------------------------
//			BUTTON FUNCTIONS
//----------------------------------------

// Generate
btnGenerate.addEventListener("click", function(){
	console.log("Generate");
	clearChart();

	set1 = generateLayer(L1_INTERVAL, L1_MIN, L1_MAX);
	set2 = generateLayer(L2_INTERVAL, L2_MIN, L2_MAX);
	set3 = generateLayer(L3_INTERVAL, L3_MIN, L3_MAX);
	set4 = generateLayer(L4_INTERVAL, L4_MIN, L4_MAX);

	renderLayer4();
	renderLayer3();
	renderLayer2();
	renderLayer1();

	lerpSet(set1,L1_INTERVAL);
	lerpSet(set2,L2_INTERVAL);
	lerpSet(set3,L3_INTERVAL);

	generateTotals();
	console.log(perlinSetData);

	renderTotal();

})


// Toggles
btnToggle1.addEventListener("click", function(){
	console.log("Toggle1");
})

btnToggle2.addEventListener("click", function(){
	console.log("Toggle2");
})

btnToggle3.addEventListener("click", function(){
	console.log("Toggle3");
})

btnToggle4.addEventListener("click", function(){
	console.log("Toggle4");
})


// Includes
btnInclude1.addEventListener("click", function(){
	console.log("Include1");
})

btnInclude2.addEventListener("click", function(){
	console.log("Include2");
})

btnInclude3.addEventListener("click", function(){
	console.log("Include3");
})

btnInclude4.addEventListener("click", function(){
	console.log("Include4");
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

// function generateLayer(INTERVAL, MIN, MAX) {
// 	var set = [];
// 	for (var i = 0; i <= NUM_DATA_POINTS/INTERVAL; i+=1){
// 		var val = Math.floor(Math.random()*(MAX-MIN)+MIN);
// 		set[i] = val;
// 	}
// 	return set;
// }

function generateLayer(INTERVAL, MIN, MAX) {

	//TEMP!! Work onthis

	var set = [];
	for (var i = 0; i <= NUM_DATA_POINTS; i+=1){
		var val = Math.floor(Math.random()*(MAX-MIN)+MIN);
		if (i%INTERVAL==0)
			set[i] = val;
		else set[i] = 0;
	}
	return set;
}

function generateTotals() {
	// work on this
	for (var i = 0; i <= NUM_DATA_POINTS; i+=1) {
		perlinSetData[4][i] = set1[i]+set2[i]+set3[i]+set4[i];
	}
}

function renderLayer1() {
	console.log("rendering Layer 1");
	canv.beginPath();
	canv.strokeStyle = L1_COLOR;
	canv.moveTo(0, set1[0]);

	for (var i = 1; i <= NUM_DATA_POINTS*L1_INTERVAL; i+=1) {
		canv.lineTo(i*(CANV_WIDTH/NUM_DATA_POINTS)*L1_INTERVAL,200-set1[i]);
	}
		canv.stroke();
}

function renderLayer1() {
	console.log("rendering Layer 1");
	canv.beginPath();
	canv.strokeStyle = L1_COLOR;
	canv.moveTo(0, set1[0]);

	for (var i = 0; i <= NUM_DATA_POINTS; i+=L1_INTERVAL) {
		canv.lineTo(i*(CANV_WIDTH/NUM_DATA_POINTS),200-set1[i]);		
	}
	canv.stroke();
	
	canv.fillStyle = L1_COLOR;
	for (var i = 0; i <= NUM_DATA_POINTS; i+=L1_INTERVAL) {
		canv.beginPath();
		canv.arc(i*(CANV_WIDTH/NUM_DATA_POINTS), 200-set1[i], 5, 2, 360);
		canv.fill();
	}
}

function renderLayer2() {
	console.log("rendering Layer 2");
	canv.beginPath();
	canv.strokeStyle = L2_COLOR;
	canv.moveTo(0, set2[0]);

	for (var i = 0; i <= NUM_DATA_POINTS; i+=L2_INTERVAL) {
		canv.lineTo(i*(CANV_WIDTH/NUM_DATA_POINTS),200-set2[i]);		
	}
	canv.stroke();
	
	canv.fillStyle = L2_COLOR;
	for (var i = 0; i <= NUM_DATA_POINTS; i+=L2_INTERVAL) {
		canv.beginPath();
		canv.arc(i*(CANV_WIDTH/NUM_DATA_POINTS), 200-set2[i], 4, 2, 360);
		canv.fill();
	}
}

function renderLayer3() {
	console.log("rendering Layer 3");
	canv.beginPath();
	canv.strokeStyle = L3_COLOR;
	canv.moveTo(0, set3[0]);

	for (var i = 0; i <= NUM_DATA_POINTS; i+=L3_INTERVAL) {
		canv.lineTo(i*(CANV_WIDTH/NUM_DATA_POINTS),200-set3[i]);		
	}
	canv.stroke();
	
	canv.fillStyle = L3_COLOR;
	for (var i = 0; i <= NUM_DATA_POINTS; i+=L3_INTERVAL) {
		canv.beginPath();
		canv.arc(i*(CANV_WIDTH/NUM_DATA_POINTS), 200-set3[i], 3, 2, 360);
		canv.fill();
	}
}

function renderLayer4() {
	console.log("rendering Layer 4");
	canv.beginPath();
	canv.strokeStyle = L4_COLOR;
	canv.moveTo(0, set4[0]);

	for (var i = 0; i <= NUM_DATA_POINTS; i+=L4_INTERVAL) {
		canv.lineTo(i*(CANV_WIDTH/NUM_DATA_POINTS),200-set4[i]);		
	}
	canv.stroke();
	
	canv.fillStyle = L4_COLOR;
	for (var i = 0; i <= NUM_DATA_POINTS; i+=L4_INTERVAL) {
		canv.beginPath();
		canv.arc(i*(CANV_WIDTH/NUM_DATA_POINTS), 200-set4[i], 2, 2, 360);
		canv.fill();
	}
}

function renderTotal() {
	var totalMaxVal = L1_MAX+L2_MAX+L3_MAX+L4_MAX;
	scaledSet = scaleTotalForChart();
	console.log("rendering Totals");
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

function scaleTotalForChart(){
	var scaledSet = [];
	var totalMaxVal = L1_MAX+L2_MAX+L3_MAX+L4_MAX;

	for (var i = 0; i < NUM_DATA_POINTS; i++){
		scaledSet[i] = perlinSetData[4][i]*(200/totalMaxVal);
	}

	return scaledSet;
}

function lerp(a,b,f) 
{
    return (a * (1.0 - f)) + (b * f);
}

function lerpSet(set, interval) {
	var mySet = set;
	for (var i = 0; i < mySet.length-1; i++){
		mySet[i] = lerp(mySet[Math.floor(i/interval)*interval],mySet[Math.floor(i/interval+1)*interval],(i%interval)/interval);
		//console.log(mySet[i]);
	}
	return mySet;
}