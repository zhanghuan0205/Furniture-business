/**
 * Created by fuu on 2017/5/27.
 */

var rootUrl = window.location.href;
rootUrl = rootUrl.slice(0, rootUrl.indexOf("huli/") + 5);


// 加载页头信息
$.get(rootUrl + "html/header.html", function (str) {
    $("header").append(str);
    $("#logo").children().eq(0).attr("href", rootUrl + "index.html");
    $(".bgHeader").children().eq(0).attr("src", rootUrl + "images/bg_header.jpg");
    createSelectList(".selArea", "150px", ["成都地区", "北京地区", "深圳地区", "上海地区", "其他地区"]);
    if (localStorage.getItem("loginState") === "success") {
        $("#changelogin").replaceWith($("<a style='background: none;' class='addA'>" + localStorage.getItem("loginUsername") + "</a>"));
        $(".addA").click(function () {
            window.location.href = rootUrl + "html/userInfo/userInfo.html";
        })
    }
});

$("header").on("click", "a", function (event) {
    rootUrl = rootUrl.slice(0, rootUrl.indexOf("huli/") + 5);
    var a = event.target.innerText;
    if (a.match("沙发")) {
        window.location.href = rootUrl + "html/category/sofa.html";
    } else if (a.match("桌椅")) {
        window.location.href = rootUrl + "html/category/table.html";
    } else if (a.match("床")) {
        window.location.href = rootUrl + "html/category/bed.html";
    } else if (a.match("柜")) {
        window.location.href = rootUrl + "html/category/closet.html";
    } else if (a.match("更多")) {
        window.location.href = rootUrl + "html/category/more.html";
    } else if (event.target.id === "changelogin") {
        window.location.href = rootUrl + "html/login.html";
    }
});

$("header").on("click", "#shopping > button", function () {
    window.location.href = rootUrl + "html/shopcar.html";
});

$("header").on("click", ".headLogo > a", function () {
    window.open(rootUrl + "index.html");
});

$(".filter").children().children().children().click(function () {
    $(this).siblings().removeClass("filtered");
    $(this).toggleClass("filtered");
    if ($(this).hasClass("filtered")) {
        $(this).parent().prev().addClass("filtered");
    } else {
        $(this).parent().prev().removeClass("filtered");
    }
});

// 加载页脚信息
$.get(rootUrl + "html/footer.html", function (str) {
    $("footer").append(str);
    $(".pagesmall>img").eq(0).css("background", "url('" + rootUrl + "images/bg.png') no-repeat -264px -232px");
    $(".pagesmall>img").eq(1).css("background", "url('" + rootUrl + "images/bg.png') no-repeat -350px -232px");
});

// 加载主页展示
if (rootUrl === window.location.href || rootUrl + "index.html" === window.location.href.replace(window.location.search, "")) {
    $.get(rootUrl + "html/indexcontent.html", function (str) {
        $("main").append(str);
        scrollWall();
    });
}