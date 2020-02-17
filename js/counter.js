$( document ).ready(function() {
    start();
});

var timer=0;
var curent_count=0;
var type = 'mir';
function startTimer(){
    var value = $('#timer').data(type);
    var interval = 86400000 / value;
    timer = setInterval(function () {
        curent_count++;
        if(curent_count<10){
            $('#timer').html('0'+curent_count);
        }else{
            $('#timer').html(curent_count);
        }
    },interval);
}
function start(){
    if(timer==0){
        startTimer();
    }else{
        clearInterval(timer);
        timer=0;
    }
}
function kill(){
    $('#timer').html('00');
    clearInterval(timer);
    timer=0;
    curent_count=0;
    startTimer();
}
function changeType(t){
    $('#timer').html('00');
    clearInterval(timer);
    timer=0;
    curent_count=0;
    type = t;
    $('.changeType').prop('checked',false);
    $('.changeType.'+t).prop('checked',true);
    startTimer();
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
    if(k==27) kill();
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