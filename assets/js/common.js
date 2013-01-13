
    $(document).ready(function(){

      //$('#topbar').dropdown();
     
      $('.img-polaroid').tooltip({
      	'placement' : 'bottom'
      });

      $('#galeria').click( function (){
          $.get('/gallery', function(data) {
              $('div#site').html(data);
        });
      });

      $('#galeria').click( function (){
          $.get('/gallery', function(data) {
              $('div#uruchom').html(data);
        });
      });

      $('.photo').hover( 
        function(){
        $(this).css('zoom','2');
      },function(){
        $(this).css('zoom','1');
        });

    });