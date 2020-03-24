
Function.prototype.clone = function() {
    var that = this;
    var temp = function temporary() { return that.apply(this, arguments); };
    for(var key in this) {
        if (this.hasOwnProperty(key)) {
            temp[key] = this[key];
        }
    }
    return temp;
};
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
if(typeof window != 'undefined'){
	window.mobile_check = function() {
		var check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	};
	window.check_mobile = window.mobile_check;
}
//colour
let colour = ["red","green","yellow","gray","white","pink","purple","fucshia"]
let object_array = [];
class Point{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
}
class Rectangle{
	constructor(x1,y1,x2,y2){
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	}
}
function clamp(val,lower_limit,upper_limit){
	return val>upper_limit ? upper_limit : (val<lower_limit ? lower_limit : val)
}
function clamp_loop(val,lower_limit,upper_limit){
	return val>upper_limit ? lower_limit : (val<lower_limit ? upper_limit : val)
}
function ascii(a) { return a.charCodeAt(0); }
function lengthdir_x(dir,l){
	let r = dir*Math.PI/180
	return (Math.cos(r)*l);
};
function lengthdir_y(dir,l){
	let r = dir*Math.PI/180
	return (Math.sin(r)*l);
};
function point_distance(x1,y1,x2,y2){
	return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
}
function point_direction(x1,y1,x2,y2){
	let w = x2-x1;
	let h = y2-y1;
	let fr=Math.PI/180;
	return Math.atan2(h,w)/fr
}
function point_in_rectangle(x,y,rX,rY,rW,rH){
	return(x>=rX&&x<=rX+rW&&y>=rY&&y<=rY+rH)
}
function point_in_circle(x,y,cX,cY,r){
	let xx = x-cX;
	let yy = y-cY;
	return (pow(xx,2)+pow(yy,2)<=pow(r,2))
}
function abs(v){
	return Math.abs(v);
}
function rectangle_collision(r1x,r1y,r1w,r1h,r2x,r2y,r2w,r2h){
	var r = 100000
	r1x += r//Math.max(0,r1x);
	r1y += r//Math.max(0,r1y)
	r2x += r//Math.max(0,r2x)
	r2y += r//Math.max(0,r2y)
	return (abs(r1x) < abs(r2x) + abs(r2w) &&
		abs(r1x) + abs(r1w) > abs(r2x) &&
		abs(r1y) < abs(r2y) + abs(r2h) &&
		abs(r1h) + abs(r1y) > abs(r2y)
	)
	 
}
function sigFigs(n, sig) {
	var mult = Math.pow(10, sig - Math.floor(Math.log(n) / Math.LN10) - 1);
	return Math.round(n * mult) / mult;
}
function object_update(obj){
	obj.update()
}
function irandom(variable){
	if (arguments.length == 1){
		return Math.round(Math.random()*variable)
	}else{
		return Math.round(variable+Math.random()*(arguments[1]-variable))
	}
	
}
function approach(x1,x2,spdTime=5,k=undefined){
	if(k!=undefined){
		if(Math.abs(x1-x2)>k){
			return x1 + (x2-x1)/spdTime+Math.sign(x2 - x1)*k
			//return x1 + Math.sign(x2 - x1)*spd
		}else{
			return x2;
		}
	}else{
		return x1 + (x2-x1)/spdTime
	}
}
function get_randomID() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}
function degree_to_radian(degree) {
	return degree * Math.PI / 180;
  };
   
  // Converts from radians to degrees.
function radian_to_degree(radian) {
return radian * 180 / Math.PI;
};
function mobile_zoom(z){
	document.body.style.zoom = z;
}
function SetKeyEvent(KeyString, func){
	addEventListener("keypress",function(){
		console.log(keyCode)
		if(keyCode==ascii(KeyString)){
			func();
		}
	})
}
function DisableRightclickMenu(){
	document.addEventListener('contextmenu', event => event.preventDefault());
}
function delay(time){
	var p = new Promise((resolve,reject) => {
		function finish(){
			resolve();
		}
		setTimeout(finish,time);
	})
	return p;
}
let GKTimerT0 = 0;
function startTimer(){
	GKTimerT0 = performance.now();
}
function getTimer(){
	return performance.now() - GKTimerT0;
}