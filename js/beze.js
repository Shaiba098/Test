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

var easing = {
    none: function(x, t, b, c, d) {
        return 0;
    },
    easeInQuad: function(x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function(x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function(x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function(x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function(x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function(x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function(x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function(x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function(x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function(x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function(x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function(x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeOutBounce: function(x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    }
};
var conf = {
    steps: 15,
    easing: 'easeOutQuad'
};
var dd = [];
dd[0] = [254, 47, 159, 84, 123, 158, 131, 258, 139, 358, 167, 445, 256, 446, 345, 447, 369, 349, 369, 275, 369, 201, 365, 81, 231, 75];
dd[1] = [138, 180, 226, 99, 230, 58, 243, 43, 256, 28, 252, 100, 253, 167, 254, 234, 254, 194, 255, 303, 256, 412, 254, 361, 255, 424];
dd[2] = [104, 111, 152, 55, 208, 26, 271, 50, 334, 74, 360, 159, 336, 241, 312, 323, 136, 454, 120, 405, 104, 356, 327, 393, 373, 414];
dd[3] = [96, 132, 113, 14, 267, 17, 311, 107, 355, 197, 190, 285, 182, 250, 174, 215, 396, 273, 338, 388, 280, 503, 110, 445, 93, 391];
dd[4] = [374, 244, 249, 230, 192, 234, 131, 239, 70, 244, 142, 138, 192, 84, 242, 30, 283, -30, 260, 108, 237, 246, 246, 435, 247, 438];
dd[5] = [340, 52, 226, 42, 153, 44, 144, 61, 135, 78, 145, 203, 152, 223, 159, 243, 351, 165, 361, 302, 371, 439, 262, 452, 147, 409];
dd[6] = [301, 26, 191, 104, 160, 224, 149, 296, 138, 368, 163, 451, 242, 458, 321, 465, 367, 402, 348, 321, 329, 240, 220, 243, 168, 285];
dd[7] = [108, 52, 168, 34, 245, 42, 312, 38, 379, 34, 305, 145, 294, 166, 283, 187, 243, 267, 231, 295, 219, 323, 200, 388, 198, 452];
dd[8] = [243, 242, 336, 184, 353, 52, 240, 43, 127, 34, 143, 215, 225, 247, 307, 279, 403, 427, 248, 432, 93, 437, 124, 304, 217, 255];
dd[9] = [322, 105, 323, 6, 171, 33, 151, 85, 131, 137, 161, 184, 219, 190, 277, 196, 346, 149, 322, 122, 298, 95, 297, 365, 297, 448];
var vars = {
    inited: false,
    t: ["h", "m", "s"],
    step: 1000 / conf.steps
};

function ci(c, i) {
    var k = i * 6;
    return ["M"].concat(c.slice(k, k + 2), ["C"], c.slice(k + 2, k + 8)).join(" ");
}

function setCurve(id, val) {
    var e = document.getElementById(id);
    if (e !== null) e.setAttribute("d", val);
}

function setDigit(t, d) {
    for (var i = 0; i < 4; i++) {
        setCurve(t + "p" + i, ci(d, i));
    }
}

function ease(x, t, b, c, d) {
    if (typeof easing !== 'undefined' && typeof easing[conf.easing] === 'function') {
        return easing[conf.easing](x, t, b, c, d);
    }
    return 0;
}

function morph(a, b, s) {
    return a.map(function(v, i) {
        var e = ease(null, s, 0, 1, conf.steps);
        return v + e * (b[i] - v);
    });
}

function toDigitArray(str) {
    return str.split('').map(function(v) {
        return parseInt(v);
    });
}

function getTime(date) {
    var s = date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1").split(":");
    return {
        'h': toDigitArray(s[0]),
        'm': toDigitArray(s[1]),
        's': toDigitArray(s[2])
    };
}

$(document).ready(function(){
    var timestart = performance.now();

    var timerId = setInterval(function () {
        var x = (performance.now() - timestart) | 0;
        var now = new Date(timestamp + x);
        var time = getTime(now);
        var nTime = getTime(new Date(now.getTime() + 1000));
        var cStep = now.getMilliseconds() / vars.step;
        vars.t.map(function(t) {
            for (var i = 0; i < 2; i++) {
                var d = time[t][i],
                    nd = nTime[t][i];
                if (d != nd || !vars.inited) {
                    setDigit(t + i, morph(dd[d], dd[nd], cStep));
                }
            }
        });
        inited = true;

    }, vars.step);

    var select = document.getElementById("easing");
    Object.getOwnPropertyNames(easing).forEach(function(val, idx, array) {
        var option = document.createElement("option");
        option.text = val;
        option.value = val;
        if (conf.easing == val){
            option.selected = true;
        }
        select.add(option);
    });

});

