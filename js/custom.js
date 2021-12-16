// 向左循环播放字母
var speed=20; //数字越大速度越慢
function Marquee0(){
    var colee_left=document.getElementsByClassName("colee_left");
    var colee_left1=document.getElementsByClassName("colee_left1");
    var colee_left2=document.getElementsByClassName("colee_left2");
    for (j=0;j<colee_left.length;j++) {
        colee_left2[j].innerHTML=colee_left1[j].innerHTML+colee_left1.innerHTML;
    if(colee_left2[j].offsetWidth-colee_left[j].scrollLeft<=0)
    {colee_left[j].scrollLeft-=colee_left1[j].offsetWidth;}
    else{
        colee_left[j].scrollLeft++;
    }
}
}

//向右循环播放字母
function Marquee1(){
    var colee_right2=document.getElementsByClassName("colee_right2");
    var colee_right1=document.getElementsByClassName("colee_right1");
    var colee_right=document.getElementsByClassName("colee_right");
    for (i=0; i<colee_right.length; i++) {
        colee_right2[i].innerHTML=colee_right1[i].innerHTML;
    if(colee_right[i].scrollLeft<=0)
    {colee_right[i].scrollLeft+=colee_right2[i].offsetWidth;}
    else{
    colee_right[i].scrollLeft--;
    }
}
}

//方型模特图循环播放
var indicator = 1;
setInterval(function() {
    var squareModel = document.getElementById("square_model");
    if (indicator==3) {
        indicator=1;
    }
    else {
        indicator++;
    }
    squareModel.src="images/square_model"+indicator+".jpg";
}, 1500);


//动效随滚动出现
var hasBloomed = false;
function animation(el) {
    var windowHeight = jQuery( window ).height();
    $(el).each(function(){
        var thisPos = $(this).offset().top;
        var topOfWindow = $(window).scrollTop();
            if (topOfWindow + windowHeight - 200 > thisPos ) {
                if (el == "#draw_face") {
                    $(this).addClass("show");
                }
                else if (el == "#flower" && !hasBloomed) {
                    $(this).attr("src", "images/flower.gif");
                    hasBloomed = true;
                }
                else if (el == "#sticker") {
                    $(this).addClass("zoom");
                }
                else if (el == "#needle") {
                    $(this).addClass("fly");
                }
                else if (el == "#model_rect") {
                    $(this).addClass("rotate");
                }
            }
            if (topOfWindow + windowHeight - 450 > thisPos ) {
                if (el == "#badge") {
                    $(this).addClass("hinge");
                }
            }
    });
}


function scrollToMyDiv(element) {
    window.scroll({
      top: element.offsetTop, 
      behavior: 'smooth'
    });
}

//滑动
const swiper = new Swiper('.swiper', {
    autoHeight: true
});

//判断左右滑动执行笑脸跳动
var moveX,      //手指滑动距离
    moveY,
    cout = 0,   //滑动计数器
    verticalCout = 0;
var smile = document.getElementById("smile_face"); //提取笑脸
var swipe = document.querySelector(".swiper");   //滑动对象
var bodySwipe = document.querySelector("#vertical_swipe"); //整页滑动对象
var translate = 0; //记录当前translate值

//触摸开始
function boxTouchStart(e){
    var touch = e.touches[0];   //获取触摸对象
    startX = touch.pageX;
    startY = touch.pageY;
    //e.preventDefault();
}

function boxTouchMove(e){
    var touch = e.touches[0];
    moveX = touch.pageX - startX;
    moveY = touch.pageY - startY;
    //e.preventDefault();

    if (( Math.abs(moveX) > Math.abs(moveY) && moveX > 0 ) || ( Math.abs(moveX) > Math.abs(moveY) && moveX < 0)) { //左滑或者右滑
        if(cout == 0 && moveX > 0){     //刚开始第一次向左滑动时
            return false;
        }

        if(cout == 3 && moveX < 0){     //滑动到最后继续向右滑动时
            return false;
        }
        smile.src="images/smile_face.gif"; //滑动时替换成gif
    }
    else {
        if(verticalCout == 0 && moveY>0) {
            return false;
        }
        if(verticalCout == 2 && moveY<0) {
            return false;
        }
    }
}


function boxTouchEndSwiper(e){
       //手指向左滑动
        if( Math.abs(moveX) > Math.abs(moveY) && moveX < 0){
            if((cout<3) && (swiper.translate!=translate)){ //已滑动到下一屏
                cout++;
                translate = swiper.translate;
            }
        }
        //手指向右滑动
        else if (Math.abs(moveX) > Math.abs(moveY) && moveX > 0){
            //滑动到初始状态时返回false
            if(cout == 0){
                return false;
            }
            else{
                if (swiper.translate!=translate){
                    cout--;
                    translate = swiper.translate;
                }
            }
        }

}


function boxTouchEndVertical(e){
    var section1 = document.getElementById("section1");
    var section2 = document.getElementById("section2");
    var section3 = document.getElementById("section3"); 

    if ((Math.abs(moveY) > Math.abs(moveX) && moveY > 0)) { //向上滑动
        if (verticalCout == 1) {
            scrollToMyDiv(section1); //到第一屏
             //第二屏动画退出
             $(".coin1").eq(0).removeClass("animate__animated animate__bounceInDown").addClass("animate__animated animate__bounceOutDown hidden");
             $("#coin2").removeClass("animate__animated animate__bounceInDown").addClass("animate__animated animate__bounceOutDown hidden");
             $("#screen2_model1").removeClass("animate__animated animate__slideInRight").addClass("animate__animated animate__slideOutRight hidden");
             $("#screen2_model2").removeClass("animate__animated animate__slideInLeft").addClass("animate__animated animate__slideOutLeft hidden");

            verticalCout--;
        }
        else if (verticalCout == 2) {
            scrollToMyDiv(section2); //到第二屏
            //第三屏动画退出
            $("#p3_text1").removeClass("animate__animated animate__slideInLeft").addClass("animate__animated animate__slideOutLeft hidden");
            $("#p3_back1").removeClass("animate__animated animate__bounceInRight").addClass("animate__animated animate__bounceOutRight hidden");
            $("#p3_model1").removeClass("animate__animated animate__bounceInRight").addClass("animate__animated animate__bounceOutRight hidden");
            $("#p3_back2").removeClass("animate__animated animate__bounceInLeft").addClass("animate__animated animate__bounceOutLeft hidden");
            $("#p3_model2").removeClass("animate__animated animate__bounceInLeft").addClass("animate__animated animate__bounceOutLeft hidden");
            $("#p3_text2").removeClass("animate__animated animate__slideInRight").addClass("animate__animated animate__slideOutRight hidden");

            //第二屏动画进入
            $(".coin1").eq(0).removeClass("animate__animated animate__bounceOutUp").addClass("animate__animated animate__bounceInDown visible");
            $("#coin2").removeClass("animate__animated animate__bounceOutUp").addClass("animate__animated animate__bounceInDown visible");
            $("#screen2_model1").removeClass("animate__animated animate__slideOutRight").addClass("animate__animated animate__slideInRight visible");
            $("#screen2_model2").removeClass("animate__animated animate__slideOutLeft").addClass("animate__animated animate__slideInLeft visible");
            //第三屏动画退出
            verticalCout--;
        }
        else {
            return false;
        }
    }
    else if (( Math.abs(moveY) > Math.abs(moveX) && moveY < 0 )) { //向下滑动
         if (verticalCout == 0) {
             scrollToMyDiv(section2); //到第二屏
             //第二屏动画进入
             //变成big
            $(".coin1").eq(0).removeClass("animate__animated animate__bounceOutDown").addClass("animate__animated animate__bounceInDown visible");
            $("#coin2").removeClass("animate__animated animate__bounceOutDown").addClass("animate__animated animate__bounceInDown visible");
            $("#screen2_model1").removeClass("animate__animated animate__slideOutRight").addClass("animate__animated animate__slideInRight visible");
            $("#screen2_model2").removeClass("animate__animated animate__slideOutLeft").addClass("animate__animated animate__slideInLeft visible");
             verticalCout++;
         }
         else if (verticalCout == 1) {
             scrollToMyDiv(section3); //到第三屏
             //第二屏动画退出
             $(".coin1").eq(0).removeClass("animate__animated animate__bounceInDown").addClass("animate__animated animate__bounceOutUp hidden");
             $("#coin2").removeClass("animate__animated animate__bounceInDown").addClass("animate__animated animate__bounceOutUp hidden");
             $("#screen2_model1").removeClass("animate__animated animate__slideInRight").addClass("animate__animated animate__slideOutRight hidden");
             $("#screen2_model2").removeClass("animate__animated animate__slideInLeft").addClass("animate__animated animate__slideOutLeft hidden");

             //第三屏动画进入
             $("#p3_text1").removeClass("animate__animated animate__slideOutLeft").addClass("animate__animated animate__slideInLeft visible");
             $("#p3_back1").removeClass("animate__animated animate__bounceOutRight").addClass("animate__animated animate__bounceInRight visible");
             $("#p3_model1").removeClass("animate__animated animate__bounceOutRight").addClass("animate__animated animate__bounceInRight visible");
             $("#p3_back2").removeClass("animate__animated animate__bounceOutLeft").addClass("animate__animated animate__bounceInLeft visible");
             $("#p3_model2").removeClass("animate__animated animate__bounceOutLeft").addClass("animate__animated animate__bounceInLeft visible");
             $("#p3_text2").removeClass("animate__animated animate__slideOutRight").addClass("animate__animated animate__slideInRight visible");



             verticalCout++;
         }
         else {
             return false;
         }
    } 
}

//滑动对象事件绑定
swipe.addEventListener("touchstart", boxTouchStart, false);
swipe.addEventListener("touchmove", boxTouchMove, false);
swipe.addEventListener("touchend", boxTouchEndSwiper, false);
bodySwipe.addEventListener("touchstart", boxTouchStart, false);
bodySwipe.addEventListener("touchmove", boxTouchMove, false);
bodySwipe.addEventListener("touchend", boxTouchEndVertical, false);





var unmuteButton = document.getElementById("unmuteButton");
var audio = document.getElementById("audio");
function switchMute() {
    if (audio.muted) {
        audio.muted = false;
        unmuteButton.src="images/sound.png";
    }
    else {
        audio.muted = true;
        unmuteButton.src="images/no-sound.png";
    }
};

function responsiveOpening() {
    //开屏动画自适应
    var h = document.body.offsetHeight;
    var w = document.body.offsetWidth;
    var opening_element = document.getElementById("opening_element");
    var opening_plane = document.getElementById("opening_plane");
    if (h/w>=1.775) {
        opening_element.style.width="100%";
        opening_element.style.height="auto";
        opening_plane.style.width="100%";
        opening_plane.style.height="auto";
    }
    else {
        opening_element.style.width="auto";
        opening_element.style.height="100%";
        opening_plane.style.width="auto";
        opening_plane.style.height="100%";
    }
}


function calculatePosition() {
        //提取屏幕body宽度
        screenWidth = $("body").width();

        //section1中的高度
        section1Height = (screenWidth * 900 / 640);
        $("#section1").css("height", (section1Height+"px"));
    
        //循环字幕大小
        $(".banner").each(function() {
            $(this).css("height", 0.05*section1Height+"px");
        });
    
        //笑脸位置
        $("#smile_face").css({"margin-left": 0.12*screenWidth+"px", "margin-top": 0.08*section1Height+"px"});
    
        //p1 model的大小
        $(".model_size").each(function() {
            $(this).css("max-height", 0.7*section1Height+"px");
        });
    
        //滑动解锁大小
        arrowHeight = $("#t1").height();
        $("#swipe_more").css("height", 1.2*arrowHeight+"px");
    
        //section2中的高度
        section2Height = (screenWidth * 2118 / 1278);
        $("#section2").css("height", (section2Height+"px"));
        
        //两个笑脸硬币的位置
        $("#screen2_model1").css({"margin-top":-0.45*section2Height+"px","height":0.5*section2Height+"px"});
        $("#screen2_model2").css({"margin-top":-0.05*section2Height+"px","height":0.55*section2Height+"px"});
        $(".coin1").eq(0).css({"margin-top": 0.3*section2Height+"px", "margin-left":0.25*screenWidth+"px"});
        $("#coin2").css({"margin-top": -0.5*section2Height+"px", "margin-right":0.15*screenWidth+"px"});
    
    
        //section3中的高度
        section3Height = (screenWidth * 2257 / 1282);
        $("#section3").css({"height": section3Height+"px", 
        "background-image": "url(./images/SUXD.gif), url(./images/SUXD.gif), url(./images/p3_background.png)", 
        "background-repeat": "no-repeat, no-repeat, no-repeat",
        "background-position": "top "+0.05*section3Height+"px left "+0.01*screenWidth+"px, top "+0.4*section3Height+"px left "+0.48*screenWidth+"px, top left",
        "background-size": "60% auto, 60% auto, 100% auto"});
    
        //p3_text1位置
        $("#p3_text1").css({"margin-top": 0.05*section3Height+"px", "padding-left": 0.23*screenWidth+"px"});
    
        //p3_model1位置
        $("#p3_back1").css({"top": "-"+0.28*screenWidth+"px", "left": 0.48*screenWidth+"px"});
        $("#p3_model1").css({"top": "-"+0.11*screenWidth+"px", "left": 0.48*screenWidth+"px"});
    
        //p3_text2位置
        $("#p3_text2").css({"margin-top": 0.37*section3Height+"px"});
    
        //square section中的高度
        squareSectionHeight = (screenWidth * 1356 / 1279);
        $("#square_section").css("height", (squareSectionHeight+"px"));
    
        //徽章高度
        $("#badge").css("margin-top", "-"+0.07*squareSectionHeight+"px");
    
        //方型模特图高度
        $("#square_model").css({"top": "-"+0.05*squareSectionHeight+"px","left": 0.08*screenWidth+"px"});
    
        //section4的高度
        section4Height = (screenWidth * 5440/ 1283);
        $("#section4").css("height", (section4Height+"px"));
    
        //带有黄色背景的模特图位置
        $("#model_rect").css({"margin-top": 0.3*section4Height+"px", "margin-left": 0.07*screenWidth+"px"});
    
        //线形笑脸高度
        $("#draw_face").css("margin-top", "-"+0.015*section4Height+"px");
    
        //section5的高度
        section5Height = (screenWidth * 4786/ 1282);
        $("#section5").css({"height": section5Height+"px", 
        "background-image": "url(./images/ring.gif), url(./images/p5_background.png)", 
        "background-repeat": "no-repeat, no-repeat",
        "background-position": "top "+0.71*section5Height+"px left -"+0.1*screenWidth+"px, top left",
        "background-size": "45% auto, 100% auto"});
    
        //行走的小杯子高度
        $("#walking_cup").css("padding-top", 0.17*section5Height+"px");
    
        //第一个黑色循环字幕高度
        $("#black_colee1").css("margin-top", 0.053*section5Height+"px");
     
        //小花花高度
        $("#flower").css("margin-top", 0.27*section5Height+"px");
    
        //漂浮的模特图位置
        $("#floating_model").css("margin-top", +0.4*section5Height+"px")
    
        //贴纸位置
        $("#sticker").css("margin-left", 0.06*screenWidth+"px");
    
        //section6高度
        section6Height = (screenWidth * 2771 / 1282);
        $("#section6").css("height", (section6Height+"px"));
    
        //第二个黑色循环字幕高度
        $("#black_colee2").css("padding-top", 0.98*section6Height+"px");
    
        //section7高度
        section7Height = (screenWidth * 4785 / 1282);
        $("#section7").css("height", (section7Height+"px"));
    
        //针筒的高度
        $("#needle").css("margin-top", 0.28*section7Height+"px");
    
        //旋转笑脸硬币位置
        $(".coin1").eq(1).css({"margin-top": 0.56*section7Height+"px", "margin-left": 0.15*screenWidth+"px"});
    
        //section8高度
        section8Height = (screenWidth * 2868 / 1281);
        $("#section8").css("height", (section8Height+"px"));
    
        //视频位置
        $("#video").css({"top": 0.71*section8Height+"px", "left": 0.05*screenWidth+"px"});
        
        //第三个黑色循环字幕高度
        $("#black_colee3").css("margin-top", 0.79*section8Height+"px");
    
        //section9高度
        section9Height = (screenWidth * 750 / 1283);
        $("#section9").css("height", (section9Height+"px"));
    
        //底部硬币的位置
        $("#bottom_coin1").css({"margin-top": 0.12*section9Height+"px", "margin-left": 0.5*screenWidth+"px"});
        $("#bottom_coin2").css("margin-top", "-"+0.2*section9Height+"px");
    
        //底部奔跑的心心位置
        $(".running_heart").eq(1).css("margin-top", "-"+0.2*section9Height+"px");
}


var ids = ["#draw_face", "#flower", "#sticker", "#needle", "#model_rect", "#badge"];
$(document).ready(function() {
    var openingPlane = '<img src="images/opening_plane.gif" id="opening_plane" style="z-index: 40;">';
    var openingSmoke = '<img src="images/opening_smoke.gif" class="opening_scale" style="z-index: 30;">';
    var openingElement = '<img src="images/opening_element.gif" id="opening_element" style="z-index: 20;">';
    var openingBackground = '<img src="images/opening_background.gif" class="opening_scale " style="z-index: 10;"></img>';
    setInterval(Marquee0,speed);
    setInterval(Marquee1,speed);
    document.onreadystatechange = function () {//即在加载的过程中执行下面的代码
        if(document.readyState=="complete"){//complete加载完成
            $("#opening").append([openingPlane,openingSmoke,openingElement,openingBackground]);
            responsiveOpening();
            setTimeout(function(){
                $("#opening").fadeOut();
                $("html").removeClass("no_scroll");
                $("body").removeClass("no_scroll");
                $("#body").removeClass("hidden");
            },3000);
        }
    }
    for(let i=0; i<ids.length; i++) {
        animation(ids[i]);
    }
    calculatePosition();
});

//Recalculate the element sizes if the window is resized
$(window).resize(function() {
    calculatePosition();
});

// if the image in the window of browser when scrolling the page, show that image
$(window).scroll(function() {
    for(let i=0; i<ids.length; i++) {
        animation(ids[i]);
    }
});