function makeAsPassed(match_id){
    if ($(".rate[data-id="+match_id+"]").length > 0 &&
            $(".rate[data-id="+match_id+"]").find(".rate_online.red").length > 0){
        var match = $(".rate[data-id="+match_id+"]");
        $(match).find(".rate_online.red").text("1" + $(".passed_match_text").text()).removeClass("red");
        $(match).attr("style","opacity:0.5");
        $(".red_indicator.alert_anm").remove();
    }
}

setInterval(function(){
        /*$.ajax({
            method:"POST",
            url:"/update-rates",
            dataType:'json',
            data:{
                _token:$("meta[name=csrf-token]").attr("content")
            },
            success:function(msg){
                if (msg.length > 0){
                    for (var i = 0;i<msg.length;i++){
                        makeAsPassed(msg[i]);
                    }
                }
            },
            error:function(xhr, status, statusText){
                console.log(xhr, status, statusText);
            }
        })*/
}, 60 * 1000);
