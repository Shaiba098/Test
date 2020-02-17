$(document).ready(function(){
    var datepicker = new Datepicker('.datepicker',{
        time: false
    });
});

function convert_unix_to_date() {
    var value = $('#convert_unix_to_date_value').val();
    var gmt = new Date( parseInt(value) * 1000);
    var result = '<b>GMT</b>: '+gmt.toUTCString()+'<br><b>Ваша временная зона</b>: '+gmt.toLocaleString();
    $('#convert_unix_to_date_results').html(result);
}
function convert_date_to_unix(){
    var date = $('#convert_date_to_unix_date').val();
    date = date.split('.');
    var h = $('#convert_date_to_unix_h').val();
    var m = $('#convert_date_to_unix_m').val();
    var s = $('#convert_date_to_unix_s').val();

    var datum = new Date(Date.UTC(date[2],date[1]-1,date[0],h,m,s));
    var result = '<b>Epoch timestamp</b>: '+(datum.getTime()/1000.0)+'<br><b>Обычное время</b>: '+datum.toUTCString();
    $('#convert_date_to_unix_results').html(result);
}
function convert_begin_end(){
    var currentBeginEnd = $('input[name="cw"]:checked').val();
    var r = '';
    if(currentBeginEnd=="year") r = 'года';
    if(currentBeginEnd=="month") r = 'месяца';
    if(currentBeginEnd=="day") r = 'дня';
    var result="<table style=\"text-align: left;width: 100%;\" cellpadding=2 border=0><tr><td></td><td><b>Epoch</b></td><td>&nbsp;&nbsp;<b>Обычная дата</b></td></tr><tr><td>Начало "+r+":&nbsp;</td><td>";
    var mon=0;
    var day=1;
    var yr=$('#convert_begin_end_y').val();
    if(currentBeginEnd!="year"){ mon = $('#convert_begin_end_m').val()-1; }
    if(currentBeginEnd=="day"){ day = $('#convert_begin_end_d').val(); }
    var startDate = new Date(Date.UTC(yr,mon,day,0,0,0));
    result = result+(startDate.getTime()/1000.0)+"</td><td>&nbsp;&nbsp;"+startDate.toUTCString()+"</td></tr>";
    result = result+"<tr><td>Конец "+r+":&nbsp;</td><td>";
    if(currentBeginEnd=="year")yr++;
    if(currentBeginEnd=="month")mon++;
    if(currentBeginEnd=="day")day++;
    var endDate = new Date(Date.UTC(yr,mon,day,0,0,-1));
    result = result+(endDate.getTime()/1000.0)+"</td><td>&nbsp;&nbsp;"+endDate.toUTCString()+"</td></tr>";
    $('#convert_begin_end_results').html(result);
}
function convert_to_d_h_m(){
    var value = $('#convert_to_d_h_m_value').val();
    var t = parseInt(value);
    var days = parseInt(t/86400);
    t = t-(days*86400);
    var hours = parseInt(t/3600);
    t = t-(hours*3600);
    var minutes = parseInt(t/60);
    t = t-(minutes*60);
    var result = "";
    if(days)result+=days+" days";
    if(hours||days){ if(result)result+=", "; result+=hours+" hours"; }
    if(result)result+=", "; result+=minutes+" min "+t+" sec.";
    $('#convert_to_d_h_m_results').html(result);
}
function day_for_date_today() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    $('#day_for_date_value').val(day+'.'+month+'.'+year);
}
function day_for_date_tomorrow() {
    var date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    $('#day_for_date_value').val(day+'.'+month+'.'+year);
}
Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
        - 3 + (week1.getDay() + 6) % 7) / 7);
};
function day_for_date() {
    var date = $('#day_for_date_value').val();
    var date_a = date.split('.');
    var datum = new Date(Date.UTC(date_a[2],date_a[1]-1,date_a[0],0,0,0));
    var days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    var day = datum.getDay();
    var weekNumber = datum.getWeek();
    var result = date+' - '+days[day]+', это '+weekNumber+' неделя года';
    $('#convert_date_to_unix_results').html(result);
}
function time_between_today() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    $('#time_between_value_start').val(day+'.'+month+'.'+year);
}
function time_between_tomorrow() {
    var date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    $('#time_between_value_start').val(day+'.'+month+'.'+year);
}
function time_between_plus7() {
    var date = $('#time_between_value_end').val();
    if(date.length==0){
        var datum = new Date();
    }else{
        var date_a = date.split('.');
        var datum = new Date(Date.UTC(date_a[2],date_a[1]-1,date_a[0],0,0,0));
    }
    var date = new Date(datum.getTime() + 604800000);
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    $('#time_between_value_end').val(day+'.'+month+'.'+year);
}
function time_between_plus30() {
    var date = $('#time_between_value_end').val();
    if(date.length==0){
        var datum = new Date();
    }else{
        var date_a = date.split('.');
        var datum = new Date(Date.UTC(date_a[2],date_a[1]-1,date_a[0],0,0,0));
    }
    var date = new Date(datum.getTime() + 2592000000);
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    $('#time_between_value_end').val(day+'.'+month+'.'+year);
}
function time_between() {
    var d1 = $('#time_between_value_start').val();
    var d2 = $('#time_between_value_end').val();
    if(d1.length>0 && d2.length>0){
        var date_a1 = d1.split('.');
        var date_a2 = d2.split('.');
        var date1 = new Date(Date.UTC(date_a1[2],date_a1[1]-1,date_a1[0],0,0,0));
        if($('#time_between_type_1:checked').length>0){
            var date2 = new Date(Date.UTC(date_a2[2],date_a2[1]-1,date_a2[0],23,59,59));
        }else{
            var date2 = new Date(Date.UTC(date_a2[2],date_a2[1]-1,date_a2[0],0,0,0));
        }
        var time1 = date1.getTime();
        var time2 = date2.getTime();
        if(time2<time1) time2 = time1;
        var days = 0;
        var now = new Date(time2).valueOf();
        var start = new Date(time1).valueOf();
        while (now > start) {
            if($('#time_between_type_2:checked').length>0){
                var d = new Date(start).getDay();
                if (d != 6 && d != 0) {
                    // если это не выходной
                    ++days;
                }
            }else if($('#time_between_type_3:checked').length>0){
                var d = new Date(start).getDay();
                if (d == 6 || d == 0) {
                    // если это выходной
                    ++days;
                }
            }else{
                ++days;
            }
            start += 1000*60*60*24;
        }
        var hours = days * 24;
        var text = '';
        if($('#time_between_type_2:checked').length>0){
            text = '(рабочих)';
        }else if($('#time_between_type_3:checked').length>0){
            text = '(выходных)';
        }

        var result = 'Между указанными датами '+days+' '+text+' дней<br/>Это '+hours+' часов';
        $('#time_between_results').html(result);
    }
}
function after_x_days_today() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    $('#after_x_days_value_start').val(day+'.'+month+'.'+year);
}
function after_x_days_tomorrow() {
    var date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    $('#after_x_days_value_start').val(day+'.'+month+'.'+year);
}
function after_x_days_plus(container) {
    var value = $(container).val();
    if(container=='#after_x_days_m'){
        if(value<12) value++;
    }else if(container=='#after_x_days_d'){
        if(value<31) value++;
    }else{
        value++;
    }
    $(container).val(value);
}
function after_x_days_minus(container) {
    var value = $(container).val();
    if(value>0) value--;
    $(container).val(value);
}
function after_x_days() {
    var d1 = $('#after_x_days_value_start').val();
    if(d1.length>0){
        var date_a1 = d1.split('.');
        var date1 = new Date(Date.UTC(date_a1[2],date_a1[1]-1,date_a1[0],0,0,0));
        var n_d = $('#after_x_days_d').val();
        var n_m = $('#after_x_days_m').val();
        var n_y = $('#after_x_days_y').val();
        var n_d_t = 0;
        var n_m_t = 0;
        var n_y_t = 0;
        if(n_d>0) n_d_t = n_d*1000*60*60*24;
        if(n_m>0) n_m_t = n_m*1000*60*60*24*30;
        if(n_y>0) n_y_t = n_y*1000*60*60*24*365;

        var time1 = date1.getTime()+(1000*60*60*24);
        var time2 = time1+n_d_t+n_m_t+n_y_t;

        if(time2<time1) time2 = time1;
        var days = 0;
        var now = new Date(time2).valueOf();
        var start = new Date(time1).valueOf();
        while (now > start) {
            if($('#after_x_days_type_2:checked').length>0){
                var d = new Date(start).getDay();
                if (d == 6 || d == 0) {
                    // если это выходной
                    now += 1000*60*60*24;
                }
            }else if($('#after_x_days_type_3:checked').length>0){
                var d = new Date(start).getDay();
                if (d != 6 && d != 0) {
                    // если это не выходной
                    now += 1000*60*60*24;
                }
            }
            start += 1000*60*60*24;
            ++days;
        }
        var time_new = time1+(days*1000*60*60*24)-(1000*60*60*24);
        var date_new = new Date(time_new);

        var result = 'через '+declension(n_y,['год','года','лет'])+' '+declension(n_m,['месяц','месяца','месяцев'])+' и '+declension(n_d,['день','дня','дней'])+' будет '+date_new.getDate()+'.'+(date_new.getMonth()+1)+'.'+date_new.getFullYear();
        $('#after_x_days_results').html(result);
    }
}