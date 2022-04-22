//$('.option').addClass('none_');

function select_resizing()
{
    for(var i =0;i<$('.op span').length;i++)
    {
        if($('.op').eq(i).height()-$('.op span').eq(i).height()<=0)
        {
            $('.op span').eq(i).css({"font-size":"10px"});
        }
   
        $('.op span').eq(i).css({"top": (($('.op').eq(i).height() - $('.op span').eq(i).height()) / 2) + "px"})
    }
}

$(document).ready(function(){
    $('.none_').removeClass('none_');
    select_resizing();

    $('.select').resize(function(){
        select_resizing();
    });
    $('.switch_option').click(function(e){
        var k = $(this).closest(".select");
        $(".toggle_select").not(this).each(function(i,el){
           $(el).removeClass("tg toggle_select").parent().height($(el).parent().data("full-height")||"39px");
        });
        if($(this).is(".toggle_select")){
            var glob = this;
            k.animate({height:$(k).data("full-height")?$(k).data("full-height"):"39px"}, 400, "", function(){
                //$(glob).parent().children('.option').addClass('none_');
                $(glob).removeClass('tg toggle_select');
            });
            select_resizing();
        } else {
            //$(this).parent().children('.option').removeClass('none_');
            $(this).addClass('tg toggle_select');
            k.animate({"height": k.height() + (k.find(".op:not(.switch_option)").length * parseInt($(k).data("full-height") ? $(k).data("full-height") : 39)) + "px"}, 400);
            select_resizing();
        }
    });
    $('.option').click(function(){
        $(this).parent().children('.switch_option').eq(0).html($(this).html());
        var k = $(this).closest(".select");
        k.animate({"height":k.data("full-height")||"39px"}, 400, "", function(){
            k.children('.switch_option').removeClass('tg toggle_select');
        });
        //$(this).parent().children('.option').addClass('none_');
        select_resizing();

    });
    $('body').click(function(evt){
        if($(evt.target).parents('.select').length===0)
        {
            $(".select").each(function(i,el){
                $(el).animate({height:$(el).data("full-height")?$(el).data("full-height"):"39px"}, 400, "", function(){
                    $('.switch_option').removeClass('tg toggle_select')//.parent().children('.option').addClass('none_');
                    select_resizing();
                });
            });
        }
    });
    $('.toggle_select').click(function(){
        var glob = this; var t = $(this).closest(".select");
        t.animate({height:t.data("full-height")?t.data("full-height"):"39px"}, 400, "", function(){
            //$(glob).parent().children('.option').addClass('none_');
            $(glob).removeClass('tg toggle_select');
            select_resizing();
        });

    });
    /*$('.switch_option').click(function(){
        $('.switch_option').not($(this)).parent().children('.option').addClass('none_');
        $('.switch_option').not($(this)).parent().children('.switch_option').removeClass('tg toggle_select');
    });*/
});

