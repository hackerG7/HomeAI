function checkQuestionType(){
	if(CurrentQuestion!=null){
		return CurrentQuestion.type;
	}else{
		return null;
	}
}
function setQuestion(str, type, actionFunction){
	artyom.say(str);
	CurrentQuestion = new Question(str, type);
	CurrentQuestion.setAnswerAction(actionFunction);
}
function answerQuestion(str){
	if(CurrentQuestion!=null){
		CurrentQuestion.answer(str);
	}
}
function filterWords(ans){
	var ans = ans.trim();
	var ans = ans.replace("佢","")
	var ans = ans.replace("我諗下先","")
	var ans = ans.replace("嚟","")
	var ans = ans.replace("㗎","")
	var ans = ans.replace("嘛","");
	var ans = ans.replace("係","")
	var ans = ans.replace("呀","")
	var ans = ans.replace("係","")
	var ans = ans.replace("記得","")
	var ans = ans.replace("好似","")
	var ans = ans.replace("唔該","")
	var ans = ans.replace("曬","")
	var ans = ans.replace("你","")
	var ans = ans.replace("為","")

	return ans;
}
function addQuestionCommands(){
    var Commands = [
		{
			description:"Yes Question",
			smart:false, // a Smart command allow you to use wildcard in order to retrieve words that the user should say
			// Ways to trigger the command with the voice
			indexes:["係","係呀","好","好呀","去呀","OK"],
			// Do something when the commands is triggered
			action:function(i,wildcard){
					if(checkQuestionType()==QuestionType.YesNo){
						answerQuestion(true);
					}
					
			}
				
			
		},
		{
			description:"No Question",
			smart:false, // a Smart command allow you to use wildcard in order to retrieve words that the user should say
			// Ways to trigger the command with the voice
			indexes:["唔啦","唔洗","唔使","唔使啦","唔係","唔係呀","No","Don't"],
			// Do something when the commands is triggered
			action:function(i,wildcard){
					if(checkQuestionType()==QuestionType.YesNo){
						answerQuestion(false);
					}
					
			}
				
			
		},
		{
			description:"Number Question",
			smart:true, // a Smart command allow you to use wildcard in order to retrieve words that the user should say
			// Ways to trigger the command with the voice
			indexes:["*"],
			// Do something when the commands is triggered
			action:function(i,wildcard){
					if(checkQuestionType()==QuestionType.Number){
						//ans = filterWords(ans)
						ans = parseFloat(ans);
						answerQuestion(ans);
					}
					
			}
				
			
		}
	];
	
	artyom.addCommands(Commands); 
}