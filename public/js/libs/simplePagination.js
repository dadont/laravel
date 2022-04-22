(function(){
    function Pagination(selector, elements, perPage, counterElement){
        var glob = this;
        this.currentPage = 0;
        this.perPage = perPage;
        this.selector = selector;
        this.elements = elements;
        this.counterElement = counterElement;
        if($.isNumeric(elements))
        {
            this.pages = Math.ceil(elements/this.perPage);
        }
        else
        {
            this.pages = Math.ceil($(this.selector).find(this.elements).length/this.perPage);
        }

        this.paginate = function () {
            if(this.pages===1) return;
            $(this.selector).find(this.elements)
                .addClass("none_lock")
                .slice(this.currentPage * this.perPage, this.currentPage * this.perPage + this.perPage)
                .removeClass("none_lock");
            $(counterElement).empty();
            for(var  i = 0; i < this.pages; i++) {
                $("<span></span>")
                    .addClass("page_counter")
                    .attr("data-page",i)
                    .text(i+1)
                    .click(function(){
                        if(!$(this).data("not-clickable"))
                            glob.changePage(parseInt($(this).data("page")));
                    })
                    .appendTo($(counterElement));
            }
            if(this.pages>20){
                $(this.counterElement).find("[data-next-prev]").remove();
                var el = $(this.counterElement).find(".page_counter[data-page="+this.currentPage+"]");
                var nextAll = el.nextAll(":lt(10):not([data-next-prev])"),
                    prevAll = el.prevAll(":lt(10):not([data-next-prev])");

                if(nextAll.length!==10){
                    prevAll = prevAll.add(prevAll.prevAll(":not([data-next-prev]):lt("+(18-nextAll.length)+")"));
                }
                if(prevAll.length!==10){
                    nextAll = nextAll.add(nextAll.nextAll(":not([data-next-prev]):lt("+(18-prevAll.length)+")"));
                }

                var notSel = nextAll.get().concat(prevAll.get())/*,
                    beforeDots = $("<span data-not-clickable='true' class='page_counter'>...</span>").insertBefore(prevAll),
                    afterDots = $("<span data-not-clickable='true' class='page_counter'>...</span>").insertAfter(nextAll);
                notSel.push(el.get(0), beforeDots.get(0), afterDots.get(0));*/
                notSel.push(el.get(0));
                if(nextAll.length!==0) $("<span class='page_counter' data-next-prev></span>")
                                        .text(">")
                                        .click(function(){
                                            glob.nextPage();
                                        })
                                        .appendTo($(this.counterElement));
                if(prevAll.length!==0) $("<span class='page_counter' data-next-prev></span>")
                                        .text("<")
                                        .click(function(){
                                            glob.prevPage();
                                        })
                                        .prependTo($(this.counterElement))
                //[].concat.call(notSel, el.nextAll(":lt(2)"),el.prevAll(":lt(2)"));
                $(this.counterElement).find(".page_counter").not(notSel).not("[data-next-prev]").hide();
            }
            return this;
        };
        this.changePage = function (p) {
            this.currentPage = p;
            this.paginate();
            return this;
        };
        this.nextPage =  function () {
            if(this.currentPage === Math.floor($(this.selector).find(this.elements).length/this.perPage)) return this;
            this.currentPage++;
            this.paginate();
            return this;
        };
        this.prevPage = function () {
            if(this.currentPage===0) return this;
            this.currentPage--;
            this.paginate();
            return this;
        };
    }

    function BetterPagination(selector, elements, perPage, counterElement, elementCount){
        var glob = this;
        this.currentPage = 0;
        this.perPage = perPage;
        this.selector = selector;
        this.elements = elements;
        this.counterElement = counterElement;
        this.elementCount = elementCount;
        this.mustSort = false;
        this.sortType = false;

        this.pages = Math.ceil(elementCount/this.perPage);



        this.paginate = function () {
            if(this.pages===1) return;
            /*$(this.selector).find(this.elements)
                .addClass("none_lock")
                .slice(this.currentPage * this.perPage, this.currentPage * this.perPage + this.perPage)
                .removeClass("none_lock");*/
            $(counterElement).empty();
            for(var  i = 0; i < this.pages; i++) {
                $("<span></span>")
                    .addClass("page_counter")
                    .attr("data-page",i)
                    .text(i+1)
                    .click(function(){
                        if(!$(this).data("not-clickable"))
                            glob.changePage(parseInt($(this).data("page")));
                    })
                    .appendTo($(counterElement));
            }
            if(this.pages>20){
                $(this.counterElement).find("[data-next-prev]").remove();
                var el = $(this.counterElement).find(".page_counter[data-page="+this.currentPage+"]");
                var nextAll = el.nextAll(":lt(10):not([data-next-prev])"),
                    prevAll = el.prevAll(":lt(10):not([data-next-prev])");

                if(nextAll.length!==10){
                    prevAll = prevAll.add(prevAll.prevAll(":not([data-next-prev]):lt("+(18-nextAll.length)+")"));
                }
                if(prevAll.length!==10){
                    nextAll = nextAll.add(nextAll.nextAll(":not([data-next-prev]):lt("+(18-prevAll.length)+")"));
                }

                var notSel = nextAll.get().concat(prevAll.get())/*,
                 beforeDots = $("<span data-not-clickable='true' class='page_counter'>...</span>").insertBefore(prevAll),
                 afterDots = $("<span data-not-clickable='true' class='page_counter'>...</span>").insertAfter(nextAll);
                 notSel.push(el.get(0), beforeDots.get(0), afterDots.get(0));*/
                notSel.push(el.get(0));
                if(nextAll.length!==0) $("<span class='page_counter' data-next-prev></span>")
                    .text(">")
                    .click(function(){
                        glob.nextPage();
                    })
                    .appendTo($(this.counterElement));
                if(prevAll.length!==0) $("<span class='page_counter' data-next-prev></span>")
                    .text("<")
                    .click(function(){
                        glob.prevPage();
                    })
                    .prependTo($(this.counterElement))
                //[].concat.call(notSel, el.nextAll(":lt(2)"),el.prevAll(":lt(2)"));
                $(this.counterElement).find(".page_counter").not(notSel).not("[data-next-prev]").hide();
            }
            return this;
        };
        this.changePage = function (p) {
            this.currentPage = p;
            this.loadContent();
            this.paginate();
            return this;
        };
        this.nextPage =  function () {
            if(this.currentPage === Math.floor($(this.selector).find(this.elements).length/this.perPage)) return this;
            this.currentPage++;
            this.paginate();
            return this;
        };
        this.prevPage = function () {
            if(this.currentPage===0) return this;
            this.currentPage--;
            this.paginate();
            return this;
        };

        this.loadContent = function () {
            var selector = this.selector;
            if(this.mustSort)
            {
                $.post( window.location.href, {_token:$("meta[name=csrf-token]").attr("content"),page:this.currentPage, sort:this.sortType}, function( data ) {
                    $(selector).html( data );
                });
            }
            else{
                $.post( window.location.href, {_token:$("meta[name=csrf-token]").attr("content"),page:this.currentPage}, function( data ) {
                    $(selector).html( data );
                });
            }

        };
        this.setType = function (type) {
            this.mustSort = true;
            this.sortType = type;
            return this;
        }
    }
    jQuery.fn.initPagination = function(elements, perPage, counterNode){
      return new Pagination(this, elements, perPage, counterNode);
    };
    jQuery.fn.initBetterPagination = function(elements, perPage, counterNode, elementCount){
        return new BetterPagination(this, elements, perPage, counterNode, elementCount);
    };
    /*jQuery.fn.setSort = function(type){
        $(this).setType(type);
    };*/
})();