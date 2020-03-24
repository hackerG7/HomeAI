function checkWord(sentence,list){
	found = false;
	for(string of list){
		if(sentence.trim().includes(string)){
			found = string;
		}
	}
	return found;
}
function getFirstNumberIndex(string){
	var firstInt = 99999;
	for(var i = 0 ; i <= 9; i++){
		var integer = String(i); 
		var arrange = string.indexOf(integer);
		if(arrange<firstInt && arrange!=-1){
			firstInt = arrange;
		}

	}
	if(firstInt==99999){
		firstInt = null;
	}
	return firstInt;
}
function removeStringBeforeNumber(string){
	var i = getFirstNumberIndex(string);
	if(i!=null){
		string = string.slice(i,string.length);
	}
	return string;
}
function findFloat(string){
	string = removeStringBeforeNumber(string);
	if(getFirstNumberIndex(string)!=null){
		//found integer
		string = parseFloat(string);
	}
	return string;
}
function addGeneralCommands(){
    var GeneralCommands = [
		{
			description:"obey",
			smart:false, // a Smart command allow you to use wildcard in order to retrieve words that the user should say
			// Ways to trigger the command with the voice
			indexes:["智障","智障仔","智商"],
			// Do something when the commands is triggered
			action:function(i,wildcard){
					var r = floor(random(4));
					switch(r){
						case 0:
							artyom.say("係");
						break;
						case 1:
							artyom.say("係到");
						break;
						case 2:
							artyom.say("點");
						break;
						case 3:
							artyom.say("想點");
						break;
					}
					//console.log(this.indexes[i]);
			}
				
			
		},
		{
			description:"dontObey",
			smart:false, // a Smart command allow you to use wildcard in order to retrieve words that the user should say
			// Ways to trigger the command with the voice
			indexes:["收皮"],
			// Do something when the commands is triggered
			action:function(i,wildcard){
					var r = floor(random(4));
					switch(r){
						case 0:
							artyom.say("收到");
						break;
						case 1:
							artyom.say("好");
						break;
						case 2:
							artyom.say("拜拜");
						break;
						case 3:
							artyom.say("再見");
						break;
					}
					artyom.dontObey();
			}
		}
		
	];
	
	artyom.addCommands(GeneralCommands); 
}