// array to hold various people
var people = ["George Washington", "Dave Chappelle", "Barrack Obama", "Harambe", "David Bowie"];

renderButtons();

// search function 
$("#search").on("click", function(event)	{
	console.log("search!")
	//prevent form from refreshing page
	event.preventDefault();

	var addPerson = $('#searchTerm').val().trim();
	console.log(addPerson);

	//push to array people
	people.push(addPerson);
	console.log(people);

	// empty buttons div so buttons don't repeat
	$("#buttons").empty();
	
	//
	renderButtons();

});

function renderButtons() {
	for (var i = 0; i < people.length; i++) {
		
		var a = $("<button>");

		a.addClass("person");

		a.addClass("btn btn-default")

		a.attr("data-person", people[i]);

		a.text(people[i]);

		$("#buttons").append(a);
	}
}




// function to populate page with gifs when person button is pushed
function displayGifs() {
		console.log("displayGif!");
		//clear page of current gifs
		$("#gifs").empty();
      
      //
      var person = $(this).attr("data-person");
      console.log(person)
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";

        // ajax call
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // populate page with gifs
        .done(function(response) {
        	console.log(response);
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
          	var column = $("<div class='col-sm-6 col-md-4'>");

            var gifDiv = $("<div class='thumbnail'>");

            var rating = results[i].rating;

            var caption = $("<div class='caption'>")

            var p = $("<h3>").text("Rating: " + rating);

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height_still.url);
            personImage.attr("data-animate", results[i].images.fixed_height.url);
            personImage.attr("data-still", results[i].images.fixed_height_still.url);
            personImage.attr("height", "50")
            personImage.attr("width", "300");


            gifDiv.prepend(caption);
            (p).appendTo(caption);
            gifDiv.prepend(personImage);
            gifDiv.appendTo(column)

            $("#gifs").prepend(column);
          };

         })
    };

// event listener for clicks on people buttons
$(document).on("click", ".person", displayGifs);

// event listener for clicks on still images and active animate function
$(document).on("click", "img", animate);

// function to animate or pause gifs
function animate() {
	console.log("click");

      var state = $(this).attr("data-state");

      if (state === "still") {
	
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
};