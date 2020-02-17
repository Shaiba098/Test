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

$(document).ready(function(){
    var timestart = performance.now();

    var timerId = setInterval(function () {
        var x = (performance.now() - timestart) | 0;
        var now = new Date(timestamp + x);
        var time = Math.floor(now.getTime() / 1000);

        $('#timestampUtc').html(time);

    }, 1000);
});

