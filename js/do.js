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
function beep() {
    var file = $('#clock_alarm_mp3').val();
    audio = new Audio('/audio/'+file);
    $(audio).on( "ended", function(){
        stopClock();
    });
    audio.play();
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
function timerSetAlarm(tSet) {
    b_date=e_date=0;

    if(b_date!=0){
        ms = b_date-e_date;
        b_date=(new Date()).valueOf()+tSet+ms;
    } else {
        b_date=(new Date()).valueOf()+tSet;
    }
    timer_start();
}
function timerSet(val,reset) {
    if(typeof reset == "undefined") reset = 0;
    //document.getElementById("refresh").classList.remove("disabled");
    //document.getElementById("zero").classList.remove("disabled");

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
    //document.getElementById("refresh").classList.remove("disabled");
    //document.getElementById("zero").classList.remove("disabled");
    if(timer==0){
        if(b_date==0) {
            b_date = (new Date()).valueOf()+tSet+ms;
        } else {
            b_date = (new Date()).valueOf()+ms;
        }
        timer_start();
        timer = setInterval("timer_start()",50);
        //document.getElementById('start').style.background='url(/img/stop.png) no-repeat';
    } else {
        z++;
        clearInterval(timer);
        timer=0;
        //document.getElementById('start').style.background='url(/img/start.png) no-repeat';
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
    //document.getElementById('start').style.background='url(/img/start.png) no-repeat';
    //document.getElementById("zero").classList.add("disabled");
    draw(sec);
    blocked=0;
}
function refresh(){
    kill();
    //document.getElementById('results').innerHTML='';
    //document.getElementById("refresh").classList.add("disabled");
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
var test = 0;
var audio;
function testAudio() {
    if(test==0){
        var file = $('#clock_alarm_mp3').val();
        audio = new Audio('/audio/'+file);
        $(audio).on( "ended", function(){
            test = 0;
            $('#test').css('background','url(/img/test.png) no-repeat');
        });
        audio.play();
        $('#test').css('background','url(/img/stop.png) no-repeat');
        test = 1;
    }else{
        test = 0;
        audio.pause();
        $('#test').css('background','url(/img/test.png) no-repeat');
    }
}

var timestamp=0;
function time100(){
    time100.cb=function(t,r){
        timestamp=t;
    };

}
time100();
i=document.createElement("script");
i.setAttribute("src", "//time100.ru/api.php?type=cb&t="+new Date().getTime());
j=document.getElementsByTagName("head").item(0);
j.appendChild(i);

var c_d;
var c_m;
var c_y;
var c_h;
var c_min;
var c_s;

function startClock() {
    var h = $('#alarmAddHour').val();
    var m = $('#alarmAddMinute').val();
    var s = $('#alarmAddSecond').val();
    var milliseconds = s*1000 + m*60000 + h*3600000;
    if(milliseconds>0 && milliseconds<=24*3600000){
        $('#settings').hide();
        $('#results').show();
        timerSetAlarm(milliseconds);
        start();
    } else alert('Установите время в пределах 24 часов')
}
function startClock2() {
    var d = $('#datepicker').val().split('.');
    var h = $('#alarmAddHour2').val();
    var m = $('#alarmAddMinute2').val();
    var date = new Date(d[1]+'/'+d[0]+'/'+d[2]+' '+h+':'+m+':'+s);
    var date_c = new Date(c_m+'/'+c_d+'/'+c_y+' '+c_h+':'+c_min+':'+c_s);
    var milliseconds = date.valueOf() - date_c.valueOf();
    if(milliseconds>0 && milliseconds<=24*3600000){
        $('#settings').hide();
        $('#results').show();
        timerSetAlarm(milliseconds);
        start();
    } else alert('Установите время в пределах 24 часов')
}
function stopClock(){
    kill();
    $('#settings').show();
    $('#results').hide();
    if(typeof audio!="undefined") audio.pause();
}

$(document).ready(function(){
    var timestart = performance.now();

    var timerId = setInterval(function () {
        var x = (performance.now() - timestart) | 0;
        var d = new Date(timestamp + x);
        var h = (d.getHours() < 10 ? '0' : '') + d.getHours();
        var m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        var s = (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
        c_d = d.getDate();
        c_m = d.getMonth()+1;
        c_y = d.getFullYear();
        c_h = h;
        c_min = m;
        c_s = s;

        var date = new Date($('#time-do').data('date'));
        var day_replase = $('#time-do').data('day-replase');
        var date_c = new Date(c_m+'/'+c_d+'/'+c_y+' '+c_h+':'+c_min+':'+c_s);

        var result = (date - date_c)+1000;
        var seconds = Math.floor((result/1000)%60);
        var minutes = Math.floor((result/1000/60)%60);
        var hours = Math.floor((result/1000/60/60)%24);
        var days = Math.floor(result/1000/60/60/24);

        var days_t = num2str(days, ['день', 'дня', 'дней']);
        var hours_t = num2str(hours, ['час', 'часа', 'часов']);
        var minutes_t = num2str(minutes, ['минута', 'минуты', 'минут']);
        var seconds_t = num2str(seconds, ['секунда', 'секунды', 'секунд']);

        if (seconds < 10) seconds = '0' + seconds;
        if (minutes < 10) minutes = '0' + minutes;
        if (hours < 10) hours = '0' + hours;

        if(day_replase){
            $('#days').html(day_replase);
        }else{
            $('#days').html(days+' '+days_t);
        }
        $('#hours').html(hours+' '+hours_t);
        $('#minutes').html(minutes+' '+minutes_t);
        $('#seconds').html(seconds+' '+seconds_t);

    }, 1000);

});

function num2str(n, text_forms) {
    n = Math.abs(n) % 100; var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}