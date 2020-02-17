var $x = 1000;
var $newbpm = 60;
var $t;
var blocked=0;

var sound = new Howl({
    src: ['/js/click.wav'],
    loop: false,
    html5: !0,
    volume: 1
});
function beep() {
    sound.play();
}
function stop() {
    clearInterval($t);
    $('#start').removeClass('disabled');
    $('#stop').addClass('disabled');
    blocked=0;
}
function start() {
    clearInterval($t);
    $newbpm = 1000/(Math.round($('#bpm').val()/60));
    $t=setInterval(beep,$newbpm);
    $('#stop').removeClass('disabled');
    $('#start').addClass('disabled');
    blocked=1;
}
function register(e) {
    if (!e) e = window.event;
    var k = e.keyCode;
    if (k == 32) e.preventDefault();
    if(!blocked) {
        if(k==32) start();
    }else{
        if(k==32) stop();
    }
}
function unregister(e) {
    if (!e) e = window.event;
    var k = e.keyCode;
    if (k == 32) e.preventDefault();
}

document.onkeydown = register;
document.onkeyup = unregister;
