var loadLocalStorage = function () {
	var keys = Object.keys(localStorage)
	var htmlString = '';
	for (var i = 0; i < keys.length; i++) {
		htmlString += `<tr><td class="recipeTitle">${keys[i]} <hr> <button class="button btn btn-outline-danger" id="btn-delete" type="button">Delete</button>
		</td><td class="tableCell">${localStorage[keys[i]]} </tr></tr>`;
	}
	$('tbody').html(htmlString)
};

var updateStatusLabel = function(message) {
	$('#statusLabel').text('Status: ' + message);
}

var createEntry = function(key, value) {
	return localStorage.setItem(key, value);
}

var updateEntry = function(key, value) {
	return localStorage.setItem(key, value);
}

var removeEntry = function(key) {
	return localStorage.removeItem(key);
}

$(document).ready(function () {
	loadLocalStorage();
	var ingredientList = [];

	$('#btn-submitRecipe').on('click', function(e) {
		var ingredients= $('strong.recipeString').text();
		//instructions text - won't wrap in the table
		var instructions = $('#textbox').val();
		var key = $('#recipeName').val();
		var value = `${ingredients} <hr> ${instructions}`;

		var keyExists = localStorage.getItem(key) !== null;
		//this will clear the input boxes when the submit recipe button is hit
		$('#recipeName').val('');
		$('#textbox').val('');
		$('.alert').remove();
		$('#recipeIngredients').val('');
		$('#measurement').prop('selectedIndex',0);
		$('#quantityAmnt').prop('selectedIndex',0);

		if (keyExists) {
			updateStatusLabel('Recipe already exists, please use update button instead! :D');
		} else if (key === '') {
			updateStatusLabel('invalid input!')
		} else {
			createEntry(key, value);
			updateStatusLabel('Recipe created - ' + key);
		}
		loadLocalStorage();

		if(Object.keys(localStorage).length === 5) {
			var audio = new Audio('Assets/cowbell.wav');
			audio.play();
			$('#myModal').modal({ show: true})
		};
	});

		$('.close-modal').click(function() {
			$('#myModal').modal({ show: false})
		});

	$('#btn-update').on('click', function(e) {
		var key = $('#recipeName').val();
		var value = $('#recipeIngredients').val();
		var existingValue = localStorage.getItem(key)
		var keyExists = existingValue !== null;

		if (value === existingValue) {
			updateStatusLabel('Recipe not updated - those same ingredients already exists silly! xD')
		} else if (keyExists) {
			updateEntry(key, value);
			updateStatusLabel('Recipe updated - ' + key);
		} else if (key === '') {
			updateStatusLabel('invalid input!')
		} else {
			updateStatusLabel('Recipe doesn\'t exist, please use create button instead! :D');
		}

		loadLocalStorage();
	});

	//specific delete element
	$('table').on('click', '#btn-delete', function(e){
		var key = $(this).parent('.recipeTitle').text();
		for(var i = 0; i < key.length; i++) {
			if(key[i] === 'D') {
				key = key.slice(0, i - 2);
			}
		}
		removeEntry(key);
		$(this).closest('tr').remove();
  });

	$('#btn-delete').on('click', function(e) {
		var key = $('#recipeName').val();
		var value = $('#recipeIngredients').val();
		var keyExists = localStorage.getItem(key) !== null;

		if (keyExists) {
			removeEntry(key);
			updateStatusLabel('Recipe removed - ' + key);
		} else if (key === '') {
			updateStatusLabel('invalid input!')
		} else {
			updateStatusLabel('Recipe doesn\'t exist, nothing removed. :|');
		}
		$('#recipeName').val('');
		loadLocalStorage();
	});

	$('#btn-add').on('click', function(e) {
		var ingredient = $('#recipeIngredients').val();
		var quantity = $('#quantityAmnt').val();
		var measurement = $('#measurement').val();

		var ingredientExists = ingredient !== null;
		var $ingredient = $(`<div id="myAlert" class="col-sm-1.5 alert alert-success alert-dismissible fade show" role="alert">
		  						<strong class="recipeString"> ${quantity} ${measurement} ${ingredient}  </strong>
		  						<button type="button" class="close" data-dismiss="alert" aria-label="Close">
			  						<span aria-hidden="true">&times;</span>
								  </button>
							    </div>`);

		if (ingredientExists) {
			$ingredient.prependTo( $('.ingredient-list') );
		}
		$('#measurement').prop('selectedIndex',0);
		$('#quantityAmnt').prop('selectedIndex',0);

		var ingredients = $('strong.recipeString').text();
		$('#recipeIngredients').val('');
	});
});

/*



When an input element is given a name, that name becomes a property of the owning form element's HTMLFormElement.elements property. That means if you have an input whose name is set to guest and another whose name is hat-size, the following code can be used:

let form = document.querySelector("form");
let guestName = form.elements.guest;
let hatSize = form.elements["hat-size"];
*/

/*
PAGE CONTENT STUFF
*/
//something to update the table every time localStorage changes

//localStorage stuff
//https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
////create new entry
//localStorage.setItem(key, value)
