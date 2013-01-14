
    $(document).ready(function(){

      //$('#topbar').dropdown();
     
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

     

      $('.photo').hover( 
        function(){
        $(this).css('zoom','2');
      },function(){
        $(this).css('zoom','1');
        });

    });