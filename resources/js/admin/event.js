var delete_rate=false;
var change_rate=false;
function showImagePreview(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $(input).parent().parent().attr('style', "background-image:url(" + e.target.result + ");background-size:cover;");
            var classes = $(input).parent().parent().attr("class") + " add_img_2";
            classes = classes.split(" ");
            classes = "." + classes[0] + "." + classes[1] + "." + classes[2];
            $(classes).attr('style', "background-image:url(" + e.target.result + ");background-size:cover;");
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function del_rate() {
    $('.delete_rate').click(function(){
        var deleted_rate = $(this);
        if(delete_rate) {
            $.ajax({
                "url":"/admin/events/delete",
                "method":"POST",
                "dataType":"json",
                "data":{
                    _token:$("meta[name=csrf-token]").attr("content"),
                    id:$(this).attr("data-id")
                },
                success: function (msg) {
                    console.log(msg);
                    if (msg.event_saved){
                        $(deleted_rate).remove();
                        $('.all_events span').html($('.rate').length);
                        if(parseInt($('.indicator_count').html())!==NaN)
                        {
                            $('.indicator_count').html(parseInt($('.indicator_count').html())+1);
                        }
                    }
                    else{
                        alert('Возникла ошибка при удалении события')
                    }
                },
                error: function (xhr, status, statusText) {
                    console.log(xhr, status, statusText);
                    alert("Event couldn't been deleted");
                }

            });
        }
    });
}

function re_edit_rate() {
    $('.cancel_rate').click(function(evt){
        window.location.href = '/admin/events/edit/' + $(evt.target).parents('.rate').attr("data-id");
        if(change_rate) {
            temp.path={
                left_img:$(evt.target).parents('.rate').find('.img_1').css('background-image'),
                right_img:$(evt.target).parents('.rate').find('.img_2').css('background-image')
            };
            temp.name={
                left_name:$(evt.target).parents('.rate').find('.player_1_name').html(),
                right_name:$(evt.target).parents('.rate').find('.player_2_name').html()
            };
            temp.bot=$(evt.target).parents('.rate').find('.score div').eq(0).html();
            $('.re_edit').show();
            $('.left_name_edit').val(temp.name.left_name);
            $('.right_name_edit').val(temp.name.right_name);
            $('#team_1_img_re').parents('.change_img_icon').css({'background-image':temp.path.left_img,'background-size':'cover'}).parent().css({'border':'0'});
            $('#team_2_img_re').parents('.change_img_icon').css({'background-image':temp.path.right_img,'background-size':'cover'}).parent().css({'border':'0'});
            $('.change_bot input').val(temp.bot);
            $("#event_edit_form input[name=team1_margin]").val($(evt.target).parents('.rate').find("#team1_margin").text());
            $("#event_edit_form input[name=team2_margin]").val($(evt.target).parents('.rate').find("#team2_margin").text());
            $("#event_edit_form input[name=tour_name]").val($(evt.target).parents('.rate').find(".rate_company").text());
            $("#event_edit_form input[name=max_bet]").val($(evt.target).parents('.rate').find("#max_bet").text());
            $("#event_edit_form input[name=hltv_url]").val($(evt.target).parents('.rate').find("#hltv_url").text());
            $("#event_edit_form input[name=event_id]").val($(evt.target).parents('.rate').attr("data-id"));
        }
    });

}

function appendEventToList(event){
    var list_item = $("#rate_template").clone();
    $(list_item).attr("data-id", event.id);
    $(list_item).find(".rate_company").text(event.tour_name);
    $(list_item).find(".player_1_name").text(event.team1_name);
    $(list_item).find(".player_2_name").text(event.team2_name);
    $(list_item).find(".card_count").text("BO" + event.card_count);
    $(list_item).find(".img_1").attr("style","background-image:url(/uploads/team/" + event.team1_img +  ")");
    $(list_item).find(".img_2").attr("style","background-image:url(/uploads/team/" + event.team2_img +  ")");
    $(".rates").append($(list_item));
    $(list_item).show();
}

$(document).ready(function () {
    $(".team_img").change(function() {
       showImagePreview(this);
    });

    $('.all_events span').html($('.rate').not("#rate_template").length);

    $('.edit_params li').eq(0).click(function(){
        $('.add_rate_').show();
    });

    $('.edit_params li:nth-child(2),.delete_evt').click(function(){
        delete_rate=!delete_rate;
        change_rate = false;
        $('.rate').toggleClass('delete_rate');
        del_rate();
    });

    $('.edit_params li').eq(2).click(function(){
        change_rate=!change_rate;
        delete_rate = false;
        $('.rate').toggleClass('cancel_rate');
        re_edit_rate();

    });

    $('.edit_params li').eq(3).click(function(){
        $.ajax({
           url:"/admin/events/undo_delete",
           method:"POST",
           dataType:"json",
           data:{
               _token:$("meta[name=csrf-token]").attr("content"),
           },
           success: function (msg) {
               if (!msg.event_status){
                   console.log(msg);
                   appendEventToList(msg);
               }
               else{
                   alert(msg.event_status);
               }
           },
           error: function (xhr, status, statusText) {
               console.log(xhr, status, statusText);
               alert("Возникла ошибка, попробуйте снова");
           }
        });
    });
    
    $(".popup_menu").on("click", "#preview", function () {
        var preview_btn = $(this);
        var hltv_url = $(preview_btn).parent().parent().find("input[name=hltv_url]").val();
        if (hltv_url != ""){
            $.ajax({
                url:"/admin/events/get-match-score",
                method:"POST",
                dataType:'json',
                data:{
                    _token:$("meta[name=csrf-token]").attr("content"),
                    hltv_url:hltv_url
                },
                success: function (msg) {
                    if (msg.status == "valid"){
                        var left_team_name = $(preview_btn).parent().parent().find("input[name=team1_name]").val();
                        var score = "";
                        if (msg.team1.name == left_team_name){
                            score = msg.team1.score + ":" + msg.team2.score;
                        }
                        else{
                            score = msg.team2.score + ":" + msg.team1.score;
                        }
                        $(preview_btn).parent().find(".rate_score").attr("score", score);
                    }
                },
                error:function(xhr, status, statusText){
                    console.log(xhr, status, statusText);
                }
            });
        }
        demo_rate();
        add_rate();
    });
});
function demo_rate() {
    var img1_url = $('#team_1_img_re').parent().css('background-image');
    var img2_url = $('#team_2_img_re').parent().css('background-image');
    if (img1_url.indexOf("/img/img_icon.png") == -1){
        $('.demo_img_1').css({'background-image':img1_url});
        $('.demo_img_2').css({'background-image':img2_url});
    }
    $('.demo_bot').html($('.change_bot input').val());
}
function add_rate()
{
    var img1_url = $('#team_1_img').parent().css('background-image');
    if (img1_url.indexOf("/img/img_icon.png") == -1){
        $('.add_img_1').css({'background-image':$('#team_1_img').parent().css('background-image')});
        $('.add_img_2').css({'background-image':$('#team_2_img').parent().css('background-image')});
    }
    $('.add_bot.concept_').html($('input[name=card_count]').val());
}