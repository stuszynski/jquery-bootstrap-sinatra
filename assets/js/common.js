
    $(document).ready(function(){

      //$('#topbar').dropdown();
     $('.dropdown-toggle').dropdown();

      $('.img-polaroid').tooltip({
      	'placement' : 'bottom'
      });

      $('.nav li a').click( function (){

        var value = $(this).text().toLowerCase();
        var link = '/' + value;

        
        console.log('Pytam o stronke "/'+ value +'"' );

          $.get(
            link,
             function(data) {
              $('div#site').html(data);
        });
          $(this).parent().parent().find('.active').removeClass('active');
          $(this).parent().addClass('active');
      });

     $(".thumbnails li img").live({
                click: 
                function(){
                  var link = $(this).attr("src");
                  img = "<img src="+link+">"
                  $('.modal-body').html(img);
                  console.log("click");
                },
                mouseenter:
                function () {
                    $(this).css('zoom','1.01');
                },mouseleave:
                function () {
                    $(this).css('zoom','1');
                }
              });

     

      $('#myModal').modal('toggle');
    });