$(document).ready(function(){
    $('.search_inv_content .ammo_block, .all_inv_content .ammo_block').click(function(evt){
        var elem = ($(evt.target).parents('.ammo_block').length ? $(evt.target).parents('.ammo_block') : $(evt.target));
        var empty_cont;
        if ($(elem).parent().hasClass("search_inv_content")){
            empty_cont = $(".bottom_row_ammo [data-free]").first();
        }
       
        else if ($(elem).parent().hasClass("all_inv_content")){
            empty_cont = $(".top_row_ammo [data-free]").first();
        }
        if (empty_cont.length!==0){
            var price = elem.children('.price_ammo').html();
            var priceN = parseFloat(price.replace("$",""));
            elem_params={
                id:elem.attr("data-id"),
                type:elem.attr("data-inventory-type"),
                style:elem.attr('style'),
                price:price,
                priceN:priceN,
                name:elem.children('.ammo_name').text().trim(),
                name_bg_color:elem.children('.ammo_name').attr('style')
            };
            if (!($(elem).attr("data-added"))){
                $(empty_cont).attr("data-id", elem_params.id).attr("data-inventory-type", elem_params.type);
                $(empty_cont).find(".price_ammo").text(elem_params.price);
                $(empty_cont).find(".ammo_name").text(elem_params.name).attr("style", elem_params.name_bg_color);
                $(empty_cont).find(".hint_ammo").text(elem_params.name).attr("style","");
                $(empty_cont).attr("style", elem_params.style).removeAttr("data-free").attr("data-type", $(elem).attr("data-type"));
                $(elem).attr("data-added",true);
            }
            $(elem).addClass("fltrHdn").hide();
            $("#user_inventory").initPagination(".ammo_block:not(.fltrHdn)", 12, ".page_counters[data-for='search_inv_content']").paginate();
            $("#whole_inventories").initPagination(".inv:not(.fltrHdn)", 35, "#bottom_counter").paginate();
        }
    });

    $(".top_row_ammo .ammo_block,.bottom_row_ammo .ammo_block").click(function(){
        if($(this).data('id')){
            var id = $(this).data("id");
            $(this)
                .removeAttr("data-id").removeAttr("data-type").removeAttr("data-inventory-type").removeAttr("style").attr("data-free", "true")
                .html('<div class="price_ammo"></div><div class="ammo_name"></div><div class="hint_ammo" style="display: none;"></div>');
            if($(this).parents(".top_row_ammo").length!==0){
                $(".all_inv_content [data-id="+id+"]").removeClass("fltrHdn").css("display","inline-block").removeAttr("data-added");
            } else {
                $(".search_inv_content [data-id="+id+"]").removeClass("fltrHdn").css("display","inline-block").removeAttr("data-added");
            }
            $("#user_inventory").initPagination(".ammo_block:not(.fltrHdn)", 12, ".page_counters[data-for='search_inv_content']").paginate();
            $("#whole_inventories").initPagination(".inv:not(.fltrHdn)", 35, "#bottom_counter").paginate();
        }
    });

    $(".other_block").slice(0,4).click(function(){
        var g = $(".bottom_row_ammo [data-free]").first();
        g.replaceWith(
            $(this)
                .clone()
                .bind("click", function(){
                        $(this)
                            .unbind("click")
                            .replaceWith('<div class="ammo_block search avp_ammo" data-free="true"><div class="price_ammo"></div><div class="ammo_name "></div><div class="hint_ammo" style="display: none;"></div></div>');
                })
                .addClass("adddeals row_ammo ammo_block")
        );
    });

    $(".other_block").slice(4,8).click(function(){
        var g = $(".top_row_ammo [data-free]").first();
        g.replaceWith(
            $(this)
                .clone()
                .bind("click", function(){
                    $(this)
                        .unbind("click")
                        .replaceWith('<div class="ammo_block search avp_ammo" data-free="true"><div class="price_ammo"></div><div class="ammo_name "></div><div class="hint_ammo" style="display: none;"></div></div>');
                })
                .addClass("adddeals row_ammo ammo_block")
        );
    });

    $(".adddeals .add_logo").click(function(ev){
         if ($(".top_row_ammo").find("data-free").length == 4 && $(".bottom_row_ammo").find("data-free").length == 4){
             ev.preventDefault();
             return false;
         }

        var comment = $(".sms_for_deal").val();
        var inventory = [], inventory_obj;
        var other_obj;
        $(".adddeals .row_ammo .ammo_block").each(function(node_index){
            var node = $(".adddeals .row_ammo .ammo_block").eq(node_index);
            if ($(node).attr("data-free") == undefined || $(node).attr("data-free") != "true"){
                if(type = $(node).data("other-type")){
                    other_obj = {
                        otherType:type.toLowerCase(),
                        type:$(node).data("type")

                    };
                    inventory.push(other_obj);
                    return;
                }
                inventory_obj = {
                    id:$(node).attr("data-id"),
                    type:$(node).attr("data-inventory-type"),
                    price:$(node).find(".price_ammo").text(),
                    name:$(node).find(".ammo_name").text(),
                    style:$(node).attr("style"),
                    rarity_style:$(node).find(".ammo_name").attr("style")
                };
                inventory.push(inventory_obj);
            }
        });

        if (inventory.length > 0){
            $.ajax({
                method:"POST",
                url:"/deal/add-deal",
                data:{
                    _token:$("meta[name=csrf-token]").attr("content"),
                    comment:comment,
                    inventory:JSON.stringify(inventory)
                },
                success: function (msg) {
                    window.location.href = "/";
                },
                error:function(xhr, status, statusText){
                    console.log(xhr, status, statusText);
                }
            });
        }
        else{
            alert("Select inventory first");
        }

    });
});