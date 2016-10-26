/**
 * Created by ray.zang on 2015/11/13.
 */
var loadingHandel = null;

function initLoadingAnimate() {
    var step = 0,
        bg = $('.vip-cvs')[0],
        ctx = bg.getContext('2d'),
        imd = null,
        circ = Math.PI * 2,
        quart = Math.PI / 2,
        lineColor = '#e5007f',
        backforward = false;

    ctx.clearRect(0, 0, 30, 30);
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.lineCap = 'square';
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 2.8;
    imd = ctx.getImageData(0, 0, 120, 120);

    var draw = function(current) {
        ctx.putImageData(imd, 0, 0);
        ctx.beginPath();
        ctx.arc(30, 30, 27, -(quart), ((circ) * current) - quart, backforward);
        ctx.stroke();
    }

    function stepDraw() {
        step += 0.01;
        draw(step);
        if (step >= 0.99) {
            step = 0;
            if (!backforward) {
                backforward = true;
            } else {
                backforward = false;
            }
        }
    }

    loadingHandel = setInterval(stepDraw, 10);
}

function clearLoadingAnimation() {
    clearInterval(loadingHandel);
}

function showLoadingScreen() {
    initLoadingAnimate();
    $('#loading').show();
}

function hideLoadingScreen() {
    clearLoadingAnimation();
    $('#loading').hide();
}
