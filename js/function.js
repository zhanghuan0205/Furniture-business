/**
 * 这里是一些方便使用的函数
 */

/**
 * 在锚点内部生成一个下拉式选择菜单
 * @param anchor 锚点，下拉菜单的父元素（字符串：jQuery选择器）
 * @param width 下拉菜单的宽度（字符串：像素）
 * @param array 下拉菜单的数据 （字符串的数组）
 */
function createSelectList(anchor, width, array) {
    var rooter = $("<div class='select-list'><p><i></i><i>&gt;</i></p></div>"),
        theList = $("<dl></dl>").slideUp();
    array.forEach(function (item) {
        theList.append("<dt>" + item + "</dt>");
    });
    rooter.children("p").children().eq(0).text(array[0]);
    rooter.append(theList);
    rooter.css("width", width);
    rooter.children().children().eq(0).css("width", "calc(" + width + " - 34px");
    $(anchor).append(rooter);
    rooter.children("p").click(function () {
        var txtBox = $(this).children().eq(0);
        $(this).siblings().slideDown("fast");
        $(this).siblings().children().click(function () {
            txtBox.text($(this).text());
            $(this).parent().slideUp("fast");
        });
        $(this).parent().mouseleave(function () {
            $(this).children("dl").slideUp("fast");
        })
    })
}

/**
 * 弹出一个确认对话框
 * @param title 对话框的标题
 * @param msg 对话框提示内容
 * @param callBack 确认后要进行的操作函数
 * @param arg 操作函数需要传入的参数
 */
function confirmBox(title, msg, callBack, arg) {
    var box = $("<div class='confirmBox'>" +
        "<h1>" + title + "</h1>" +
        "<p>" + msg + "</p>" +
        "<p><button type='button'>确定</button>" +
        "<button type='button'>取消</button></p></div>");
    var btns = box.children().eq(2).children();
    $("body").append(box).fadeIn("slow");
    btns.eq(0).click(function () {
        box.fadeOut("slow");
        if (callBack)
            callBack(arg);
    });
    btns.eq(1).click(function () {
        box.fadeOut("slow");
    })
}

/**
 * 杂类 *****************************************
 */

// 个人信息页1
function info1() {
    $.get("page1.html", function (str) {
        $(".userInfo").append(str);
        var year = [], month = [], day = [];
        var i = 0;
        for (i = 1960; i <= 2017; i++) {
            year.push(String(i));
        }
        for (i = 1; i <= 12; i++) {
            month.push(String(i).length === 1 ? "0" + String(i) : String(i));
        }
        for (i = 1; i <= 31; i++) {
            day.push(String(i).length === 1 ? "0" + String(i) : String(i));
        }
        createSelectList("#birthday", "138px", year);
        createSelectList("#birthday", "88px", month);
        createSelectList("#birthday", "88px", day);
        $.getJSON("../../json/data.json", function (obj) {
            createSelectList("#preference", "188px", obj.selectList.preference);
            createSelectList("#education", "188px", obj.selectList.education);
            createSelectList("#profession", "188px", obj.selectList.profession);
            createSelectList("#address", "128px", obj.selectList.address);
            createSelectList("#address", "128px", obj.selectList.address);
            createSelectList("#address", "128px", obj.selectList.address);
            createSelectList("#address", "128px", obj.selectList.address);
        });
        var count = 0;
        $(".myInfo > input[type='text']").change(function () {
            if ($(this).val() !== "") count++; else count--;
            if (count === 3 && $(".myInfo > input[type='radio']").val() !== "") {
                $(".myInfo").next().prop("disabled", false);
                $(".myInfo").next().removeClass("color-switch-disabled");
            } else {
                $(".myInfo").next().prop("disabled", true);
                $(".myInfo").next().addClass("color-switch-disabled");
            }
        })
    })
}

// 个人信息页2
function info2() {
    $.get("page2.html", function (str) {
        $(".userInfo").append(str);
        $("a.cancel").click(function () {
            var a = $(this).parent().parent().prev();
            if (a.text() !== "已取消") {
                confirmBox("取消订单", "您是否要取消该订单？成功取消之后货款将在3-7个工作日内返还至你的支付账号。", function () {
                    a.text("已取消");
                })
            } else {
                confirmBox("取消订单", "订单已被取消。");
            }
        });
        $("a.delete").click(function () {
            var a = $(this);
            confirmBox("删除订单", "您是否要删除该订单信息？删除后不再显示该订单。", function () {
                a.parents("tr").remove();
            })
        });
        var b = $(".myInfoTable > tbody > tr:first");
        for (var i = 0; i < 4; i++) {
            b.after(b.clone(true));
        }
    })
}

// 个人信息页3
function info3() {
    $.get("page3.html", function (str) {
        $(".userInfo").append(str);
        var b = $(".myInfoTable > tbody > tr:first");
        b.after(b.clone());
        b.children().eq(5).text("已出售");
        $("a.reduction").each(function () {
            var b = $(this);
            if ($(this).parent().parent().prev().prev().text() === "已出售") {
                $(this).addClass("forbid");
                $(this).attr("href", "javasrcipt:;");
                $(this).parent().next().children().eq(2).addClass("forbid");
                $(this).parent().next().children().eq(2).attr("href", "javasrcipt:;");
            } else {
                b.click(function () {
                    info3_2();
                });
                $(this).parent().next().children().eq(2).click(function () {
                    var a = $(this).parent().parent().prev().prev();
                    if (a.text() !== "已取消") {
                        confirmBox("取消订单", "您是否要取消该订单？成功取消之后货款将在3-7个工作日内返还至你的支付账号。", function () {
                            a.text("已取消");
                            b.addClass("forbid");
                            b.attr("href", "javasrcipt:;");
                        });
                    } else {
                        confirmBox("取消订单", "订单已被取消。");
                    }
                })
            }
        });
        $("a.delete").click(function () {
            var a = $(this);
            confirmBox("删除消息", "您是否要删除该出售信息？删除后不再显示该出售信息。", function () {
                a.parents("tr").remove();
            })
        });
    })
}

// 降价申请页
function info3_2() {
    $.get("reduction.html", function (str) {
        $(".userInfoSwitch").nextAll().remove();
        $(".userInfo").append(str);
        var b = $(".myInfoTable > tbody > tr:first");
        b.after(b.clone());
        b.children().eq(2).children().eq(0).text("商品已下单");
        $(".state").each(function () {
            var a = $(this).children().eq(0);
            if (a.text() === "商品未卖出") {
                a.css("display", "none");
            } else {
                a.nextAll().remove();
            }
        });
        $("button:contains('返回')").click(function () {
            $(".userInfoSwitch").nextAll().remove();
            info3();
        })
    })
}

// 个人信息页4
function info4() {
    $.get("page4.html", function (str) {
        $(".userInfo").append(str);
    })
}

// 个人信息页5
function info5() {
    $.get("page5.html", function (str) {
        $(".userInfo").append(str);
        $(".msgItem > label").click(function () {
            $(this).children().eq(0).toggleClass("marked");
        });
        $(".msgItem > div").click(function () {
            if (!$(this).hasClass("unfold")) {
                $(this).next().css("display", "none");
                $(this).parent().css("height", "166px");
                $(this).addClass("unfold");
            } else {
                $(this).next().css("display", "inline-flex");
                $(this).parent().css("height", "88px");
                $(this).removeClass("unfold");
                $(this).css("color", "#888");
            }
        });
        $.getJSON("../../json/notice.json", function (array) {
            var leng = array.length;
            $(".notice").text(leng);
            for (var i = 0; i < leng - 1; i++) {
                $(".infoBox").append($(".msgItem:first").clone(true));
            }
            for (var j = 0; j < leng; j++) {
                $(".msgItem").eq(j).children().children().eq(0).text(array[j]);
            }
        });
        $(".notice").text($(".msgItem").length);
        $(".myMsg > button").click(function () {
            if ($(".msgItem > label > span").hasClass("marked")) {
                confirmBox("删除消息", "您是否要删除选中的消息？删除后不再显示该消息。", function () {
                    $(".msgItem > label > span.marked").parents(".msgItem").remove();
                    $(".notice").text($(".msgItem").length);
                });
            } else {
                confirmBox("", "您还没有标记要删除的消息，请至少标记一条消息再执行该操作。");
            }
        });
    })
}

function loadCategory(idx) {
    idx -= 1;
    $.getJSON("../../json/data.json", function (obj) {
        var arr = obj.navigation;
        var banner = $("<h1>" + arr[idx].category +
            "</h1><div class='typeSwitch'>" +
            "<button>全部</button></div>");
        $(".typeBanner").append(banner);
        arr[idx].type.forEach(function (item) {
            $(".typeSwitch").append($("<button>" + item + "</button>"));
        });

        var goods = $("<a><div class='imgShow'>" +
            "<img src=../../" + arr[idx].goods.img +
            "></div><div class='goodsInfo'><span>" + arr[idx].goods.name + "</span>" +
            "<span class='oldPrice'>" + arr[idx].goods.oldPrice + "</span>" +
            "<span class='newPrice'>" + arr[idx].goods.newPrice + "</span></div></a>");
        for (var i = 0; i < 8; i++) {
            if (i % 2 === 0) {
                $(".goods").append(goods.clone());
                $(".goods > a:last").attr("href", rootUrl + "html/goodsdetails_odd.html");
            } else {
                $(".goods").append(goods.clone());
                $(".goods > a:last").attr("href", rootUrl + "html/goodsdetails_even.html");
            }
        }
    })
}