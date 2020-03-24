
let CurrentMusic = null;
let MusicPlayer = null;
let MusicList = [
    new Music("https://www.youtube.com/watch?v=ALZHF5UqnU4","alone"),
    new Music('RD_p4JWOCB3x0',"抖音"),
    //new Music("http://www.stlouis.edu.hk/","電"),
    new Music("PLuDvd3rkM29jfTM_pZY9W-wBLvGh-6f8T","電")

];
var player;
var search = "party";
var category = "music";
var GoogleAuth;
let isAuthorized = false;
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }

  function initClient() {
    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes

    gapi.auth2.init({
        'clientId': '575791772055-7cfsta1mc8r001tk5h2sjdrhtnvvvjli.apps.googleusercontent.com',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
        'scope': 'https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner'
    }).then(function () {
      GoogleAuth = gapi.auth2.getAuthInstance();

      // Listen for sign-in state changes.
      GoogleAuth.isSignedIn.listen(updateSigninStatus);

      // Handle initial sign-in state. (Determine if user is already signed in.)
      setSigninStatus();

      // Call handleAuthClick function when user clicks on "Authorize" button.
     
        handleAuthClick(event);
    });
  }

  function handleAuthClick(event) {
    // Sign user in after click on auth button.
    GoogleAuth.signIn();
  }

  function setSigninStatus() {
    var user = GoogleAuth.currentUser.get();
    isAuthorized = user.hasGrantedScopes('https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner');
    // Toggle button text and displayed statement based on current auth status.
    if (isAuthorized) {
      //defineRequest();
    }
  }

  function updateSigninStatus(isSignedIn) {
    setSigninStatus();
  }

  function createResource(properties) {
    var resource = {};
    var normalizedProps = properties;
    for (var p in properties) {
      var value = properties[p];
      if (p && p.substr(-2, 2) == '[]') {
        var adjustedName = p.replace('[]', '');
        if (value) {
          normalizedProps[adjustedName] = value.split(',');
        }
        delete normalizedProps[p];
      }
    }
    for (var p in normalizedProps) {
      // Leave properties that don't have values out of inserted resource.
      if (normalizedProps.hasOwnProperty(p) && normalizedProps[p]) {
        var propArray = p.split('.');
        var ref = resource;
        for (var pa = 0; pa < propArray.length; pa++) {
          var key = propArray[pa];
          if (pa == propArray.length - 1) {
            ref[key] = normalizedProps[p];
          } else {
            ref = ref[key] = ref[key] || {};
          }
        }
      };
    }
    return resource;
  }

  function removeEmptyParams(params) {
    for (var p in params) {
      if (!params[p] || params[p] == 'undefined') {
        delete params[p];
      }
    }
    return params;
  }

  function executeRequest(request) {
    request.execute(function(response) {
        artyom.say("搜尋完畢");
        var videoID = response.items[0].id.videoId;
        var videoName = response.items[0].snippet.title;
        console.log("id: "+videoID);
        console.log("name: "+videoName);
        console.log(response);
        var video = new Music(videoID,videoName);
        video.Play(false);
      //console.log(response);
      ///////
    });
  }
function buildApiRequest(requestMethod, path, params, properties) {
    params = removeEmptyParams(params);
    var request;
    if (properties) {
      var resource = createResource(properties);
      request = gapi.client.request({
          'body': resource,
          'method': requestMethod,
          'path': path,
          'params': params
      });
    } else {
      request = gapi.client.request({
          'method': requestMethod,
          'path': path,
          'params': params
      });
    }
    executeRequest(request);
  }
  
function YoutubeSearch(title,type) {
        // See full sample for buildApiRequest() code, which is not 
    // specific to a particular API or API method.

    buildApiRequest('GET',
                    '/youtube/v3/search',
                    {'maxResults': '1',
                    'part': 'snippet',
                    'q': title,
                    'type': type});
    

  }
                 
function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-placeholder', {
        width: 1,
        height: 1,
        //videoId: '1-xGerv5FOk',
        playerVars: {
            color: 'white',
            listType:"playlist",
            list: '',
            index:parseInt(0),
            suggestedQuality:'small'
        },
        events: {
            onReady: initialize
        }
    });
}
function initialize(){

    // Update the controls on load
    updateTimerDisplay();
    updateProgressBar();

    // Clear any old interval.
    clearInterval(time_update_interval);

    // Start interval to update elapsed time display and
    // the elapsed part of the progress bar every second.
    time_update_interval = setInterval(function () {
        updateTimerDisplay();
        updateProgressBar();
    }, 1000)

}
function addMusicCommands(){
    var MusicCommands = [
		{
			description:"MusicSetting",
			smart:true, // a Smart command allow you to use wildcard in order to retrieve words that the user should say
			// Ways to trigger the command with the voice
			indexes:["播*","Play *","想聽*"],
			// Do something when the commands is triggered
			action:function(i,wildcard){
			//var database = MusicList;
	
			//If the command "is xxx a good person" is triggered do, else
            console.log("i: "+i);

                var found = false;
                var foundMusic = null;
                for(m of MusicList){
                    if(wildcard.trim().includes(m.name)&&!found){
                        found = true;
                        foundMusic = m;
                    }
                }
                if(found){
                    foundMusic.Play();
                }else{
                    if(i!=0){
                      setQuestion("洗唔洗我幫你搵搵?",QuestionType.YesNo,function(ans){
                        switch(ans){
                          case true:
                            artyom.simulateInstruction("搜尋音樂"+wildcard.trim()); 
                          break;
                          case false:
                            artyom.say("好");
                          break;
                        }
                      })
                      
                      //artyom.say("sorry，我搵唔到首歌");
                    }
                }   
            }
			
		}
		
	];
	var MusicControlCommand = [{
        description:"Stop playing command",
        smart: true,
        indexes:["停止*","停*","唔好*","唔好再*","暫停*","收聲*","收嗲*"],
        action:function(i,wildcard){
            if(i<=4){
              if((wildcard.trim().includes("播放")||
              wildcard.trim().includes("音樂")||
              wildcard.trim().includes("歌"))
              ){
                CurrentMusic.Stop();
              }
            }else{
                CurrentMusic.Stop();
            }
        }
    },
    {
        description:"Continue playing command",
        smart: true,
        indexes:["繼續*"],
        action:function(i,wildcard){
           
            if(wildcard.trim().includes("播放")||
                wildcard.trim().includes("音樂")||
                wildcard.trim().includes("歌")){
                CurrentMusic.Continue();
            }
        
        }
    },
    {
        description:"Full Screen playing command",
        smart: true,
        indexes:["*全屏幕","*全螢幕"],
        action:function(i,wildcard){
           
            if(checkWord(wildcard,setWords)){
                    
                //player.playVideo();//won't work on mobile
                
                /*var iframe = document.getElementById("video-placeholder");
                var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
                if (requestFullScreen) {
                    requestFullScreen.bind(iframe)();
                }*/
                player.setSize(innerWidth,innerHeight);
                artyom.say("已經設為全屏幕")
                BackgroundMode = 3;
            }
        
        }
    },
    {
        description:"Searching in youtube",
        smart: true,
        indexes:["搜尋影片*","搜尋音樂*"],
        action:function(i,wildcard){
            var title = wildcard.trim();
            title = title.replace("唔該","");
            switch(i){
                case 0:
                    YoutubeSearch(title,"video")
                break;
                case 1:
                    YoutubeSearch(title,"music")
                break;
            }
            
        
        }
    }]
	
    artyom.addCommands(MusicControlCommand); 
    artyom.addCommands(MusicCommands); 
}