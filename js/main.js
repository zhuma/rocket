/**
 * Created by hanshaojie-pc on 2017/4/3.
 */

/*
*
* 禁止滑动
* */

document.body.ontouchstart = document.body.ontouchmove= function (e) {e.preventDefault();};

//获取设备宽高
var w = $(window).width();
var h = $(window).height();

//设置container为设备屏幕宽高
$(function () {
    var oC = $(".container,.rules-con,.g-container,.count-down");
    oC.css({
        width:w + "px",
        height:h + "px"
    })
});

//开始游戏和显示游戏规则
$(function () {
    var oStart = $("#start");
    var oRuleBth = $("#rules");
    var oClose = $(".close");
    var oRulesCon = $(".rules-con");
    //显示规则
    oRuleBth.click(function () {
        showRule();
    });
    oRuleBth.on("touchstart",function () {
        showRule();
    });
    oRuleBth.on("touchmove",function () {
        showRule();
    });
    //关闭规则
    oClose.click(function () {
        hideRule();
    });
    oClose.on("touchstart",function () {
        hideRule();
    });
    oClose.on("touchmove",function () {
        hideRule();
    });
    //开始游戏
    oStart.click(function () {
        startGame();
    });
    oStart.on("touchstart",function () {
        startGame();
    });
    oStart.on("touchmove",function () {
        startGame();
    });
    function showRule(){
        oRulesCon.show().removeClass("a-bounceoutB").addClass("a-fadeinT");
    }
    function hideRule() {
        oRulesCon.removeClass("a-fadeinT").addClass("a-bounceoutB");
        setTimeout(function () {
            oRulesCon.hide();
        },1000);
    }
    function startGame() {
        location.href = "game.html";
    }
});

//移动的背景
$(function () {
   var oMove = $(".move");
   var iSW = $(window).width() / 750;
   var iSH = $(window).height() / 1205;
   oMove.css({
       width:oMove.width() * iSW + "px",
       height:oMove.height() * iSH + "px"
   });
});
function move(s) {
    var oMoveBg = $("#moveBg");
    var oRocket = $("#rocket");
    var aImg = $(".cImg");
    var oNum = $("#num");
    var timer = null;
    clearInterval(timer);
    timer=setInterval(function(){
        var iSpeed=(-14472 - parseInt(oMoveBg.css("bottom")))/s;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        if(parseInt(oMoveBg.css("bottom")) === -14472){
            clearInterval(timer);
        }
        else{
            oMoveBg.css({
                bottom:parseInt(oMoveBg.css("bottom")) + iSpeed + "px"
            });
            oRocket.css({
                top:parseInt(oRocket.css("top")) + iSpeed  + "px"
            });
        }
        aImg.each(function (i) {
            if(touchTest($(this),oRocket)){
                $(this).hide();
                oNum.text((i+1) * 10);
            }
        })
    },30);
}

//加速
function speedUp() {
    var oSpeed = $("#speed");
    oSpeed.on({
        touchstart: function(){
            move(7000);
        },
        touched: function () {
            move(9000);
        }
    });
}


//321倒计时
function countDown() {
    var t = null;
    t = setInterval(function () {
        var oCur = $("#count-down-num");
        var curVal = oCur.text();
        if(parseInt(curVal) === 1){
            clearInterval(t);
            $(".count-down").hide();
        }
        oCur.text(curVal - 1);
    },1000);
}

//游戏时长倒计时
function timeDuration(){
    var oDur = $("#duration");
    var t = null;
    t = setInterval(function () {
        var curTime = parseInt(oDur.text()) - 1;
        if(curTime <= 0){
            clearInterval(t);
            setTimeout(function () {
                alert("GAME OVER");
                location.href = "index.html";
            },500);
        }
        oDur.text(curTime + "s");
    },1000);
}

//左右移动火箭

function leftAndRight() {
    var oLeft = $("#left");
    var oRight = $("#right");
    oLeft.click(function () {
        moveRocket(-10);
    });
    oLeft.on("touchstart",function () {
        moveRocket(-10);
    });
    oLeft.on("touchmove",function () {
        moveRocket(-10);
    });
    oRight.click(function () {
        moveRocket(10);
    });
    oRight.on("touchstart",function () {
        moveRocket(10);
    });
    oRight.on("touchmove",function () {
        moveRocket(10);
    });
}

function moveRocket(arg) {
    var oRocket = $("#rocket");
    var curLeft = parseInt(oRocket.css("left")) + arg;
    var curW = oRocket.width() / 2 - 30;
    if(curLeft <= -curW){
        curLeft = -curW;
    }

    if(curLeft >= w - oRocket.width() + curW){
        curLeft = w - oRocket.width() + curW;
    }

    oRocket.css({
        left:curLeft + "px"
    });
}
//碰撞检测
function touchTest(arg1,arg2){
    var l1=parseInt(arg1.css("left"));
    var t1=parseInt(arg1.css("top"));
    var r1=parseInt(arg1.css("left")) + parseInt(arg1.css("width"));
    var b1=parseInt(arg1.css("top")) + parseInt(arg1.css("height"));

    var l2=parseInt(arg2.css("left"));
    var t2=parseInt(arg2.css("top"));
    var r2=parseInt(arg2.css("left")) + parseInt(arg2.css("width"));
    var b2=parseInt(arg2.css("top")) + parseInt(arg2.css("height"));

    if(r2<l1 || b2<t1 || l2>r1 || t2>b1){
        return false;
    }
    else
    {
        return true;
    }
}






