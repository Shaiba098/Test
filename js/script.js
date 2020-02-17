$(document).ready(function(){
    var ad4 = new Sticky('.citem4');
    var ad5 = new Sticky('.citem5');
    $('.mobile-menu-trigger').on('click',function () {
        $('.mobile-menu-wrap').slideToggle();
        return false;
    });
});
function register(e) {
    if (!e) e = window.event;
    var k = e.keyCode;
    if (k == 32) e.preventDefault();
}
function unregister(e) {
    if (!e) e = window.event;
    var k = e.keyCode;
    if (k == 32) e.preventDefault();
}
function declension($num,$expressions){
    var $result = false;
    if($expressions.length==3){
        var $count = $num % 100;
        if ($count >= 5 && $count <= 20) {
            $result = $expressions[2];
        } else {
            $count = $count % 10;
            if ($count == 1) {
                $result = $expressions[0];
            } else if ($count >= 2 && $count <= 4) {
                $result = $expressions[1];
            } else {
                $result = $expressions[2];
            }
        }
    }
    return $num+' '+$result;
}

document.onkeydown = register;
document.onkeyup = unregister;

