$( document ).ready(function() {
//    localStorage.removeItem('timersM');
    //timerSet(10);
    if(localStorage.timersM!=undefined) {
        var timersM = JSON.parse(localStorage.timersM);
        for(var b in timersM){
            var newSet = $('<a class="manual" href="#" />').html(timersM[b]['name']);
            newSet.attr('href','javascript:timerSet('+timersM[b]['s']+',true)');
            var newSetDel = $('<span data-name="'+timersM[b]['name']+'" />').appendTo(newSet);
            newSetDel.on('click',function () {
                var timersM = JSON.parse(localStorage.timersM);
                var newTimers = [];
                for(var b in timersM){
                    if(timersM[b]['name']!=$(this).data('name')) newTimers.push({'s':timersM[b]['s'],'name':timersM[b]['name']});
                }
                localStorage.timersM=JSON.stringify(newTimers);
                $(this).parent().remove();
                return false;
            });
            newSet.insertBefore($('#timer-sets .add'));
        }
    }
    var ctxClass = window.audioContext ||window.AudioContext || window.AudioContext || window.webkitAudioContext || window.msAudioContext;
    if(typeof ctxClass=='undefined') return $('.sound').remove();

/*
    $('#timer span').on('click',function () {
        $(this).attr('contenteditable',true);
        $(this).focus();
        selectElement(this);
    });
    $('#timer span').on('keypress',function (e) {
        if(e.keyCode==13){
            $(this).blur();
            $(this).attr('contenteditable',false);
        }
    });
    $('#timer span').on('DOMSubtreeModified',function (e) {
        var valid = parseInt($(this).html());
        valid = (valid>=$(this).data('max'))?$(this).data('max'):valid;
        if(valid!=$(this).html()) $(this).html(valid);
    });
*/
});
var mute=0;
function soundSwitch() {
    if($('.sound').hasClass('off')){
        mute=0;
        $('.sound').toggleClass('off');
    } else {
        mute=1;
        $('.sound').toggleClass('off');
    }

}
function selectElement(element) {
    if (window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
        var range = document.createRange();
        range.selectNodeContents(element);
        sel.addRange(range);
    } else if (document.selection) {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(element);
        textRange.select();
    }
}
var sound = new Howl({
    src: ['/audio/alarm.wav'],
    loop: false,
    html5: !0,
    volume: 1
});
function beep() {
    sound.play();
}

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
var tSet=0;
function timerShowAdd() {
    if($('#timerAddBlock').hasClass('show')){
        $('#timerAddBlock').slideUp(1000);
        $('#timerAddBlock').removeClass('show');
    } else {
        $('#timerAddBlock').slideDown(1000);
        $('#timerAddBlock').addClass('show');
    }
}
function timerSet(val,reset) {
    if(typeof reset == "undefined") reset = 0;
    document.getElementById("refresh").classList.remove("disabled");
    document.getElementById("zero").classList.remove("disabled");

    tSet=val*60*1000;

    if(reset){
        b_date=e_date=0;
    }

    if(b_date!=0){
        ms = b_date-e_date;
        b_date=(new Date()).valueOf()+tSet+ms;
    } else {
        b_date=(new Date()).valueOf()+tSet;
    }

    timer_start();
}
function timerSetAdd(h,m,s,name) {
    var tSet = parseInt(h)*60+parseInt(m)+parseInt(s)/60;
    if(name==''){
        if(h>0) name+=h+'ч ';
        if(m>0) name+=m+'м ';
        if(s>0) name+=s+'с ';
    }
    var newSet = $('<a class="manual" href="#" />').html(name);
    newSet.attr('href','javascript:timerSet('+tSet+',true)');
    var newSetDel = $('<span data-name="'+name+'" />').appendTo(newSet);
    newSetDel.on('click',function () {
        var timersM = JSON.parse(localStorage.timersM);
        var newTimers = [];
        for(var b in timersM){
            if(timersM[b]['name']!=$(this).data('name')) newTimers.push({'s':timersM[b]['s'],'name':timersM[b]['name']});
        }
        localStorage.timersM=JSON.stringify(newTimers);
        $(this).parent().remove();
        return false;
    });
    newSet.insertBefore($('#timer-sets .add'));


    if(localStorage.timersM!=undefined) {
        var timersM = JSON.parse(localStorage.timersM);
    } else {
        var timersM=[];
    }
    timersM.push({'s':tSet,'name':name});
    localStorage.timersM=JSON.stringify(timersM);

    $('#timerAddBlock').slideUp(1000);
    $('#timerAddBlock').removeClass('show')

}
function start(){
    document.getElementById("refresh").classList.remove("disabled");
    document.getElementById("zero").classList.remove("disabled");
    if(timer==0){
        if(b_date==0) {
            b_date = (new Date()).valueOf()+tSet+ms;
        } else {
            b_date = (new Date()).valueOf()+ms;
        }
        timer_start();
        timer = setInterval("timer_start()",50);
        document.getElementById('start').style.background='url(/img/stop.png) no-repeat';
    } else {
        z++;
        clearInterval(timer);
        timer=0;
        document.getElementById('start').style.background='url(/img/start.png) no-repeat';
        ms = b_date-e_date;
//        document.getElementById('results').innerHTML = '<div>Замер №'+z+'. '+format_zero2(ms)+'</div>'+document.getElementById('results').innerHTML;
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
    tSet=0;
    document.getElementById('start').style.background='url(/img/start.png) no-repeat';
    document.getElementById("zero").classList.add("disabled");
    draw(sec);
    blocked=0;
}
function refresh(){
    kill();
    document.getElementById('results').innerHTML='';
    document.getElementById("refresh").classList.add("disabled");
}
function draw(val){
    document.getElementById('timer').innerHTML=format_zero2(val,7)+' с';
}
function timer_start(){
    e_date = (new Date()).valueOf();
    ms = b_date-e_date;
    if(ms<=0){
        kill();
        ms=0;
        if(!mute) {
            beep();
        }
    }
    draw(ms);
}
function format_zero(val,zero){
    var l = zero-val.toString().length;
    for(i=0;i<=l;i++) val='0'+val;
    return val;
}
function format_zero2(val,zero){
    console.log(new Date(b_date).toString());
    var d=new Date((standart+ms)).toString().replace(/.*([0-9][0-9]:[0-9][0-9]:[0-9][0-9]).*/, '$1');
    var x=String(ms%1000);
    while (x.length<3) x='0'+x;
    d+='.'+x;
    return d;
}
function format_zero3(val){
    var d=new Date(val+standart).toString().replace(/.*([0-9][0-9]:[0-9][0-9]:[0-9][0-9]).*/, '$1');
    var x=String(val%1000);
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