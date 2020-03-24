//////////////////////////
var tempArray=[];
var socket = io.connect("42.3.181.159");
socket.on('temp', showTemp);
let canvas;
/////////////////////////////////
let CurrentTemp = 0;
let graphGap = 10
var tempMaxLength = (innerWidth-100)/graphGap;

//LightMode:
//0:SleepMode
//1:DiscoMode
//2:LightMode

///////////////////////////////
// This function activates artyom and will listen all that you say forever (requires https conection, otherwise a dialog will request if you allow the use of the microphone)
function showTemp(data){
	console.log(data.temp);
	CurrentTemp = data.temp;
	if(tempArray.length<tempMaxLength){
		tempArray.push(data.temp);
	}else{
		for(i = 0 ; i < tempArray.length ; i++){
		
			if(i!=tempArray.length-1){
				tempArray[i] = tempArray[i+1]
			}else{
				tempArray[i] = parseFloat(data.temp);
			}
		}
		
	}
}
function setup(){
	createCanvas(innerWidth,innerHeight)
}
function draw(){
	stroke(255)
	strokeWeight(2)
	noFill();
	textSize(55);
	background(0);
	beginShape();
	for(i = 0 ; i<tempArray.length ; i++){
		strokeWeight(2)
		stroke(255)
		vertex(i*graphGap,500-tempArray[i]*10)
		//point(i*5,200-tempArray[i]*5);
		console.log(tempArray[i])
	}
	endShape(OPEN);
	//text(CurrentTemp,innerWidth/2,innerHeight/2)
	document.getElementById("hi").innerHTML = CurrentTemp;
}
/*
function keyPressed(){
	if(keyCode == ascii('M')){
		
		//current_image = clamp_loop(current_image+1,0,2)
	}
}


function mousePressed(){
	
	
}
*/