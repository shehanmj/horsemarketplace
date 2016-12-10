$(document).ready(function() {
var breed, local;
$('.results').hide();

  
    //get values for the breed selection
    var jqxhr = $.getJSON('https://api.petfinder.com/breed.list?&key=c52af19d3954003df03ca80427445524&format=json&animal=horse&callback=?', function (data) {
      var obj = [];
      var breeds = [];
      // loop values through options
      for(var i=0; i<28;i++) {
       obj = (data.petfinder.breeds.breed[i]);
       $("#breed").append("<option value='" + obj.$t + "'>" + obj.$t +"</option>");
      }
     });
     // submit and show api results after form submission
      $('.submit').click(function() {
        $('.results').show();
            breed = $( "#breed" ).val();
            local = $("#zip").val();
         
         
      // make call to Petfinder API
       var list = $.getJSON('https://api.petfinder.com/pet.find?&key=c52af19d3954003df03ca80427445524&format=json&animal=horse&breed=' + breed + '&location=' + local + '&callback=?',  function (data) {
            //console.log(list);
    for(i=0; i<25; i++) { 
        var description = list.responseJSON.petfinder.pets.pet[i].description.$t;
        var title = list.responseJSON.petfinder.pets.pet[i].name.$t;
      // set up all variables for results
      var results = new Array(25);
      results = list.responseJSON.petfinder.pets.pet[i];
        var city = results.contact.city.$t;
        var state = results.contact.state.$t;
        var zip = results.contact.zip;
        var email = results.contact.email.$t;
        var media = [];
        var hyper = results.id.$t;
        var imglen = media.length + 1;
        console.log(hyper);
        
            // push each photo onto photos array            
            for(j=0; j <= imglen; j++) {
                if(results.media.photos.photo[j] != undefined) {
            media.push("<img class='image' src='" + results.media.photos.photo[j].$t + " data-toggle='tooltip' title=" + "'" + description + "'" + "></img>");
               }
            }
            
           // display api info in html
                $('.results').append('<div class="items col-sm-6" id="' + i +'">'
                    + '<div class="col-sm-6">' + media[1] + '</div>'
                    + '<div class="col-sm-6">' + '<h2>' + title + '</h2>' 
                    + '<h3>' + city + ',' + state + '</h3>'
                    + '<a href="https://www.petfinder.com/petdetail/' + hyper + '" target="_blank">See on Petfinder.com</a>'
                    + '<address><a href="mailto:' +  email + '">' + email + '</a></address>'
                    + '<p>' + description + '</p></div>'
                    + '</div>'
                    + '</div>'
                    );
            
            
            
    }
    
       });
    }); 
    
    $('.reset').click(function() {
        $('.results').empty();
        $('.form').reset();
    });
    
    //$('.items').click(function(){
      //  $(this).addClass('hidden');
    //})







     
     
  
});
