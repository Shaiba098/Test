var timer=0;
var sec=0;
var h=0;
var m=0;
var s=0;
var b_date = 0;
var e_date = 0;
var s_date = 0;
var ms = 0;
var standart = new Date(1970,1, 1, 0, 0, 0, 0).valueOf();
var z = 0;
function start(){
	$('#refresh').removeClass('disabled');
	$('#zero').removeClass('disabled');
	if(timer==0){
		if(b_date==0) b_date = (new Date()).valueOf();
		else b_date = (new Date()).valueOf()-ms;
		timer = setInterval("timer_start()",50);
		document.getElementById('start').style.background='url(/img/stop.png) no-repeat';
	} else {
		z++;
		clearInterval(timer);
		timer=0;
		document.getElementById('start').style.background='url(/img/start.png) no-repeat';
		ms = e_date-b_date;
		document.getElementById('results').innerHTML = '<div>Замер №'+z+'. '+format_zero2(ms)+'</div>'+document.getElementById('results').innerHTML;
	}
}
function kill(){
	clearInterval(timer);
	timer=0;
	sec=0;
	b_date=0;
	z=0;
	e_date=0;
	s_date=0
	ms = 0;
	document.getElementById('start').style.background='url(/img/start.png) no-repeat';
	$('#zero').addClass('disabled');
	draw(sec);
	blocked=0;
}
function refresh(){
	kill();
	document.getElementById('results').innerHTML='';
	$('#refresh').addClass('disabled');
}
function draw(val){
	document.getElementById('timer').innerHTML=format_zero2(val,7)+' с';
}
function timer_start(){
	e_date = (new Date()).valueOf();
	ms = e_date-b_date;
	draw(ms);
}
function format_zero(val,zero){
	var l = zero-val.toString().length;
	for(i=0;i<=l;i++) val='0'+val;
	return val;
}
function format_zero2(val,zero){
	var d=new Date(ms+standart).toString().replace(/.*([0-9][0-9]:[0-9][0-9]:[0-9][0-9]).*/, '$1');
	var x=String(ms%1000);
	while (x.length<3) x='0'+x;
	d+='.'+x;
	return d;
}
function ms_to_time(ms) {
	var t;
	var ms = Math.floor(ms/1000);
	t = ":" + ms
	return t
}
blocked=0;
function register(e) {
	if (!e) e = window.event;
	var k = e.keyCode;
	if (k == 32) e.preventDefault();
	if(!blocked) {
		if(k==32) start();
		blocked = 1;
	}
	if(k==82) kill();
	if(k==27) refresh();
}
function unregister(e) {
	if (!e) e = window.event;
	var k = e.keyCode;
	if (k == 32) e.preventDefault();
	if(k==32){
		blocked = 0;
	}
}

document.onkeydown = register;
document.onkeyup = unregister;