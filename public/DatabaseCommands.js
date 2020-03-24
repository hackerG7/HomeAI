
function setMemory(name,data){
    sendMsg("setMemory",{NameOfMemory:name,DataOfMemory:data})
}
function GlobalAction(){
    console.log("here is global action")
}
function cloneGlobalAction(action){
    GlobalAction = function(){};
    GlobalAction = action.clone();
}
//tutorial:
/*
getAllMemory(function(MemoryList){
    for(Memory of MemoryList){
        console.log(Memory.name+" , "+Memory.data)
    }
})

getMemory("主人的歲數",function(Memory){
    console.log(Memory.name+" , "+Memory.data)
})
*/
function getAllMemory(action){
    sendMsg("getAllMemory",{type:undefined})
    cloneGlobalAction(action);
}

function getMemory(name,action){
    sendMsg("getMemory",{NameOfMemory:name})
    cloneGlobalAction(action);
}

function getAllMemoryAction(data){
    var MemoryList = data.MemoryList;
    GlobalAction(MemoryList);
}
function getMemoryAction(data){
    var Memory = data.Memory;
    GlobalAction(Memory);
}
socket.on("getAllMemory",getAllMemoryAction)
socket.on("getMemory",getMemoryAction)
var rememberWords = ["記住","記得","幫我記住","記住一下"]
function convertSentenceToMemory(str){
    var StartWords = rememberWords
    var TriggerWords = ["係","叫"]
    var StartWord = "";
    var TriggerWord = "";
    var StartIndex = 0;
    var TriggerIndex = 0;
    var MemoryName = undefined;
    var MemoryData = undefined;
    str = str.trim();
    str = str.replace("唔該","");
    //finding the start index
    for(word of StartWords){
        if(str.includes(word)){
            StartIndex = str.indexOf(word);
            StartWord = word;
        }
    }
    //finding the trigger index ("係")
    for(word of TriggerWords){
        if(str.includes(word)){
            TriggerIndex = str.indexOf(word);
            TriggerWord = word;
        }
    }
    var StartSlice = str.slice(StartIndex,TriggerIndex);
    var TriggerSlice = str.slice(TriggerIndex,str.length);
    MemoryName = StartSlice.replace(StartWord,"");
    MemoryData = TriggerSlice.replace(TriggerWord,"");
    return([MemoryName,MemoryData]);
}
artyom.redirectRecognizedTextOutput(function(recognized,isFinal){
    var done = false;
    if(isFinal){
        for(w of rememberWords){
            var r = recognized.trim();
            if(r.includes(w)&&!r.includes("記唔記得")){
                if(!done){
                    var Memory = convertSentenceToMemory(recognized);
                    var MemoryName = Memory[0];
                    var MemoryData = Memory[1];
                    artyom.say("好，記住咗");
                    done = true;
                    setMemory(MemoryName,MemoryData);
                }    
            }
        }
    }
});
function addDatabaseCommands(){
    var Commands = [{
			description:"ask for Memory",
			smart:true, // a Smart command allow you to use wildcard in order to retrieve words that the user should say
			// Ways to trigger the command with the voice
            indexes:["請問*","你記唔記得*","記唔記得*","你知唔知*","知唔知*","我想問下*"],
			// Do something when the commands is triggered
			action:function(i,wildcard){
                var str = wildcard.trim();
                str = str.replace("乜嘢","")
                str = str.replace("乜野","")
                var ans = str;
                var ans = ans.trim();
                var ans = ans.replace("我諗下先","")
                var ans = ans.replace("嚟","")
                var ans = ans.replace("㗎","")
                var ans = ans.replace("嘛","");
                var ans = ans.replace("係","")
                var ans = ans.replace("叫","")
                var ans = ans.replace("呀","")
                var ans = ans.replace("係","")
                var ans = ans.replace("記得","")
                var ans = ans.replace("好似","")
                var ans = ans.replace("唔該","")
                var ans = ans.replace("曬","")
                var ans = ans.replace("為","")
                var ans = ans.replace("邊個","")
                var ans = ans.replace("邊度","")
                var ans = ans.replace("邊到","")
                var ans = ans.replace("咩嘢","")
                var ans = ans.replace("咩","")
                var ans = ans.replace("幾點","")
                var ans = ans.replace("幾多","")

                str = ans;
                var MemoryName = str;
                console.log("asking for memory: "+str);
                getMemory(MemoryName,function(Memory){
                    artyom.say(Memory.data);
                })
			}
				
			
        }
	];
	
	artyom.addCommands(Commands); 
}