

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
    $('div#site').Gallery('init');
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




