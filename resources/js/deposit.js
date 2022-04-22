function selectBot(bot_id){
    $(".bot_block").removeClass("selectedBot");
    $(".bot[data-id="+bot_id+"]").addClass("selectedBot");
    $("#user_inventory .inv")
        .hide()
        .addClass("filterHdn")
        .filter("[data-bot-id="+bot_id+"]")
        .removeClass("filterHdn")
        .css("display","inline-block")
    //$("#user_inventory").initPagination(".inv:not(.filterHdn)", 24, ".page_counters[data-for='search_inv_content']").paginate();
}

$(document).ready(function () {
    $('.inventory_count').text($(".deposit.left_block .ammo_block").length);
    var elem_params, trade_inventory = [], bot_id;

    //calculate price
    var inventory_price_sum = 0;
    $("#user_inventory .ammo_block").each(function(index){
        var inv = $("#user_inventory .ammo_block").eq(index);
        var price = inv.children('.price_ammo').html();
        var priceN = parseFloat(price.replace("$",""));
        inventory_price_sum+=priceN;
    });
    $(".inventory_price_sum").text("($" + inventory_price_sum.toFixed(2) + ")");


    //click
    $('.search_inv_content, .all_inv_content, .withdraw.resources').on("click", ".ammo_block" ,function(evt){
        var elem = ($(evt.target).parents('.ammo_block').length ? $(evt.target).parents('.ammo_block') : $(evt.target));
        var empty_cont = $(".ammo_block[data-free]").first();
        if (empty_cont){
            var price = elem.children('.price_ammo').html();
            var priceN = parseFloat(price.replace("$",""));
            elem_params={
                id:elem.attr("data-id"),
                type:elem.attr("data-inventory-type"),
                style:elem.attr('style'),
                price:price,
                priceN:priceN,
                name:elem.children('.ammo_name').text().trim(),
                name_bg_color:elem.children('.ammo_name').attr('style'),
                instance_id:elem.find('.steam_instance_id').text(),
                class_id:elem.find('.steam_class_id').text()
            };
            trade_inventory.push({
                instance_id:elem_params.instance_id,
                class_id:elem_params.class_id
            });
            if (elem_params.priceN > minPrice){

                if ($(".right_block.withdraw .resources") && !isNaN($(".right_block.withdraw .resources").attr("trade-bot-id"))){
                    if (elem.attr("data-bot-id") == $(".right_block.withdraw .resources").attr("trade-bot-id")){
                        $(empty_cont).attr("data-id", elem_params.id).attr("data-inventory-type", elem_params.type);
                        $(empty_cont).find(".price_ammo").text(elem_params.price);
                        $(empty_cont).find(".ammo_name").text(elem_params.name).attr("style", elem_params.name_bg_color);
                        $(empty_cont).find(".hint_ammo").text(elem_params.name).attr("style", "")
                            .after("<div class='instance_id none'>" + elem_params.instance_id + "</div><div class='class_id none'>" + elem_params.class_id + "</div>");
                        $(empty_cont).attr("style", elem_params.style).removeAttr("data-free").attr("data-type", $(elem).attr("data-type"));
                        $('.sum_price_deposit').html((parseFloat($('.sum_price_deposit').html()) + priceN).toFixed(2));
                        $(elem).remove();
                    }
                }
                else{
                    $(empty_cont).attr("data-id", elem_params.id).attr("data-inventory-type", elem_params.type);
                    $(empty_cont).find(".price_ammo").text(elem_params.price);
                    $(empty_cont).find(".ammo_name").text(elem_params.name).attr("style", elem_params.name_bg_color);
                    $(empty_cont).find(".hint_ammo").text(elem_params.name).attr("style", "")
                        .after("<div class='instance_id none'>" + elem_params.instance_id + "</div><div class='class_id none'>" + elem_params.class_id + "</div>");
                    $(empty_cont).attr("style", elem_params.style).removeAttr("data-free").attr("data-type", $(elem).attr("data-type"));
                    $('.sum_price_deposit').html((parseFloat($('.sum_price_deposit').html()) + priceN).toFixed(2));
                    $(elem).remove();

                    //check if from withdraw page
                    if (!isNaN(elem.attr("data-bot-id"))){
                        bot_id = elem.attr("data-bot-id");
                        $(".right_block.withdraw .resources").attr("trade-bot-id", bot_id);
                        selectBot(bot_id);
                    }
                }




            }
        }
    });
    $('.spiner_piece').hide();
    $(".right_block .resources").on("click", ".ammo_block", function(){
        var clone_elem = $(this).clone();
        if ($(this).attr("data-free") != "true"){
            $(clone_elem).css({"margin-left":"3px","margin-right":"4px"});
            if ($(".right_block.withdraw .resources") && !isNaN($(".right_block.withdraw .resources").attr("trade-bot-id"))){
                $(clone_elem).attr("data-bot-id", $(".right_block.withdraw .resources").attr("trade-bot-id")).addClass("inv");
            }

            $("#user_inventory script").before($(clone_elem));
            var price = $(this).find('.price_ammo').text();
            var priceN = parseFloat(price.replace("$",""));
            $(".resources.withdraw").find("[data-id="+$(this).data('id')+"]");
            $(this).css("background","")
                .removeAttr("data-inventory-type")
                .removeAttr("data-id")
                .attr("data-free", true)
                .html('<div class="price_ammo"></div><div class="ammo_name "></div><div class="hint_ammo"></div>');
            var k = parseFloat($(".sum_price_deposit").text());
            $(".sum_price_deposit").text((k-priceN).toFixed(2));

            if ($(".right_block.withdraw .resources") && !isNaN($(".right_block.withdraw .resources").attr("trade-bot-id"))){
                if ($(".right_block.withdraw .resources .ammo_block[data-free]").length == 9){
                    $(".right_block.withdraw .resources").removeAttr("trade-bot-id");
                }
            }
        }

    });

    $(".make-trade-offer").click(function(){
        var action = "deposit";
        var free_items = $(".right_block.deposit .resources [data-free]");
        if ($(this).parent().parent().attr("class").indexOf("withdraw") != -1){
            action = "withdraw";
            free_items = $(".right_block.withdraw .resources [data-free]");
        }
        var trade_bet = $(".sum_price_deposit").text();
        if ( $(free_items).length < 9){
            if (trade_inventory.length > 0 && parseFloat(trade_bet) > 0){
                var send_data= {
                    _token:$("meta[name=csrf-token]").attr("content"),
                    trade_inventory:JSON.stringify(trade_inventory),
                    action:action,
                    bet:trade_bet
                };

                $.ajax({
                    method:"POST",
                    url:"/save-trade-data",
                    data:send_data,
                    success: function (msg) {
                        if (msg == "SUCCESS"){
                            //$('.load_circle').eq(0).children('.spiner_piece').show();
                            //$('.load_circle').eq(1).children('.spiner_piece').show().addClass('animation');
                            activateMobileCircle();
                            $("#trade_popup").removeClass("none");
                        }
                        else if (msg == "NO_TRADE_URL"){
                            $("#save_trade_link").show();
                        }

                    },
                    error:function(xhr, status, statusText){
                        console.log(xhr, status, statusText);
                    }
                });
            }
        }
    });

    $("#save_trade_url").click(function(ev){
        ev.preventDefault();
        var trade_url = $("input[name=change_link]").val();
        //if(!/steamcommunity\.com\/tradeoffer\/new\/\?partner=[0-9]*&token=[a-zA-Z0-9_-]*/i.test(trade_url)){
        //    alert($("input[name=change_link]").data("invalid-url"));
        //    return;
        //}

        $.ajax({
            url:"/profile/save-trade-url",
            method:"POST",
            dataType:"json",
            data:{
                _token:$("meta[name=csrf-token]").attr("content"),
                url:trade_url
            },
            success:function(msg){
                if (msg.status == "invalid"){
                    alert($("input[name=change_link]").data("invalid-url"));
                }
                else if (msg.status == "valid"){
                    location.reload();
                }
            },
            error:function(xhr, status, statusText){
                console.log(xhr, status, statusText);
            }
        });
    });
});
function activateMobileCircle()
{
    var getTradeDiv = $('#getTradeDiv');
    var mobileTradeDiv = $('#mobileTradeDiv');
    getTradeDiv.removeClass("standard");
    mobileTradeDiv.removeClass("standard");
    getTradeDiv.removeClass("active");
    getTradeDiv.addClass("finished");
    mobileTradeDiv.addClass("active");

    getTradeDiv.find(".spiner_piece").hide().removeClass("animation");
    mobileTradeDiv.find(".spiner_piece").show().addClass("animation");
}

function activateSendCircle()
{
    var getTradeDiv = $('#getTradeDiv');
    var mobileTradeDiv = $('#mobileTradeDiv');
    var sendTradeDiv = $('#sendTradeDiv');

    getTradeDiv.removeClass("standard");
    mobileTradeDiv.removeClass("standard");
    sendTradeDiv.removeClass("standard");

    getTradeDiv.removeClass("active");
    mobileTradeDiv.removeClass("active");

    getTradeDiv.addClass("finished");
    mobileTradeDiv.addClass("finished");
    sendTradeDiv.addClass("active");

    /*getTradeDiv.find(".spiner_piece").hide().removeClass("animation");
    mobileTradeDiv.find(".spiner_piece").hide().removeClass("animation");
    sendTradeDiv.find(".spiner_piece").show().addClass("animation");*/
}
function activateCheckCircle()
{
    var getTradeDiv = $('#getTradeDiv');
    var mobileTradeDiv = $('#mobileTradeDiv');
    var sendTradeDiv = $('#sendTradeDiv');
    var checkTradeDiv = $('#checkTradeDiv');


    getTradeDiv.removeClass("standard");
    mobileTradeDiv.removeClass("standard");
    sendTradeDiv.removeClass("standard");
    checkTradeDiv.removeClass("standard");

    getTradeDiv.removeClass("active");
    mobileTradeDiv.removeClass("active");
    sendTradeDiv.removeClass("active");

    getTradeDiv.addClass("finished");
    mobileTradeDiv.addClass("finished");
    sendTradeDiv.addClass("finished");
    checkTradeDiv.addClass("active");

    /*getTradeDiv.find(".spiner_piece").hide().removeClass("animation");
    mobileTradeDiv.find(".spiner_piece").hide().removeClass("animation");
    sendTradeDiv.find(".spiner_piece").hide().removeClass("animation");
    checkTradeDiv.find(".spiner_piece").show().addClass("animation");*/
}

function finishCheckCircle()
{
    var getTradeDiv = $('#getTradeDiv');
    var mobileTradeDiv = $('#mobileTradeDiv');
    var sendTradeDiv = $('#sendTradeDiv');
    var checkTradeDiv = $('#checkTradeDiv');

    getTradeDiv.removeClass("standard");
    mobileTradeDiv.removeClass("standard");
    sendTradeDiv.removeClass("standard");
    checkTradeDiv.removeClass("standard");

    getTradeDiv.removeClass("active");
    mobileTradeDiv.removeClass("active");
    sendTradeDiv.removeClass("active");
    checkTradeDiv.removeClass("active");

    getTradeDiv.addClass("finished");
    mobileTradeDiv.addClass("finished");
    sendTradeDiv.addClass("finished");
    checkTradeDiv.addClass("finished");

    /*getTradeDiv.find(".spiner_piece").hide().removeClass("animation");
    mobileTradeDiv.find(".spiner_piece").hide().removeClass("animation");
    sendTradeDiv.find(".spiner_piece").hide().removeClass("animation");
    checkTradeDiv.find(".spiner_piece").hide().removeClass("animation");*/
}

function tradeStatusChanged(data) {
    var getTradeDiv = $('#getTradeDiv');
    var checkTradeDiv = $('#checkTradeDiv');
    var sendTradeDiv = $('#sendTradeDiv');
    var mobileTradeDiv = $('#mobileTradeDiv');
    var tradeLink = $('#tradeLink');

    if(data.data.status == "1")
    {
        activateCheckCircle();
        $('#sendTradeMessage').removeClass("none").find("a").attr("href", "http://www.steamcommunity.com/tradeoffer/"+data.data.tradeId+"/");
        $('#waitingForBotText').text(data.data.message);
        //$('#sendTradeMessage').
        /*sendTradeDiv.addClass("finished");
        mobileTradeDiv.addClass("finished");
        getTradeDiv.find(".animation").hide().removeClass("animation").find(".spiner_piece").hide();
        mobileTradeDiv.addClass("finished").find(".animation").hide().removeClass("animation").find(".spiner_piece").hide();

        sendTradeDiv.find(".spiner_piece").show().addClass("animation");
        */

        /*checkTradeDiv.find(".spiner_piece").each(function (index) {
            $(this).show();
            $(this).addClass("animation");
        });*/

        /*sendTradeDiv.find(".spiner_piece").each(function (index) {
            $(this).show().addClass("animation");
        });*/

    }
    else if(data.data.status == "2")
    {
        finishCheckCircle();
        //location.reload();
    }
    else if(data.data.status == "3" || data.data.status == "4")
    {
        location.reload();
    }
    else if(data.data.status == "5")
    {
        activateSendCircle();
    }
}
