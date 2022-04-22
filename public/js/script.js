function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

var drop_open=[false,false,false];//for each dropdown - is open or not
var each_index=[0,0,0];

var animation;
function animation_search_bot()
{
	animation=setInterval(function(){
		$('.search_line .line div').animate({left:'100%',opacity:'0'},1000,function(){$('.search_line .line div').css({left:'0',opacity:'1'})})
	},1000);
}
function get_ammo(arr)
{
	var list=[];
	for(var i=0;i<arr.length;i++)
	{
		list[i]={
			element:arr.eq(i),
			name:arr.eq(i).children('.ammo_name').html(),
			price:arr.eq(i).children('.price_ammo').html(),
		}
	}
	return list;
}
var options={};
var result;


var elems=get_blocks_ammo('.search_inv_content');
options.keys=['name','price'];
function get_blocks_ammo(parent_element)
{
	return $(parent_element).children('.ammo_block');
}
var list_elem=get_ammo(elems);
function search_result(list,keys,keywords)
{
	var f = new Fuse(list,keys);
	return f.search(keywords);
}
var ammo_list=[];

/*function pagination(container,element_list,index_btn,max_count)
{
	console.log('paginiation');
	var count= $(container).find(element_list).addClass('none_lock');
	for(var i=0;i<count;i++)
	{
	}

	for(var i=max_count*(index_btn-1);(i<max_count*(index_btn-1)+max_count)&&i<$(container).find(element_list).length;i++)
	{
		$(container).find(element_list).eq(i).removeClass('none_lock');
	}
}
function pagination_counters(container,element_list,max_count)
{
	console.log('pagination_counters');
	$('.page_counters[data-for='+container+']').children('.page_counter').remove();

	for(var i=1;i<=Math.ceil($('[data-bind='+container+']').find(element_list).length/max_count);i++)
	{
		$('.page_counters[data-for='+container+']').append(`<span class="page_counter" value="`+i+`">`+i+`</span>`);
		$('.page_counters[data-for='+container+']').children('.page_counter').eq(i).css({'display':'none'});
	}

} */

$(document).ready(function(){
	//$('input').removeAttr('checked');
	$(".event .close").click(function(){$(this).parent().remove()});
	$('.indicator_inbox.bell_outline').html($('.bell-outline_dropdown ul li').length);

	//   switch button
	$(".flipswitch-inner.switch_1,.flipswitch-switch.switch_1").click(function(){
		//$(':checkbox').each(function () { alert(this.checked) });
		$(".switch_left.switch_1").toggleClass("blue_text");
		$(".switch_right.switch_1").toggleClass("blue_text");
		$("#rates").toggleClass("none");
		$(".trades-cont").toggleClass("none");
		$(".trade_coments").toggleClass("none");

		if($('input').data('checked'))
		{
			$('input').data('checked', false);
			window.history.pushState(null, null, '/');
		}
		else
		{
			$('input').data('checked', true);
			window.history.pushState(null, null, '/deals');
		}

	});
	$(".flipswitch-inner,.flipswitch-switch").on("dblclick mousedown mouseup" ,function(evt){
		evt.preventDefault();
		return false;
	});
	$(document).scroll(function(){
		if(window.pageYOffset>=100)
			$("#up").css({"display":"block"});
		else
			$("#up").css({"display":"none"});
	});
	$("#up").click(function(){
		$("html,body").animate({scrollTop:"0px"},600,"swing");
	});
/*
 $('#bell-outline').addClass("bell-outline");
 $("#bell-outline").removeClass("bell-outline_toggle");
 $(".bell-outline_dropdown").slideUp("slow");
 drop_open[0]=false;
 $('#star-outline').addClass("star-outline");
 $("#star-outline").removeClass("star-outline_toggle");
 $(".star-outline_dropdown").slideUp("slow");
 drop_open[1]=false;
 $(".user_dropdown").slideUp("slow");
 $(".user").removeClass("gray_bg");
 drop_open[2]=false;
*/



	$('body').click(function(evt) {
		if ($(evt.target).parents('#user_info').length !== 1)
		{
			$('#bell-outline').addClass("bell-outline");
			$("#bell-outline").removeClass("bell-outline_toggle");
			$(".bell-outline_dropdown").slideUp("slow");
			drop_open[0]=false;
			$('#star-outline').addClass("star-outline");
			$("#star-outline").removeClass("star-outline_toggle");
			$(".star-outline_dropdown").slideUp("slow");
			drop_open[1]=false;
			$(".user_dropdown").slideUp("slow");
			$(".user").removeClass("gray_bg");
			drop_open[2]=false;
		}
	});

	$('.score .card_count, .score .rate_score').click(function(evt) {
		evt.preventDefault();
		evt.stopPropagation();
	});

	$('.nav_icons .content .ico').click(function(evt){
		evt.preventDefault();
	});


	$('.ico.cmt').click(function(){
		$(this).parents('.trade').find('.comment_trade').slideToggle()
	})

	$(".bell-outline").not(".bell-outline_dropdown,.delete_all").click(function(evt){
		$('.bell-outline .indicator_inbox').css({"display":"none"}).html('0');
		if(evt.target.classList.contains("bell-outline")||evt.target.classList.contains("bell-outline_toggle")||evt.target.classList.contains("indicator_inbox"))
		{
			$("#bell-outline").toggleClass("bell-outline");
			$("#bell-outline").toggleClass("bell-outline_toggle");
			$(".bell-outline_dropdown").slideToggle("slow");
			drop_open[0]=!drop_open[0];
			each_index[0]++;
		}
		if($('#star-outline').hasClass("star-outline_toggle"))
		{
			$('#star-outline').toggleClass("star-outline");
			$("#star-outline").removeClass("star-outline_toggle");
			$(".star-outline_dropdown").slideToggle("slow");
			drop_open[1]=false;
		}
		if($(".user").hasClass("gray_bg"))
		{
			$(".user_dropdown").slideToggle("slow");
			$(".user").toggleClass("gray_bg");
			drop_open[2]=false;
		}
	});

	$(".star-outline").not(".star-outline_dropdown,.delete_all,.delete_event").click(function(evt){
		$('.star-outline .indicator_inbox').css({"display":"none"}).html('0');

		if(evt.target.classList.contains("star-outline")||evt.target.classList.contains("star-outline_toggle")||evt.target.classList.contains("indicator_inbox"))
		{
			$("#star-outline").toggleClass("star-outline");
			$("#star-outline").toggleClass("star-outline_toggle");
			$(".star-outline_dropdown").slideToggle("slow");
			drop_open[1]=!drop_open[1];
			each_index[1]++;
		}

		if($('#bell-outline').hasClass("bell-outline_toggle"))
		{
			$('#bell-outline').toggleClass("bell-outline");
			$("#bell-outline").removeClass("bell-outline_toggle");
			$(".bell-outline_dropdown").slideToggle("slow");
			drop_open[0]=false;
		}
		if($(".user").hasClass("gray_bg"))
		{
			$(".user_dropdown").slideToggle("slow");
			$(".user").toggleClass("gray_bg");
			drop_open[2]=false;
		}
	});
	$("#message").click(function(){
		if($(".Message").css("height")==="27px")
		{
			$(".Message").animate({"height":"165px"},500);
    		$(".Message form").css("display","block");
			$('#message').removeClass("shadow_message");
		}
    	else
    	{
    		$(".Message").animate({"height":"27px"},500,function(){
				$(".Message form").css("display","none");
				$('#message').addClass("shadow_message");
			});
    	}
	});

	$(".user_dropdown ul li:first-child").mouseover(function(){
		$(".user_dropdown ul").addClass("merge");
	});
	$(".user_dropdown ul li:first-child").mouseout(function(){
		$(".user_dropdown ul").removeClass("merge");
	});


	$(".user").click(function(){
		$(".user_dropdown").slideToggle("slow");
		$(".user").toggleClass("gray_bg");
		drop_open[2]=!drop_open[2];
		each_index[2]++;
		if($('#bell-outline').hasClass("bell-outline_toggle"))
		{
			$('#bell-outline').toggleClass("bell-outline");
			$("#bell-outline").removeClass("bell-outline_toggle");
			$(".bell-outline_dropdown").slideToggle("slow");
			drop_open[0]=false;
		}
		if($('#star-outline').hasClass("star-outline_toggle"))
		{
			$('#star-outline').toggleClass("star-outline");
			$("#star-outline").removeClass("star-outline_toggle");
			$(".star-outline_dropdown").slideToggle("slow");
			drop_open[1]=false;
		}
	});

	/*$(".delete_all").click(function(){
		$(this).parent().parent().find("ul li").remove()
	})*/
	
	$("#input_1").click(function () {
		$("#input_1:focus~#label_1").animate({"top":"-31px","font-size":"8pt"},250);
	});
	$(".video_block .title_").click(function(){

		$(this).next(".video").slideToggle("slow");
		$(this).next(".video").children(".arrow").toggleClass("rotate_arrow");
	});

	$('.red_indicator ').addClass('alert_anm');


	$(".rate_score").click(function(){
		var match_status = $(this).parent().parent().prev().find("span").attr("match-status");
		if (match_status != "future"){
			var visible_score=$(this).hasClass('finished');
			if(visible_score) {
				$(this).removeClass('finished');
				$(this).html($(this).attr("score"));
			}
			else {
				$(this).html($('.score_lang').html()+"");
				$(this).addClass('finished');
			}
		}
	});
	//send support email
	$("#send_support_email").on("click", function (ev) {
		ev.preventDefault();
		var email = $("#email_").val();
		var message = $("#message_").val();
		var valid = true;

		if (email == ""){
			valid = false;
			$("#send_support_error").text("Email is required");
		}
		else if (message == ""){
			valid = false;
			$("#send_support_error").text("Message is required");
		}
		else if ( !validateEmail(email) ){
			valid = false;
			$("#send_support_error").text("Email is not valid");
		}

		if (valid){
			$.ajax({
				"method":"POST",
				"url":"send_support_email",
				"data":{
					"email":email,
					"message":message,
					"_token":$("meta[name='csrf-token']").attr("content")
				},
				"success":function (message) {
					console.log(message);
					$("#email_").val("");
					$("#message_").val("");
					$("#send_support_error").text("Email is sent");
				},
				"error":function (xhr, status, statusText) {
					console.log(status, statusText);
					$("#send_support_error").text("Couldn't send email");
				}
			});
		}
	});

	//send ajax from footer ti change language
	$("footer .lang").on("click", function (ev) {
		var language = $(this).attr('id');
		var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
		$.ajax({
			url:"/language",
			type:"POST",
			data:{
				language:language,
				_token:CSRF_TOKEN,
				case:'not_first'
			},
			success:function (msg) {
				location.reload();
			},
			error:function (xhr, status, statusText) {
				console.log(xhr, status, statusText);
			}
		});

	});

	$('.trade .avatar').click(function(evt){
		location.href=$(this).attr("data-steam-url");
	});

	$('.trade .nick_name').click(function(evt){
		location.href=$(this).parent().find(".avatar").attr("data-steam-url");
	});

	$(".trade .ico.msg").click(function(evt){
		if ($(this).attr("data-trade-url")){
			window.open($(this).attr("data-trade-url"));
		}
	});

	$(".trades .trade").click(function (ev) {
		var target_class = $(ev.target).attr("class");
		var clickable_targets = ["ico star", "ico cmt", "ico msg", "ico close_trade", "nick_name", "refresh_deal"];
		if (clickable_targets.indexOf(target_class) != -1 || target_class.indexOf("avatar") != -1){
			return false;
		}
		else{
			if ($(this).attr("data-url")){
				location.href=$(this).attr("data-url");
			}
		}

	});

	/*$('input.search_inv').keyup(function(){
		result=search_result(list_elem,options,$('input.search_inv').val());
		for(var t=0;t<result.length;t++)
		{
			ammo_list[t]=result[t].element.not('.none_lock');
		}

		console.log(result);
		if( $('input.search_inv').val()!=='' )
		{
			for(var i = 0;i<$('.search_inv_content .ammo_block').length;i++)
			{
				$('.search_inv_content .ammo_block').children('.ammo_name:contains('+result[i].name+')').parents('.ammo_block').removeClass('none_lock');
			}
			pagination_counters('search_inv_content','.ammo_block:not(.none_lock)',3);
			pagination('.search_inv_content[data-bind=search_inv_content]',ammo_list,parseInt($('[data-for=search_inv_content] .page_counter').eq(0).html()),3);
		}
		else
		{
			for(var k=0;k<list_elem.length;k++)
			{
				$('.search_inv_content').append(list_elem[k].element);
				$('.search_inv_content .ammo_block').eq(k).removeClass('none_lock');
			}
		}
		//pagination_counters('search_inv_content','.ammo_block:not(.none_lock)',3);
	//	pagination('.search_inv_content[data-bind=search_inv_content]','.ammo_block:not(.none_lock)',parseInt($('[data-for=search_inv_content] .page_counter').eq(0).html()),3);
	});*/






	$('.ico.star').click(function(){
		var deal_id = $(this).attr("data-id");
		$.ajax({
			method:"POST",
			url:"/bookmark/add",
			data:{
				_token:$("meta[name=csrf-token]").attr("content"),
				deal_id:deal_id
			},
			dataType:'html',
			success:function(msg){
				$("#star-outline .delete_all").css({opacity:1});
				$("#user_bookmarks .no_bookmark").remove();
				$('.star-outline_dropdown .event_list').append(msg);
				$('.indicator_inbox.star_outline').html(parseInt($('.indicator_inbox.star_outline').html())+1).css({'display':"block"});
			},
			error:function(xhr, status, statusText){
				console.log(xhr, status, statusText);
			}
		});
	});
	$('.player_name').each(function(){
		var ln=$(this).text().length;
		if(ln>10)
		{
			$(this).attr('title',$(this).text())
			$(this).text($(this).text().substr(0,10)+'...');

		}
	});});
	$("#bell-outline .delete_all").click(function(e){
		e.stopPropagation();
		if($("#notifications_list li:not(.notifNotFound)").length !==0) {
			$.getJSON("/notification/clear", function (res) {
				if (res.status) {
					$("#bell-outline .indicator_inbox").text("0").hide();
					$("#notifications_list")
						.html("")
						.append(
							$("<li></li>").text($("#notifications_list").addClass("notifNotFound").data("empty-text")).css({
								textAlign: "center",
								font: "13px Roboto_thin",
								padding: "5px"
							})
						);
					$("#bell-outline .delete_all").css({opacity: "0.3"});
				}
			});
		}
	});

$("#star-outline .delete_all").click(function(){
	$.post("/bookmark/delete/all", {_token:$("meta[name=csrf-token]").attr("content")}, function(){
		$("#user_bookmarks").find("li").remove();
		$("#user_bookmarks").append('<li class="no_bookmark" style="text-align: center; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 13px; line-height: normal; font-family: Roboto_thin; padding: 5px;" class="notifNotFound">'+$("#user_bookmarks").data("empty-text")+'</li>');
	});
});

$("input[data-search]").keyup(function(){
	var self = $(this);
	if(self.val()===""){
		$(self.data("for")).find(".inv").removeClass("searchHdn").css({"display":"inline-block"});
		if(self.is("[data-paginate]"))
			$(self.data("for")).initPagination(".inv:not(.searchHdn)",self.data("per-page"),self.data("counter-node")).paginate();
		return;
	}
	$($(self.data("for"))).find(".inv").addClass("searchHdn").hide();
	$($(self.data("for")).find(".inv").get().filter(function(a){
		try {
			return $(a).find(".ammo_name:eq(0)").text().match(RegExp(self.val(), "gi"));
		} catch(e){return []}
	})).removeClass("searchHdn").css({"display":"inline-block"});
	if(self.is("[data-paginate]"))
		$(self.data("for")).initPagination(".inv:not(.searchHdn)",self.data("per-page"),self.data("counter-node")).paginate();
});

$(document).on("click", "#star-outline .delete_event", function(){
	var k = $(this);
	$.post("/bookmark/delete", {
		_token:$('meta[name="csrf-token"]').attr("content"),
		id:k.data("id")
	}, function(){
		var closestUl = k.parents("ul");
		k.parent().remove();
		if(closestUl.find("li").length===0) {
			closestUl.append('<li class="no_bookmark" style="text-align: center; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 13px; line-height: normal; font-family: Roboto_thin; padding: 5px;" class="notifNotFound">'+closestUl.data("empty-text")+'</li>');
		}
	});
});

$(window).on("load resize",function(){
    var m = $(window).height()-$("#container").height()-$("footer").height()-210;
    $("footer").css("margin-top", (m>0?m:0)+"px");
});