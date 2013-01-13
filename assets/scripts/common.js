
    $(document).ready(function(){

      $('#topbar').dropdown();

      $('#galeria').click( function (){

        $.get('/gallery', function(data) {
              $('div#site').html(data);
        });

      });

    });