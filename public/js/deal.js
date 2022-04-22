$(document).ready(function(){

    $(".inventory_count").text($("#user_inventory .ammo_block").length);

    $('.invenory_deal .subtitle').click(function(evt){
        if(evt.target===this || evt.target.classList.contains('toggle_icon_blue'))
        {
            $(this).parent().children(".toggle_menu").slideToggle('slow');
            $(this).children('.toggle_icon_blue').toggleClass('rotate_arrow');
        }
    });

    //define chat block height
});

window.onload = function(){
    var chat_block_height = $("#right_bar").height() - $(".now_in_site").height();
    chat_block_height = chat_block_height - ($(".trade").outerHeight() + parseInt($(".trade").css("margin-bottom")));
    chat_block_height += 100;
    $(".chat.deal").css("min-height",chat_block_height + 'px').height(chat_block_height);
};