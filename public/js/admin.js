var temp={};
function dynamic_length(){
    for(var i=0;i<$('.edit_param input.text_input').length;i++)
    {
            $('.edit_param input.text_input').eq(i).css({"width":($('.edit_param input.text_input').eq(i).val().length)*7+'px'});
            $('.edit_param input.text_input').eq(i).css({"min-width":'50px'});
    }
}

$(document).ready(function(){

    $('.popup_menu').css({"height":$(window).height()}).hide();
    dynamic_length()
   $('body').on('keyup keydown click load ',dynamic_length);
    $('.popup_close').click(function (){
        $('.popup_menu').hide();
    });


    $(window).resize(function(){
        $('.popup_menu').css({"height":$(window).height()});
    });
});

