
let BackgroundMode = 0;
let CurrentDiscoBackground = 0;
let DiscoTime = 0;
let SetDiscoTime = 60;
//LightMode:
//0:SleepMode
//1:DiscoMode
//2:LightMode
//3:YoutubeMode
let setWords = ["設","刺蝟","做","set","為","變","超","進入"];
function addBackgroundCommands(){
    var BackgroundCommands = [
		{
			description:"BackgroundSetting",
			smart:true, // a Smart command allow you to use wildcard in order to retrieve words that the user should say
			// Ways to trigger the command with the voice
			indexes:["*睡眠","*黑","*disco","*party","*彩","*白","*照","*全屏幕","*全螢幕","*影片","*視頻","*電影","*觀看","*光"],
			//indexes:["熄*","熄下*","開*","開下*","背景*","背景設定*","設*","刺蝟*","做*","set*","進入*"],
			// Do something when the commands is triggered
			action:function(i,wildcard){
				var database = setWords;
				var foundWord = checkWord(wildcard,database);
				console.log("foundWord: "+foundWord);

				if(foundWord){

					switch(i){
						case 0:
						case 1:
						
							BackgroundMode = 0;//sleep mode
							artyom.say("已設為睡眠模式");
							setBrightness(0);
						break;
						

						case 2:
						case 3:
						case 4:
							BackgroundMode = 1;//party mode
							artyom.say("已設為彩色");
						break;

						case 5:
						case 6:
						case 13:
							BackgroundMode = 2;//light mode
							artyom.say("已設為照明模式");
							setBrightness(1);
						break;
						
						case 7:
						case 8:
						case 9:
						case 10://視頻
						case 11:
						case 12:
							BackgroundMode = 3;
							artyom.say("已設為影片模式");
							player.setSize(innerWidth,innerHeight);
							setBrightness(0.5);
						break;

					}
				}
			}
		}
		
	];
	
	artyom.addCommands(BackgroundCommands); 
}
function BackgroundUpdate(){
    switch(BackgroundMode){
			case 0:
				background(0);
			break;
			case 1:
				background(CurrentDiscoBackground);
				DiscoTime++;
				
				if(DiscoTime>=SetDiscoTime){
					CurrentDiscoBackground = color(random(255),random(255),random(255));
					DiscoTime = 0;
					setBrightness(0);
				}else{
					if(DiscoTime>=SetDiscoTime/2){
					
						setBrightness(0);
					}else{
						setBrightness(1);
					}
				}

			break;
			case 2:
				background(255);
				
			break;

			
			case 3:
				player.setSize(innerWidth,innerHeight);
				for(b of buttonList){
					b.hide();
					
				}
			break;
    }
    if(BackgroundMode!=1){
		DiscoTime = 0;

		}
	if(BackgroundMode!=3){
		player.setSize(1,1);
		for(b of buttonList){
			b.show();
		}
	}
}