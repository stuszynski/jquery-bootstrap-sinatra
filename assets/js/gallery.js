(function($) {
  $.fn.Gallery = function(options) {
   
        //metoda prywatna
        function update(){
         $.get( '/api/last',
          function(data) {
            last_have = $('.thumbnail img:last').attr('id');
            console.log("Ostatni posiadany: "+last_have);

            if (last_have != data.Id) {
              $('.thumbnails').append(formImage(data));
            } else{
              console.log ("Brak nowych zdjęć!");
            };
            window.setTimeout(update, 2000);
          });
       }
       
       function Modal(){
        return '<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
        '<div class="modal-header">'+
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'+
        '<h3 id="myModalLabel">Fotka</h3>'+
        '</div>'+
        '<div class="modal-body">'+
        '<p>One fine body…</p>'+
        '</div>'+
        '<div class="modal-footer">'+
        '<button class="btn" data-dismiss="modal" aria-hidden="true">Zamknij</button>'+
        '</div>'+
        '</div>'
      } 

      function formImage(image){

        return '<li class="span2">'+
        '<a href="#myModal" role="button"  data-toggle="modal" class="thumbnail">'+
        '<img id="'+image.Id+'"src="'+image.link+'" alt="'+image.Name+'" data-original-title="'+image.Name+'">'+
        '</a></li>';

      }
        //metody publiczne
        var methods = {
          init: function() {
            $.get( '/api/all',
              function(data) {
               $('div#site').html('<ul class="thumbnails">');

               for (var i = 0 ; i < data.length ; i++) {
                 $('.thumbnails').append(formImage(data[i]));
               };

    // $('.thumbnails').append(formImage(data));

         /*  for (var img in data){
              element = $.parseJSON(img);
              alert(element.link);
            }  
          }); */
            $('div#site').append('</ul>');
            $('div#site').append(Modal());
            setInterval(update(),5000);
          } );
          },
          destroy: function() {
                //destruktor 
              }
            };
            
            return this.each(function() {
            //ciało naszego pluginu
            if(methods[options]){   
                //wywołana metoda publiczna
                return methods[options].apply( this, arguments );
              }
              else if (typeof options === 'object' || ! options ){
                //wywołany konstruktor
                var settings = $.extend( {
                  colorFirst : 'Red',
                  colorSecond: 'Green'
                }, options);
                //inicjalizacja pluginu
                return;
              }
              else{
                //bład
                $.error('changeColor: no method: '+ options);
              } 
            }); 
          }
        })(jQuery);    