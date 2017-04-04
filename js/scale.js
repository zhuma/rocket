/**
 * Created by hanshaojie-pc on 2017/4/4.
 */
var scaleW = window.innerWidth / 750;
var scaleH = window.innerHeight / 1205;
var resizes = document.querySelectorAll('.resize');
for (var j = 0; j < resizes.length; j++) {
    resizes[j].style.width = parseInt($(resizes[j]).css("width")) * scaleW + 'px';
    resizes[j].style.height = parseInt($(resizes[j]).css("height")) * scaleH + 'px';
    resizes[j].style.top = parseInt($(resizes[j]).css("top")) * scaleH + 'px';
    resizes[j].style.left = parseInt($(resizes[j]).css("left")) * scaleW + 'px';
}