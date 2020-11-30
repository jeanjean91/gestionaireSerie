var image ;
var valeur;
var id1;
var description;
  //function image par default
function iff(condition,siok,siko){
        if (condition == true) return(siok);  else    return(siko);
    }
/*var episode = number_of_episodes;
var season = number_of_season;

function movie(query){
    var settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://api.themoviedb.org/3/search/tv?&query=${valeur}&api_key=f3f36c798744b9134f8cb4cec6f58f52`,
    "method": "GET",
    "headers": {},
    "data": "{}"
    }
    
  $.ajax(settings).done(function (response) {
        console.log(response);

        var tab = response.results;  
        console.log(tab);

        for(var i = 0; i < tab.length;i++){
            console.log(tab[i].poster_path);
        }
        
        $(function(){
            $('button').on('click',function(){
                valeur = $('input').val();
                console.log(tab);
                image = tab[i].poster_path;
                 $('#contenair').append(image);
                console.log('valeur =', valeur);
            });
        })
    } 
)}*/


//movie(valeur);
                        
      // fonction  evenement requet api 

$('#chek').on('click',function(){
    valeur = $('input').val();
        //methode fetch requete pour api
    fetch(`https://api.themoviedb.org/3/search/tv?&query=${valeur}&api_key=f3f36c798744b9134f8cb4cec6f58f52`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        var tab = data.results;
                                    
                  // boucle pour parcourir le tableau  de reponce renvoyer par api
        for(var i = 0; i < tab.length;i++){
            id1 = tab[i].id;
            description = tab[i].overview;
            image = tab[i].poster_path;
            $('.container').append('<span><i class="plus1 fas fa-plus-circle">'+
              '</i><img src="'+ iff(tab[i].poster_path != null,'http://image.tmdb.org/t/p/w185/' +
              tab[i].poster_path , 'stock-photo.jpg')  +'"> '+ tab[i].original_name +
              '<i class="plus fas fa-info-circle" id="'+id1+'"></i></span>',''); 
        }
            // apel de la function carousel
        carousel();
        });
    });
                     // function pour activer le caroussel
    function carousel() {
      $('.multiple-items').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4
      });
      
    $('.filtering').slick({
  slidesToShow: 4,
  slidesToScroll: 4
});

var filtered = false;

$('.js-filter').on('click', function(){
  if (filtered === false) {
    $('.filtering').slick('slickFilter',':even');
    $(this).text('Unfilter Slides');
    filtered = true;
  } else {
    $('.filtering').slick('slickUnfilter');
    $(this).text('Filter Slides');
    filtered = false;
  }
});
      
    }


              // function click de limage pour voir l'overview
    $(document).on('click', 'i.plus', function(e){
      
      var idserie = e.target;
      idserie = $(this).attr('id');
      console.log('atribut',idserie);

                  //ajouter la div photo et le overview dans la dive 
        $('.dans ').append($(this.parentNode)).append('<p>'+ description +'</p>');
         $('.cacher').addClass('visible');
         $('.cacher').append('<button id="checkit">X</button>');//ajout d'un bouton pour suprimer l'overview et l'image
      
        fetch(`https://api.themoviedb.org/3/tv/${idserie}?api_key=f3f36c798744b9134f8cb4cec6f58f52`)
        .then(function(response){
            return response.json();   
        })
        .then(function(data){
          console.log(data); 

          $(document).on('click', 'i.plus1', function(){


            $('.cacher').removeClass('visible'),
            $('.cacher').html('')
            /*$('.slick-track').append($(this.parentNode));*/
            var series = JSON.parse(localStorage.getItem("mes-series"));
             if (series == null){
                 series = [];
             }
             var total = {
                episodes: data.number_of_episodes,
                seasons: data.number_of_seasons,
                overview: data.overview,
                image: data.poster_path,
                identifiant : data.id
              }


             series.push(total); 

            $('.storage').addClass('visible1');
           $('.visible1 ').append($(this.parentNode));
           $('.cacher').removeClass('visible'),
            /*$('#storage .slick-list draggable').append($(this.sibling));*/
           

             $('visible1').append(image);
            carousel();
           // console.log('data is ', data);
           
                    //ajout au local storage
            
            
            console.log(total);
            var identifien_json = JSON.stringify(series);
            localStorage.setItem('mes-series', identifien_json);
        });
            
    }); 
                //ajouter la div photo et le overview dans la dive 
    $('.cacher').append($(this.parentNode)).append('<p>'+ description +'</p>');
    $('.cacher').addClass('visible');
  });


  $(document).on('click', '#checkit', function(){
    /*$('#storage').append(image);*/
    $('.cacher').removeClass('visible'); 
   $('.cacher').html('');
    
      
// $(document).on('click', '.trash', function(){
  /*$('#checkit').on('click',function(){
    console.log('pfff');
    $('.cacher').removeClass('visible');

  });*/

// });     

    
});

