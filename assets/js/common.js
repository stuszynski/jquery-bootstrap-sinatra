

$(document).ready(function(){

      //$('#topbar').dropdown();
      $('.dropdown-toggle').dropdown();
  $('.dropdown input, .dropdown label').click(function(e) {
    e.stopPropagation();
    $('.dropdown-menu').toggle();
  });
      $('.thumbnail').tooltip({
      	'placement' : 'bottom'
      });
//obsługa menu
$('.nav li a').click( function (){

  var value = $(this).text().toLowerCase();
  var link = '/' + value;


  console.log('Pytam o stronke "/'+ value +'"' );
  if (value != 'gallery') {
    $.get(
      link,
      function(data) {
        $('div#site').html(data);
      });

  };

  if (value == 'gallery') {
    gallery_init();
  };

  $(this).parent().parent().find('.active').removeClass('active');
  $(this).parent().addClass('active');

});

//obsługa galerii
$(".thumbnails li img").live({
  click: 
  function(){
    var id = $(this).attr("id");
    var link = $(this).attr("src");
    var name = $(this).attr("data-original-title");
    img = "<img src="+link+">"
    $('#myModalLabel').html(name);
    $('.modal-body').html(img);
    /*$.get('/api/'+id,
      function (data) {
      $('.modal-body').append('<p>'+data.Disc+'</p>');
    });*/

    console.log("click");
  }/*,
  mouseover:
  function(){
    var link = $(this).attr("src");
    $('body').css('background-image','url('+link+')');
  }*/
});


//modal i caruzela
$('#myModal').modal('toggle');
$('.carousel').carousel()
});


function gallery_init(){
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
}


function formImage(image){

  return '<li class="span2">'+
  '<a href="#myModal" role="button"  data-toggle="modal" class="thumbnail">'+
  '<img id="'+image.Id+'"src="'+image.link+'" alt="'+image.Name+'" data-original-title="'+image.Name+'">'+
  '</a></li>';

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

