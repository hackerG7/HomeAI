//////////////////////////
var socket = io.connect("http://localhost");
socket.on('temp', showTemp);

const artyom = new Artyom();
let canvas;
/////////////////////////////////
let CurrentTemp = 0;
let buttonList = [];
///////////////////////////////
// This function activates artyom and will listen all that you say forever (requires https conection, otherwise a dialog will request if you allow the use of the microphone)
function showTemp(data){
	console.log(data.temp);
	CurrentTemp = data.temp;
}
function startContinuousArtyom(){
    artyom.fatality();// use this to stop any of

    setTimeout(function(){// if you use artyom.fatality , wait 250 ms to initialize again.
         artyom.initialize({
            lang:"zh-HK",// A lot of languages are supported. Read the docs !
            continuous:true,// Artyom will listen forever
            listen:true, // Start recognizing
            debug:true, // Show everything in the console
			speed:2, // talk normally
			executionKeyword:"唔該"
        }).then(function(){
			console.log("Ready to work !");
			artyom.say("主人，歡迎翻黎。");

        });
    },25);
}

function setup(){
	//artyom.dontObey();
	canvas = createCanvas(innerWidth,innerHeight)
	startContinuousArtyom();
	addBackgroundCommands();
	addGeneralCommands();
	addMusicCommands();
	addBrightnessCommands();
	addDatabaseCommands();
	initClient();
	//must be lowest
	addQuestionCommands();
	//must be lowest
	
	//window.open("https://www.w3schools.com");
	//startOneCommandArtyom();
	//music = new Music("https://www.youtube.com/watch?v=ALZHF5UqnU4","alone");
	//music.Play();
	YoutubeWindow = document.getElementById("YoutubeWindow");

	console.log("hi");
	var w = innerWidth/10;
	var h = innerHeight/10;
	TemperatureButton = Button("Temperature");
	TemperatureButton.position(w, h);
	TemperatureButton.mousePressed(gotoTemperature);
	PlayButton = Button("Play")
	PlayButton.position(w, h*3);
	//TemperatureButton.mousePressed(gotoTemperature);





}
function Button(name){
	var b = createButton(name);
	b.style("font-family","Comic Sans MS");
	b.style("background-color","#e00");
	b.style("color","#fff");
	b.size(200,100)
	buttonList.push(b);
	return b;
}
function gotoTemperature(){
	window.open("temperature.html");
}
function draw(){

	BackgroundUpdate();
	stroke(255)
	//window.open("temperature.html");
	strokeWeight(2)
	fill(50);
	textSize(55)
	text(CurrentTemp,canvas.width/2,canvas.height/2)
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