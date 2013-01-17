
$(document).ready(function(){

      //$('#topbar').dropdown();
      $('.dropdown-toggle').dropdown();

      $('.thumbnail').tooltip({
      	'placement' : 'bottom'
      });
//obsługa menu
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

//obsługa galerii
      $(".thumbnails li img").live({
        click: 
        function(){
          var link = $(this).attr("src");
          var name = $(this).attr("data-original-title");
          img = "<img src="+link+">"
          $('#myModalLabel').html(name);
          $('.modal-body').html(img);
          console.log("click");
        }
      });


//modal i caruzela
      $('#myModal').modal('toggle');
      $('.carousel').carousel()
    });