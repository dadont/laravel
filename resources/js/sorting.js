/*
var sort_=[];
var elements=[];
$(document).ready(function(){
    $('.option').click(function(){
        if($(this).attr('value')==='up')
        {
            sort_elements(sort_,$('[data-bind='+$(this).parents('.standart_select').attr('data-for')+'] .ammo_block'),'.price_ammo');
            append_blocks(sort_,'[data-bind='+$(this).parents('.standart_select').attr('data-for')+']');
        }
        else if($(this).attr('value')==='down')
        {
            sort_elements(sort_,$('[data-bind='+$(this).parents('.standart_select').attr('data-for')+'] .ammo_block'),'.price_ammo');
            sort_.reverse();
            append_blocks(sort_,'[data-bind='+$(this).parents('.standart_select').attr('data-for')+']');
        }
        else if($(this).attr('value')==='alphabetical')
        {
            sort_elements(sort_,$('[data-bind='+$(this).parents('.standart_select').attr('data-for')+'] .ammo_block'),'.ammo_name');
            sort_.reverse();
            append_blocks(sort_,'[data-bind='+$(this).parents('.standart_select').attr('data-for')+']');
        }
        if($(this).parent().is("[data-paginate]")){
            $($(this).parent().data("paginate-for")).initPagination(".inv", $(this).parent().data("per-page"), $(this).parent().data("counter-node")).paginate();
        }
    });
});
var k;
function sort_elements(arr,element,elem_arg,copied=false)
{
    if(!copied)
    {
        for(var i=0;i<element.length;i++)
        {
            arr[i]=element.eq(i);
        }
    }
    for(var i=0;i<arr.length-1;i++)
    {
        var normal=true;
        if(elem_arg.indexOf('price_ammo')!==-1)
        {
            
            var I1=arr[i].children(elem_arg).text().replace('$','');
            var I2=arr[i+1].children(elem_arg).text().replace('$','');
          
            if(I1!==NaN && I2!==NaN)
            {
                if(parseFloat(I1)<parseFloat(I2))
                {
                    var temp=arr[i];
                    arr[i]=arr[i+1];
                    arr[i+1]=temp;
                    normal=false;
                    break;
                }
            }
        }
        else if(arr[i].children(elem_arg).text()<arr[i+1].children(elem_arg).text())
        {
            var temp=arr[i];
            arr[i]=arr[i+1];
            arr[i+1]=temp;
            normal=false;

            break;
        }
    }
    if(normal)
    {
        k=0;
        return arr;
    }
    $(".inv").css("margin-right", "6px");
}
function append_blocks(elements,path){
    for(var i=0;i<elements.length;i++)
    {
        elements[i].removeClass('none_lock');
        $(path).append(elements[i]);
    }
    //$(".bet_deposit[data-bind='bet_deposit']").initPagination(".inv", 12, ".page_counters").paginate();
    //pagination_counters($(path).attr('data-bind'),'.ammo_block',parseInt($(this).attr('data-length')));
}
//append_blocks(args,'.resources.deposit')*/
$('.option').click(function(){
    startSort(this, $(this).attr("value"));
});
function startSort(a,b){
    var d = $("[data-bind="+$(a).parent().data("for")+"] .ammo_block");
    if(b==="up"){
        d.sort(function(g,h){
            return $(h).find(".price_ammo").text().replace("$","")-$(g).find(".price_ammo").text().replace("$","");
        });
    } else if(b==="down"){
        d.sort(function(g,h){
            return $(g).find(".price_ammo").text().replace("$","")-$(h).find(".price_ammo").text().replace("$","");
        });
    } else if(b==="alphabetical"){
        d.sort(function(g,h){
            var z = $(g).find(".ammo_name").text().toLowerCase(),
                x = $(h).find(".ammo_name").text().toLowerCase();
            if(z < x) return -1;
            if(z > x) return 1;
            return 0;
        });
    }
    $("[data-bind="+$(a).parent().data("for")+"]").empty().html(d);
    $($(a).parent().data("for")).find(".inv").css("margin-right", "6px");
}