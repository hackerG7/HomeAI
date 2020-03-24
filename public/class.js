class Music{
    constructor(link,name){
        this.link = link;
        this.name = name;
        this.IsPlaying = false;
    }
    Play(isPlayList = true){
        if(CurrentMusic!=this){
            //console.log(CurrentMusic)
            if(player!=null){
                if(isPlayList){
                    CurrentMusic = this;

                    //YoutubeWindow.stop();
                    var realLink = this.link;
                    player.loadPlaylist({color: 'white',
                    listType:"playlist",
                    list: this.link,
                    index:parseInt(0),
                    suggestedQuality:'small'});
                    //console.log("MUSIC: "+player);
                    artyom.say("正在播放"+this.name);
                    //MusicPlayer = document.getElementById("player");
                    //MusicPlayer.play();
                    //YoutubeWindow = window.open(this.link);
                }else{
                    CurrentMusic = this;

                    //YoutubeWindow.stop();
                    var realLink = this.link;
                    player.loadVideoById(this.link);
                    /*player.loadVideo({color: 'white',
                    videoId:this.link,
                    index:parseInt(0),
                    suggestedQuality:'small'});
                    //console.log("MUSIC: "+player);
                    artyom.say("正在播放"+this.name);*/
                    //MusicPlayer = document.getElementById("player");
                    //MusicPlayer.play();
                    //YoutubeWindow = window.open(this.link);
                }
            }
            
            
            
        }
        
    }
    Stop(){
        
        if(player!=null){
            player.pauseVideo();
            artyom.say("已停止播放");

        }
    }
    Continue(){
       if(player!=null){
            player.playVideo();
            artyom.say("已繼續播放");
       }
    }

}
let CurrentQuestion = null;
class QuestionTypeClass{ 
    constructor(){
        this.YesNo=0;
        this.Number=1;
        this.Sentence=2;
    }
}
let QuestionType = new QuestionTypeClass();

class Question{
    constructor(QuestionStr,Questiontype){
        this.str = QuestionStr;
        this.type = Questiontype;
        //this.answer = null;
    }
    answer(ans){
        this.answerHandle(ans);
        CurrentQuestion = null;
    }
    answerHandle(){
        console.log("ERROR: DIDN'T set answer action, please use setAnswerAction()")
    }
    setAnswerAction(f){
        this.answerHandle = f;
    }

}