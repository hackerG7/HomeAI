
function setBrightness(level){
    sendMsg("setBrightness",{level:level})
};
function addBrightnessCommands(){
    var Commands = [
		{
			description:"Setbrightness",
			smart:true, // a Smart command allow you to use wildcard in order to retrieve words that the user should say
			// Ways to trigger the command with the voice
            indexes:["光*","亮*"],
			// Do something when the commands is triggered
			action:function(i,wildcard){
                console.log("light commands: "+wildcard.trim());
                var database = setWords;
                var found = checkWord(wildcard, database);
                if(found){
                    var level = findFloat(wildcard);
                   // console.log(parseFloat(wildcard.trim()))
                    setBrightness(level/100);
                    if(level==0){
                        artyom.say("亮度已為最低");
                    }else if(level==1){
                        artyom.say("亮度已為最高");
                    }else{  
                        artyom.say("亮度已為"+level+"%");
                        console.log("setted: "+level);
                    }
                }
					
			}
				
			
		}
	];
	
	artyom.addCommands(Commands); 
}