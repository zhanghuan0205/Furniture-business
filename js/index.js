/**
 * Created by fuu on 2017/5/24.
 */

/**
 * 这是首页的js文件
 */

//购物车点击事件
shoppingCar();
goodsNum(".addNum .counts .add", ".addNum .counts .reduce", ".addNum input");
//购物车页面数量增减
goodsNum(".add1", ".reduce1", ".key input");
// 点击购物车显隐购物车
function shoppingCar() {
    $(document).on("click", "#loginLogo a:last", function () {
        $("#shopping").toggle(-130);
        var hasShop = $(this).hasClass("shoppCaradd");
        if (hasShop) {
            $(this).removeClass("shoppCaradd");
        } else {
            $(this).addClass("shoppCaradd");
        }
    });
}
/**********************************************************************************/
// 点击缩略图显示相应大图
$(document).on("click", ".leftGoods .litImg ul li", function () {
    showIndexMainImg(this, ".leftGoods .leftUl li");
});
$(document).on("click", ".rightImg ul li", function () {
    showIndexMainImg(this, ".leftImgs .leftUls li");
});
function showIndexMainImg(idx, bigImg) {
    var theIndex = $(idx).index();
    $(idx).addClass("selected").siblings().removeClass("selected");
    $(bigImg).eq(theIndex).fadeIn(500).siblings().fadeOut(500);
}
//详情页面加入购物车事件
function goodsNum(adds, reduces, inputs) {
    // 获取input输入框的库存量
    var inventory = parseInt($(".quantity span:last").text());
    var inputNum = parseInt($(inputs).val());
    if (inputNum === 0) {
        $(reduces).addClass("disabled");
    }
    else if (inputNum >= inventory) {
        $(adds).addClass("disabled");
        $(inputs).val(inventory);
    }
    //增加数量
    $(document).on("click", adds, function () {
        var curCount = parseInt($(inputs).val());
        // 若当前数量小于总库存量
        if (curCount < inventory) {
            $(inputs).val(curCount + 1);
            $(reduces).removeClass("disabled");
        }
        // 若当前数量小于总库存量,并在加1后等于库存总量
        else if (curCount === (inventory - 1)) {
            $(inputs).val(curCount + 1);
            $(adds).addClass("disabled");
            $(reduces).removeClass("disabled");
        }
    });
    //减少数量
    $(document).on("click", reduces, function () {
        var curCount = parseInt($(inputs).val());
        if (curCount > 1) {
            $(inputs).val(curCount - 1);
            $(adds).removeClass("disabled");
        }
        else if (curCount === 1) {
            $(inputs).val(curCount - 1);
            $(reduces).addClass("disabled");
            $(adds).removeClass("disabled");
        }
    });
}
/******************************************************************************/
//注册页面
$(".fourcase button").click(function () {
    var showCon1 = '<div class="showCon"><p>注册成功</p><button>确定</button></div>';
    var showCon2 = '<div class="showCon"><p>两次密码输入不一致</p><button>重输</button></div>';
    var showCon3 = '<div class="showCon"><p>账户名格式错误</p><button>重输</button></div>';

    if (/^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/
            .test($("#idNumber").val())) {
        if ($("#enterPsw").val() === $("#affirmPsw").val()) {
            $("body").append(showCon1);
            $(".showCon button").click(function () {
                location.href = 'login.html';
            });
            var infoObj = {}, infoArr = [];
            if (localStorage.getItem("info") === null) {
                infoArr = [];
            } else {
                infoArr = JSON.parse(localStorage.getItem("info"));
            }
            infoObj.Username = $("#idNumber").val();
            infoObj.psw = $("#enterPsw").val();
            infoArr.push(infoObj);
            localStorage.setItem("info", JSON.stringify(infoArr));

        } else if (/^[0-9]*$/.test($("#enterPsw").val()) && ($("#enterPsw").val() !== $("#affirmPsw").val())) {
            $("body").append(showCon2).fadeIn("slow");
            $(".showCon button").click(function () {
                $(".showCon").css("display", "none");
                $("#enterPsw").val("");
                $("#affirmPsw").val("");
            })
        }
    } else {
        $("body").append(showCon3).fadeIn("slow");
        $(".showCon button").click(function () {
            $(".showCon").css("display", "none");
            $("#idNumber").val("")
        })
    }
});
BtnStatus();
/* 提交按钮状态随输入框的输入变化 */
function BtnStatus() {
    // 账号输入触发
    $("#idNumber").keyup(function () {
        var thisLen = $(this).val().length,
            pwdLen = $("#enterPsw").val().length,
            repwdLen = $("#affirmPsw").val().length;
        if (thisLen >= 6 && pwdLen >= 6 && repwdLen >= 6) {
            $(".fourcase button").addClass("active");
        } else {
            $(".fourcase button").removeClass("active");
        }
    });
    // 密码输入触发
    $("#enterPsw").keyup(function () {
        var thisLen = $(this).val().length,
            nameLen = $("#idNumber").val().length,
            repwdLen = $("#affirmPsw").val().length;
        if (thisLen >= 6 && nameLen >= 6 && repwdLen >= 6) {
            $(".fourcase button").addClass("active");
        } else {
            $(".fourcase button").removeClass("active");
        }
    });
    // 确认密码输入触发
    $("#affirmPsw").keyup(function () {
        var thisLen = $(this).val().length,
            nameLen = $("#idNumber").val().length,
            pwdLen = $("#enterPsw").val().length;
        if (thisLen >= 6 && nameLen >= 6 && pwdLen >= 6) {
            $(".fourcase button").addClass("active");
        } else {
            $(".fourcase button").removeClass("active");
        }
    });
}

function scrollWall() {
    /*
     为小圆点添加点击事件
     */
    var slideList = $(".slide"),
        imageList = slideList.children("img"),
        imageList_leng = imageList.length;

    var idots = slideList.next();
    for (var i = 0; i < imageList_leng; i++) {
        idots.append("<span></span>")
    }

    //添加class
    imageList.first().addClass('show');
    idots.children().first().addClass('abc');
    //设置时间
    var imgSlidetime = setInterval(function () {
        cutImg();
    }, 5000);
    //小圆点点击切换图片
    idots.children().click(function () {
        var thisIdx = $(this).index();
        $(this).addClass("abc").siblings().removeAttr("class");
        imageList.eq(thisIdx).addClass("show").siblings().removeAttr("class");
        clearInterval(imgSlidetime);
        imgSlidetime = setInterval(function () {
            cutImg();
        }, 5000);
    });
    //
    function cutImg() {
        //当前值
        var showImage = $(".slide > img.show"),
            showImage_idx = showImage.index();

        var randomNum = Math.round(Math.random() * 3 + 1);
        if (showImage_idx !== imageList_leng - 1) {
            showImage.removeAttr("class").next().addClass("show changebig" + randomNum);
            idots.children().eq(showImage_idx + 1).addClass("abc").siblings().removeAttr("class");
        } else {
            showImage.removeAttr("class");
            imageList.eq(0).addClass("show changebig" + randomNum);
            idots.children().eq(0).addClass("abc").siblings().removeAttr("class");
        }
    }
}
