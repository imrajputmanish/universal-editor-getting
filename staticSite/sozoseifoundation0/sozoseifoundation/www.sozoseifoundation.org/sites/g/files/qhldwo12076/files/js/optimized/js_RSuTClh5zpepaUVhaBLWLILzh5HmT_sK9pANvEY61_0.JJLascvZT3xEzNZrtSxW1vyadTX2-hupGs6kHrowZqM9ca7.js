(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.sozoseibase = {
    attach(context, settings) {

      $(document).ready(function () {
        var height;
        var height = $("header").height();
        $(".focusPoints li a").click(function (event) {
          event.preventDefault();
          var position = $($(this).attr("href")).offset().top - height;
          $("body, html").animate({
            scrollTop: position
          }, 500);
        });
        setTimeout(function () {
          var hash = window.location.hash;
          console.log(hash);
          if (hash) {

            var topscrol = $(hash).offset().top;
            var container = $("html,body");
            $(container).animate({
              scrollTop: topscrol - height
            }, 500);
          }
        }, 300)
        // $(".navbar-toggler").click(function()
        // {
        //     if(!$("#collapsibleNavbar").hasClass("show"))
        //     {
        //          heigh = $("#collapsibleNavbar").height();

        //     }

        // })


        $('.toggle-pa').click(function () {
          $('.path-node .program-area-btm').hide();
          $('.path-node .program-area-btm-b').show();
        });
        $('.toggle-pab').click(function () {
          $('.path-node .program-area-btm-b').hide();
          $('.path-node .program-area-btm').show();
        });
        $('.dropdown ul a').click(function () {
          var that = this;
          console.log(height);
          setTimeout(function () {
            var address = $(that).attr("href");
            var res = address.substr(address.indexOf('#'), address.length);
            var topscrol = $(res).offset();
            if (topscrol) {
              $("#collapsibleNavbar").removeClass("show");
              var topscrol1 = topscrol.top;
              var container1 = $("html,body");
              $(container1).animate({
                scrollTop: topscrol1 - height
              }, 500);
            }

          }, 0);
        });
        $(window).scroll(function () {
          var scroll = $(window).scrollTop();

          if (scroll >= 80) {

            $("header").addClass("darkHeader");
          } else {
            $("header").removeClass("darkHeader");
          }
        });
      });

    }
  };

  /*Who we are page change limit text for about 250 character, functionality implemented*/
  $('.showmore').click(function(){
    console.log('show more button')
    $(this).closest('.wwr-content').find('.wwr-readmore').css('display','inline');
    $(this).css('display','none')
  })

  $('.showless').click(function(){
    console.log('show less button')
    $(this).closest('.wwr-content').find('.wwr-readmore').css('display','none');
    $(this).closest('.wwr-content').find('.showmore').css('display','block')
    //$(this).closest('.wwr-content').find('.3dot').css('display','inline');
  })

  if(document.querySelector('.messages--status') != null){
    var success_msg = document.querySelector('.messages--status').innerText;
    if(success_msg != undefined){
      if(success_msg.indexOf('successfully subscribed') > -1){
        window.scroll(0,document.body.scrollHeight)
        $('.messages__wrapper').hide();
        $('.news-success-msg').show();
      }
    }
  }

  /* Events page - if CURRENT EVENTS view is empty, set class on wrapper so background images/colors are removed */
  if ($('.path-convenings').length) {
    if ($('.view-id-events.view-display-id-page_1 .view-empty').length) {
      $('.layout-container .content-container .wrapper:first').addClass('empty-events');
    }
  }

})(jQuery, Drupal, drupalSettings);
