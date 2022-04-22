$(document).ready(function(){
    $('.extension .sub_title').click(function(evt){
        if(evt.target===this || evt.target.classList.contains('toggle_icon_blue'))
        {
            $(this).parent().children(".toggle_menu").slideToggle('slow');
            $(this).children('.toggle_icon_blue').toggleClass('rotate_arrow');
        }
    });

    $(".live_stream").on("click", function () {
        if ($("#online_video_stream_url").length){
            $("iframe.bet_video").attr("src", $("#online_video_stream_url").text());
        }
    });

    $('.bet_sum input,.bet_sum .dollar_blue').hide();
    $('.bet_sum').css({"border-width":"0"});
    $(".flipswitch-inner.switch_2,.flipswitch-switch.switch_2").click(function(){
        $(".switch_left.switch_2").toggleClass("blue_text");
        $(".switch_right.switch_2").toggleClass("blue_text");
        $(".bet_video").toggleClass("none");
        $(".translation").toggleClass("none");
    });

    $(".inventory_count").text($(".extension .resources.deposit.bet_deposit .ammo_block").length);

    $("body").on("click", ".lang_drop ._video_trans_item", function(){
        var url = $(this).attr("data-trans-url");
        var clicked_item = $(this);
        $.ajax({
            method:"POST",
            url:"/bet/load-video-trans",
            data:{
                _token:$("meta[name=csrf-token]").attr("content"),
                url:url
            },
            success:function(msg){
                $(".bet_video").attr("src", msg);
                $("#online_video_stream_url").text(msg);
                $(".lang_drop ._lang").removeClass("selected_trans");
                var html = "<div class='_video_trans_item _lang selected_trans' data-trans-url='"+url+"'>"+$(clicked_item).html()+"</div>";
                $(".lang_drop").prepend(html);
                $(clicked_item).remove();
            },
            error:function(xhr, status, statusText){
                console.log(xhr, status, statusText);
            }
        })
    });
});