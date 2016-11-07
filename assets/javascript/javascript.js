   // Inital array of gifs 
   var gifs = ['cats', 'dogs', 'lama', 'piggy'];
// ========================================================
	// This function will display gif to HTML
	function displayGifs(){
		var gif = $(this).attr('data-name');
 		var randomQueryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC";
 		// Creates an Ajax call for the specific gif
		 $.ajax({url: randomQueryURL, method: 'GET'}).done(function(callback) {
		  		console.log(callback.data);
		 
			 for (var i = 1; i < 7; i++) {
			 		// Create Div
			  		var gifDiv = $('<div class="gifs">');
			  		// Retreives rating data 
			  		var rating = callback.data[i].rating;
			  		// Places rating in paragraph 
			  		var ratingText = $('<p>').html("<b>Rating:</b> " + rating);
			  		// Append text to container gifDiv
			  		gifDiv.append(ratingText);
			  		// Create image from API
			  		var image = $('<img class="images">').attr("src", callback.data[i].images.fixed_height_still.url)
			  											 .attr("still", callback.data[i].images.fixed_height_still.url)
			  											 .data('imagedata', {still: callback.data[i].images.fixed_height_still.url,
			  											 					animate: callback.data[i].images.downsized.url
			  											 					 });
			  		
			  		// Append image to container gifDiv
			  		gifDiv.append(image);
			  		// Display gifDiv in #moviesView
			  		$('#gifView').prepend(gifDiv);
			 
				}; // End for loop
					$('.gifs').mouseout(function(){
						console.log("yup");
						 image = $('<img class="images">').attr($('.images').data("imagedata").still);
				  		// Display gifDiv in #moviesView
				  		$(this).prepend(image);
			  		});

					if($('.gifs').mouseenter()){
						var image = $('<img class="images">').attr("src", callback.data[i].images.fixed_height_still.url);
					  		gifDiv.append(image);
			  		// Display gifDiv in #moviesView
			  		$('#gifView').prepend(gifDiv);
					}
					if($('.gifs').mouseout()){
						var image = $('<img class="images">').attr("src", callback.data[i].images.downsized.url);
									  		gifDiv.append(image);
			  		// Display gifDiv in #moviesView
			  		$('#gifView').prepend(gifDiv);
					};

		  }); // End ajax jQuery
	} // End function displayGifs()
// ========================================================
	// Function for displaying gif data
	function renderButtons(){
		$('#buttonsView').empty();
		for (var i = 0; i < gifs.length; i++){ // go through array of gifs
			var a = $('<button>')// for each, create a button
			a.addClass('gif'); // addClass of gif
			a.attr('data-name', gifs[i]); // add name attr
			a.text(gifs[i]); // text for button
			$('#buttonsView').append(a); // append to screen
		} // End for Loop
	} // End function renderButtons()
// ========================================================
	// This .on("click") function will trigger the AJAX Call
	$('#findGif').on('click', function(){
		// Here we grab the text from the input box 
		var gif = $('#gif-input').val().trim().replace(' ', '+');
		// Push user input text into array of gifs 
		gifs.push(gif);
		renderButtons();
		return false;
	})
// ========================================================
$(document).on('click', '.gif', displayGifs);

renderButtons();
