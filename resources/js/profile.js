$(document).ready(function () {
    $("#change_bg").change(function(){
        $("#profile_bg_form").submit();
    });

    $(".account_params .theme_site .chechbox").click(function(){
        $(this).addClass("checked");
        var theme;
        $(".account_params .theme_site .chechbox").not(this).removeClass("checked"); /// if type of these inputs is radio
        if($(".blackStyle").hasClass("checked"))
        {
            theme = "black";
            $("head").append('<link rel="stylesheet" type="text/css" id="theme_black_css" href="css/theme_black.css">');
            $("#theme_white_css").remove();
        }
        else if($(".whiteStyle").hasClass("checked"))
        {
            theme = "white";
            $("head").append('<link rel="stylesheet" type="text/css" id="theme_white_css" href="css/theme_white.css">');
            $("#theme_black_css").remove();
        }

        $.ajax({
            method:"POST",
            url:"/change_theme",
            data:{
                _token:$("meta[name=csrf-token]").attr("content"),
                theme:theme
            },
            error:function (xhr, status, statusText) {
                console.log(xhr, status, statusText);
            }
        });
    });

    $(".steam_trade_path .save_change").click(function(){
        if(!/steamcommunity\.com\/tradeoffer\/new\/\?partner=[0-9]*&token=[a-zA-Z0-9_-]*/i.test($("#input_1").val())){
            alert($("#input_1").data("invalid-url"));
            $("#input_1").val($("#input_1").data("url"));
            return;
        }
        var trade_url = $("#input_1").val();
        if (trade_url != "" && trade_url.length > 20){
            $.ajax({
                url:"profile/save-trade-url",
                method:"POST",
                dataType:"json",
                data:{
                    _token:$("meta[name=csrf-token]").attr("content"),
                    url:trade_url
                },
                beforeSend:function(){
                    $("#input_1").css("color","#525252");
                },
                success:function(msg){
                    if (msg.status == "invalid"){
                        alert($("#input_1").data("invalid-url"));
                        $("#input_1").val($("#input_1").data("url"));
                        $("#input_1").css("color","#808080");
                        return;
                    }
                    $("#input_1").css("color","#808080");
                    $("#input_1").attr("data-url", $("#input_1").val());
                },
                error:function(xhr, status, statusText){
                    console.log(xhr, status, statusText);
                }
            })
        }

    });
});
new Clipboard('.copy_path');