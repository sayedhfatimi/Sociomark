$(document).ready(function () {
    $("#dim").css("height", $(document).height()).hide();
	var x = 0;
	$(".addmymark").live('click',function(){
		var bookmarkid = $(this).attr("bookmarkid");
		setCookie("bookmark" + x, bookmarkid);
		x = x + 1;
	});
	var BMBE = "bookmarkbackend.php";
	var MMBE = "mymarkbackend.php";
    $(".sbl").click(function () {
        var SelectedCategory = $(this).attr("l");
        TitleChanger(SelectedCategory);
		DisplayBookmarks(SelectedCategory,BMBE);
        SidebarFunction();
		setCookie("SetCategory", SelectedCategory);
    });
    $(".hia").click(function () {
        $("#hi").slideToggle(200);
    });
    $(".sba").click(function () {
        SidebarFunction();
    });
    $("#dim").click(function () {
        SidebarFunction();
    });
    $(window).resize(function () {
        $("#dim").height($(window).height());
    });
});
function DisplayBookmarks(SelectedCategory,url) {
    var DBDataCapture = $.ajax({
        url: url,
        type: 'GET',
        data: {
            a: SelectedCategory
        },
        dataType: 'json'
    });
    $("#ch").fadeOut(300, function () {
        $(this).html('');
        DBDataCapture.done(function (AJAXData) {
            $.each(AJAXData, function (i) {
                $("#ch").append("<div><a class='b' target='_blank' href='" + AJAXData[i].site_link + "'>"
					+ "<div class='bimg' style='background-image: url(/images/content_icon/" + AJAXData[i].img_link + ")'></div>"
					+ "<div class='bt'>" + AJAXData[i].name + "</div></a>"
					+ "<button class='addmymark' bookmarkid='" + AJAXData[i].id + "'>+</button></div>");
            });
        });
    }).fadeIn(500);
};

function SidebarFunction() {
    if ($("#sb").css('margin-left') == '-230px') {
        $("#sb").animate({
            marginLeft: '+=230px'
        }, 'fast');
        $("#mc").animate({
            marginLeft: '+=230px',
            marginRight: '-=230px'
        }, 'fast');
        $("#dim").animate({
            opacity: 0.5
        }).fadeIn('fast');
    } else if ($("#mc").css('margin-left') == '230px') {
        $("#sb").animate({
            marginLeft: '-=230px'
        }, 'fast');
        $("#mc").animate({
            marginLeft: '-=230px',
            marginRight: '+=230px'
        }, 'fast');
        $("#dim").animate({
            opacity: 0
        }).fadeOut('fast');
    };
};

function TitleChanger(SelectedCategory){
	$(document).attr("title", "Sociomark - " + SelectedCategory.charAt(0).toUpperCase() + SelectedCategory.slice(1));
};

function getCookie(name) {
    var i, x, y, BookmarkCookie = document.cookie.split(";");
    for (i = 0; i < BookmarkCookie.length; i++) {
        x = BookmarkCookie[i].substr(0, BookmarkCookie[i].indexOf("="));
        y = BookmarkCookie[i].substr(BookmarkCookie[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == name) {
            return unescape(y);
        };
    };
};

function setCookie(name, value) {
    document.cookie = name + "=" + value;
};

function checkCCookie() {
    var SelectedCategory = getCookie("SetCategory");
    if (SelectedCategory != null && SelectedCategory != "") {
		DisplayBookmarks(SelectedCategory);
		TitleChanger(SelectedCategory);
    };
};

