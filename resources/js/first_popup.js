$(document).ready(function(){
    $(".dropdown_language .lang:first-child").click(function(){
        if(parseInt($(".dropdown_language").css("height"))>36)
        {
            $(".dropdown_language .lang:last-child").css({"display":"none"});
            $(".dropdown_language").css({"height":"36px"});
        }
        else
        {
            $(".dropdown_language").css({"height":"74px"});
            $(".dropdown_language .lang:last-child").css({"display":"block"});
        }
    });

    $(".dropdown_language .lang:last-child").click(function(){
        $(".dropdown_language .lang:first-child").toggleClass("ru_lang");
        $(".dropdown_language .lang:first-child").toggleClass("en_lang");
        $(".dropdown_language .lang:last-child").toggleClass("ru_lang");
        $(".dropdown_language .lang:last-child").toggleClass("en_lang");
        if($(".en_lang .lang_type").html()==="EN")
            $(".en_lang .lang_type").html("RU");
        else
            $(".en_lang .lang_type").html("EN");
        if($(".ru_lang .lang_type").html()==="RU")
            $(".ru_lang .lang_type").html("EN");
        else
            $(".ru_lang .lang_type").html("RU");

        var language = $(".lang_type").eq(0).text();
        var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
        $.ajax({
           url:"/language",
           type:"POST",
           data:{
               language:language,
               _token:CSRF_TOKEN
           },
           success:function (msg) {
               console.log(msg);
               location.reload();
           },
           error:function (xhr, status, statusText) {
               console.log(xhr, status, statusText);
           }
        });

        $(".dropdown_language .lang:last-child").css({"display":"none"});
        $(".dropdown_language").css({"height":"36px"});
    });

    $("body").on("click", ".advertising .content .close_x", function(){
        $(".advertising").animate({"background-color":"rgba(0,0,0,0)"},1000);
        $(".advertising .content").animate({
            "top":"0",
            "width":"100%",
            "height":"0",
            "opacity":"0",
        },500,function(){$(".advertising").remove();});
    });
});