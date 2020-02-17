function widgetPreview() {
    var type = $('#widgetType').val();
    var height = 365;
    var custom = '';
    var skolko_do = false;
    if(type == '/skolko-ostalos-do/') {
        type = $('#widgetTypeSkolkoDo').val();
        skolko_do = true;
    }
    if(skolko_do==true) height = 450;
    if(type == '/') height = 311;
    if(type == '/onlinebudilnik/') height = 723;
    if(type == '/onlinemetronom/') height = 295;
    if(type == '/sluzhba-tochnogo-vremeni/') height = 412;
    if(type == '/sluzhba-tochnogo-vremeni/chasy-bezier/') height = 338;
    if(type == '/sluzhba-tochnogo-vremeni/timestamp-unix/') height = 413;
    if(type == '/sluzhba-tochnogo-vremeni/?utc'){
        type = '/sluzhba-tochnogo-vremeni/';
        custom = '&utc=true';
        height = 324;
    }
    var name = $('#widgetName').val();
    var bordered = 'border-radius: 0;';
    var pattern = 'none';
    var cr = 'show';
    var size = 'adaptive';
    var width = '100%';
    if($('input[name="widgetCustom"]:checked').length>0) bordered = 'border-radius: 10px;';
    if($('input[name="widgetCopyright"]:checked').length>0) cr = 'hide';
    if($('input[name="widgetPattern"]:checked').length>0) pattern = $('input[name="widgetPattern"]:checked').val();
    if($('input[name="widgetSize"]:checked').length>0) size = $('input[name="widgetSize"]:checked').val();
    var bg = $('#widgetColorBg').val();
    var bgBody = $('#widgetColorBgBody').val();
    var colorH1 = $('#widgetColorHeaderText').val();
    switch (size) {
        case 'small':
            width = '360px';
            height = 413;
            if(type == '/') height = 300;
            if(type == '/onlinebudilnik/') height = 1000;
            if(type == '/onlinemetronom/') height = 362;
            if(type == '/sluzhba-tochnogo-vremeni/') height = 322;
            if(custom == '&utc=true') height = 240;
            if(type == '/sluzhba-tochnogo-vremeni/chasy-bezier/') height = 323;
            if(type == '/sluzhba-tochnogo-vremeni/timestamp-unix/') height = 425;
            if(skolko_do==true) height = 400;
            break;
        case 'medium':
            width = '500px';
            height = 302;
            if(type == '/') height = 248;
            if(type == '/onlinebudilnik/') height = 928;
            if(type == '/onlinemetronom/') height = 332;
            if(type == '/sluzhba-tochnogo-vremeni/') height = 342;
            if(custom == '&utc=true') height = 261;
            if(type == '/sluzhba-tochnogo-vremeni/chasy-bezier/') height = 288;
            if(type == '/sluzhba-tochnogo-vremeni/timestamp-unix/') height = 359;
            if(skolko_do==true) height = 400;
            break;
        case 'big':
            width = '700px';
            height = 331;
            if(type == '/') height = 278;
            if(type == '/onlinebudilnik/') height = 928;
            if(type == '/onlinemetronom/') height = 295;
            if(type == '/sluzhba-tochnogo-vremeni/') height = 379;
            if(custom == '&utc=true') height = 291;
            if(type == '/sluzhba-tochnogo-vremeni/chasy-bezier/') height = 338;
            if(type == '/sluzhba-tochnogo-vremeni/timestamp-unix/') height = 408;
            if(skolko_do==true) height = 500;
            break;
    }
    if(name.length==0) height = height-57;
    height = height+'px';
    var widget = '<iframe style="width: '+width+';height: '+height+';'+bordered+'" src="//'+window.location.hostname+type+'?widget=true&name='+name+'&bg='+bg+'&bgBody='+bgBody+'&colorH1='+colorH1+'&pattern='+pattern+'&cr='+cr+''+custom+'" frameborder="0"></iframe>';
    $('#widgetPreview').html(widget);
    $('#widgetCode').html(widget);
}

$(document).ready(function(){
    widgetPreview();
});