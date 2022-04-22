$(document).ready(function () {
    function sendMessage(){
        var deal_id = $("#current_deal_id").text();
        var message = $(".send_input").html();
        var inventory = [], inventory_obj;
        $(".comment_inventory .ammo_block").each(function(node_index){
            var node = $(".comment_inventory .ammo_block").eq(node_index);
            if ($(node).attr("data-free") == undefined || $(node).attr("data-free") != "true"){
                inventory_obj = {
                    id:$(node).attr("data-id"),
                    price:$(node).find(".price_ammo").text(),
                    name:$(node).find(".ammo_name").text(),
                    style:$(node).attr("style"),
                    rarity_style:$(node).find(".ammo_name").attr("style")
                };
                inventory.push(inventory_obj);
            }
        });
        if (inventory.length == 0) inventory = "";
        else inventory = JSON.stringify(inventory);
        if (deal_id != "" && !isNaN(deal_id) && message != ""){
            $.ajax({
                method:"POST",
                url:"/deal/add-message",
                dataType:"html",
                data:{
                    _token:$("meta[name=csrf-token]").attr("content"),
                    deal_id:deal_id,
                    message:message,
                    inventory:inventory
                },
                success:function (msg) {
                    if (msg != "false"){
                        $(".content_chat.deal").append(msg);
                        $(".send_input").empty();
                        $(".comment_inventory .ammo_block").attr("data-free","true").removeAttr("style");
                        $(".comment_inventory .ammo_block .price_ammo, .comment_inventory .ammo_block .ammo_name").text("");
                        $(".comment_inventory .ammo_block .ammo_name").removeAttr("style");
                        $(".comment_inventory .ammo_block .hint_ammo").remove();
                        $('[data-selected]').removeAttr("data-selected");
                    }
                },
                error:function (xhr, status, statusText) {
                    console.log(xhr, status, statusText);
                }
            });
        }
    }

    $(".send_msg_btn").click(function(){
        sendMessage();
    });

    $(".send_input").keydown(function(e){
        var code = e.which;
        if(code==13){
            e.preventDefault();
            sendMessage();
        }
        else if ($(".send_input").text() == ""){
            $(".send_input").removeAttr("focused").removeAttr("other_username_added");
        }
    });

    $("#user_inventory .ammo_block").click(function(){
        if(parseFloat($(this).find(".price_ammo").text().replace("$", "")) < 0.3 || $(this).is("[data-selected]")) return;
        var m = $(".send_msg .items [data-free]").first();
        m.attr("data-id", $(this).attr("data-id"));
        m.css({"background-image": this.style.backgroundImage, "visibility":"visible"});
        m.find(".price_ammo").text($(this).find(".price_ammo").text());
        m.find(".ammo_name").text($(this).find(".ammo_name").text()).attr("style", $(this).find(".ammo_name").attr("style"));
        m.append("<div class='hint_ammo'>"+$(this).find(".ammo_name").text()+"</div>");
        m.removeAttr("data-free");
        $(this).attr("data-selected", 1);
    });

    for(var i = 0;i<30;i++) {
        $('.smile_tab').append(`<span class="smile_block" style="background-image: url('/img/smiles/smile_`+(i+1)+`.png');"></span>`);
    }

    $('.smile_block').click(function(){
        $('.send_msg.deal .send .send_input').append(`<img class="in_input_smile" src="`+$(this).css('background-image').slice(5,$(this).css('background-image').length-2)+`">`);
    });
    var first_focus=true;
    $('.send_input').focus(function(){
        if(first_focus && $('.send_input').attr("other_username_added") != "true") {
            $(this).text('');
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
