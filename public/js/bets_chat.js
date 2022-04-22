var audio = new Audio('/resources/message.mp3');
audio.volume = 0.5;

$(document).ready(function () {
    function toggleVolume()
    {
        if(audio.volume == 0.5)
        {
            audio.volume = 0;
            document.getElementById('muteBtn').style.backgroundImage = "url('/img/ic_volume_off_white_24dp_1x.png')";
        }
        else
        {
            audio.volume = 0.5;
            document.getElementById('muteBtn').style.backgroundImage = "url('/img/ic_volume_up_white_24dp_1x.png')";
        }
    }

    for(var i = 0;i<30;i++) {
        $('.smile_tab').append(`<span class="smile_block" style="background-image: url('/img/smiles/smile_` + (i + 1) + `.png');"></span>`);
    }

    $('.smile_block').click(function(){
        $('.send_input').append(`<img class="in_input_smile" src="`+$(this).css('background-image').slice(5,$(this).css('background-image').length-2)+`">`);
    });

    function sendChatMessage()
    {
        var text = $('.send_input').html();
        if(!text.replace(/\s/g, '').length)
            return;

        $.ajax({
            method:"POST",
            url:"add-message",
            dataType:"html",
            data:{
                _token:$("meta[name=csrf-token]").attr("content"),
                message:text,
            },
            success:function (msg) {
                $(".send_input").empty();
            },
            error:function (xhr, status, statusText) {
                console.log(xhr, status, statusText);
            }
        });
    }

    $('.send_msg_btn').click(sendChatMessage);
    $('#muteBtn').click(toggleVolume);

    $(".send_input").keydown(function(e){
        var code = e.which;
        if(code==13){
            e.preventDefault();
            sendChatMessage();
        }
    });

    var first_focus=true;
    $('.send_input').focus(function(){
        if(first_focus && $('.send_input').attr("other_username_added") != "true") {
            first_focus=false;
            $('.send_input').attr("focused", "true");
        }
    });

    $(".content_chat").on("click", ".name_and_when ._name", function(){
        var deal_html;
        if ($('.send_input').attr("focused") == "true"){
            deal_html = $("#deal_comment").html();
            deal_html += '<span class="other_username" data-steam="'+$(this).attr("data-steam")+'">' + $(this).text() + '</span>';
        }
        else{
            deal_html = '<span class="other_username" data-steam="'+$(this).attr("data-steam")+'">' + $(this).text() + '</span>';
        }
        $("#deal_comment").html(deal_html);
        $('.send_input').attr("other_username_added", "true");
    });
});
