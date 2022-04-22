$(document).ready(function(){
    $(".trade .close_trade").click(function(evt){
        var deal_id = $(this).parentsUntil("#center_content").last().attr("data-id");
        console.log(deal_id);
        if (deal_id != "" && !isNaN(deal_id)){
            $.ajax({
                method:"POST",
                url:"/deal/close-deal",
                data:{
                    _token:$("meta[name=csrf-token]").attr("content"),
                    deal_id:deal_id
                },
                success:function(msg){
                    console.log(msg);
                },
                error:function(xhr, status, statusText){
                    console.log(xhr, status, statusText);
                }
            });
        }
    });

    $(".content_chat").on("click", ".delete_msg", function(){
        var message_id = $(this).parent().parent().attr("data-message-id");
        var dl_btn = $(this);
        if (message_id != "" && !isNaN(message_id)){
            $.ajax({
                method:"POST",
                url:"/deal/remove-message",
                data:{
                    _token:$("meta[name=csrf-token]").attr("content"),
                    message_id:message_id
                },
                success:function () {
                    $(dl_btn).parent().parent().remove();
                },
                error:function (xhr, status, statusText) {
                    console.log(xhr, status, statusText);
                }
            })
        }
    });

    $(".delete_chat").on("click", function(){
        var deal_id = $("#current_deal_id").text();
        if (deal_id != "" && !isNaN(deal_id) && $(".content_chat .some_message").length > 0){
            $.ajax({
                method:"POST",
                url:"/deal/remove-all-messages",
                data:{
                    _token:$("meta[name=csrf-token]").attr("content"),
                    deal_id:deal_id
                },
                success:function (msg) {
                    if (msg == "true"){
                        $(".content_chat").empty();
                    }
                },
                error:function (xhr, status, statusText) {
                    console.log(xhr, status, statusText);
                }
            });
        }
    });

    $(".edit_trade").on("click", function(){
        if ($(this).parents('.trade').find('.comment_trade').css("display") == "none"){
            $(this).parents('.trade').find('.comment_trade').slideDown()
        }
        if ($(".comment_trade input").length == 0){
            var comment = $(".comment_trade span").text();
            $(".comment_trade span").hide();
            $(".comment_trade")
                .addClass("input")
                .append("<input type = 'text' name='edit_comment' autofocus id='edit_comment' value='"+comment+"'/>")
                .append('<span class="save_change" style="right: 9px;top: 24px;"></span>');
        }
    });

    $(".comment_trade").on("click", ".save_change", function(){
        var comment = $(".comment_trade #edit_comment").val();
        if (comment != $(".comment_trade span").text()){
            //comment has changed
            $.ajax({
                method:"POST",
                url:"/deal/save-comment",
                data:{
                    _token:$("meta[name=csrf-token]").attr("content"),
                    comment:comment,
                    deal_id:$("#current_deal_id").text()
                },
                success:function(){
                    $(".comment_trade").removeClass("input");
                    $(".comment_trade #edit_comment, .comment_trade .save_change").remove();
                    $(".comment_trade span").text(comment).show();
                },
                error:function(xhr, status, statusText){
                    console.log(xhr, status, statusText);
                }
            })
        }
    });
});