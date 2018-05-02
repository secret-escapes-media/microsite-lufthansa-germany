///////////////////////////////////////
//    PERFECT BREAK GAME
///////////////////////////////////////

var game               = '.game',
    selectedClass      = 'is-selected',
    categoryOption     = 'js-game__category-option',
    selectedCategory   = '.'+categoryOption+'.'+selectedClass,
    submitCategoryBtn  = 'js-game__category-submit',
    userCategory       = '',
    userStyle          = '',
    categoryList       = 'js-game__category-list',
    styleList          = 'js-game__style-list',
    styleOption        = 'js-game__style-option',
    selectedStyle      = '.'+styleOption+'.'+selectedClass,
    submitStyleBtn     = 'js-game__style-submit',
    resetBtn           = 'js-game__reset';

var gameData = {
  "categories": [
      { "id": "food" },
      { "id": "social" },
      { "id": "explorer" },
      { "id": "culture" }
    ],
  "styles": {
    "food": [
        { "id": "food-munich" },
        { "id": "food-frankfurt" }
      ],
    "social": [
        { "id": "social-munich" },
        { "id": "social-frankfurt" }
      ],
    "explorer": [
        { "id": "explorer-munich" },
        { "id": "explorer-frankfurt" }
      ],
    "culture": [
        { "id": "culture-munich" },
        { "id": "culture-frankfurt" }
      ]
    }
  };

// finds the most popular value in array
// when 2 2 1 is selected, the pair with an item that appears first in html wins
// if 1 1 1 1 1 (no duplicate) the first item in html value wins
function mostPopularValue(arr) {
  var freqs = {};
  var max_index;
  var max_value = -1/0; // Negative infinity.
  $.each(arr, function(i, v) {
    if (freqs[v] != undefined) {
      freqs[v]++;
    } else {
      freqs[v] = 1;
    }
  });
  $.each(freqs, function(num, freq) {
    if (freq > max_value) {
      max_value = freq;
      max_index = num;
    }
  });
  if (max_index != undefined) {
    return max_index;
  }
}

function randomiseList(list) {
  $(list).each(function(){
    // get current ul
    var $ul = $(this);
    // get array of list items in current ul
    var $liArr = $ul.children('li');
    // sort array of list items in current ul randomly
    $liArr.sort(function(a,b){
      // Get a random number between 0 and 10
      var temp = parseInt( Math.random()*10 );
      // Get 1 or 0, whether temp is odd or even
      var isOddOrEven = temp%2;
      // Get +1 or -1, whether temp greater or smaller than 5
      var isPosOrNeg = temp>5 ? 1 : -1;
      // Return -1, 0, or +1
      return( isOddOrEven*isPosOrNeg );
    })
    // append list items to ul
    .appendTo($ul);
  });
}

function createCategoryList() {
  var categoriesAvailable = (gameData.categories.length)-1,
      categoryCounter     = 0,
      imageCounter        = 1;
  // create 12 options using the game categories
  for (var i = 1; i <= 12; i++) {
    // adds a list item of game category to list
    $('.'+categoryList).append('<div class="game__option js-game__category-option" data-category="' + gameData.categories[categoryCounter].id + '" style="background-image:url(../_assets/img/content/perfect-break/categories/'+gameData.categories[categoryCounter].id+'/0'+imageCounter+'.jpg);"></div>');
    // loops through the amount of available categories if
    if (categoryCounter == categoriesAvailable) {
      // there are no more categories left, back to start
      categoryCounter = 0;
      imageCounter++;
    } else {
      // go to the next category
      categoryCounter++;
    }
  }
  // put list items in a random order
  randomiseList('.'+categoryList);
}

function createStyleList() {

  var categoryStyle   = gameData.styles[userCategory],
      stylesAvailable = (categoryStyle.length)-1,
      stylesCounter   = 0,
      imageCounter    = 1;

  // create 12 options using the game categories
  for (var i = 1; i <= 12; i++) {
    // adds a list item of game category to list
    // $('.'+styleList).append('<div class="game__option js-game__style-option" data-style="' + categoryStyle[stylesCounter].id + '" style="background-image:url(../_assets/img/content/perfect-break/styles/'+categoryStyle[stylesCounter].id+'-'+imageCounter+'.jpg);"></div>');
    $('.'+styleList).append('<div class="game__option js-game__style-option" data-style="' + categoryStyle[stylesCounter].id + '" style="background-image:url(../_assets/img/content/perfect-break/styles/'+categoryStyle[stylesCounter].id+'/0'+imageCounter+'.jpg);"></div>');

    // loops through the amount of available categories if
    if (stylesCounter == stylesAvailable) {
      // there are no more categories left, back to start
      stylesCounter = 0;
      imageCounter++;
    } else {
      // go to the next category
      stylesCounter++;
    }
  }
  // put list items in a random order
  randomiseList('.'+styleList);

}







// STARTS HERE /////////////////////////////////////////////////////////////////

// deletes the no JS message builds and shows the first category section?????
// hide style and result screens (.row)
createCategoryList();
$('.game__style, .game__result, .result').hide();

////////////////////////////////////////////////////////////////////////////////

// function for selecting category options
$('body').on('click', '.'+categoryOption, function() {
  if ($(selectedCategory).length === 5){
    // Do nothing when 5 options are already selected
    if ($(this).hasClass(selectedClass)) {
      // allow unselecting options once limit reached
      $(this).removeClass(selectedClass);
    }
  } else {
    // no limit reached, allow selection
    $(this).toggleClass(selectedClass);
  }
  // add visual feedback when 5 options are selected
  if ($(selectedCategory).length == 5){
    $('.'+categoryList).addClass('has-limit');
    $('.game__category').addClass('has-limit');
  } else {
    $('.'+categoryList).removeClass('has-limit');
    $('.game__category').removeClass('has-limit');
  }
});

// submit function for category
$('body').on('click', '.'+submitCategoryBtn, function() {
  // collect selected categories
  var selectedCategories = [];
  $(selectedCategory).each(function() {
    // put each answer into array
    selectedCategories.push($(this).data('category'));
  });
  // stores user's most selected category
  userCategory = mostPopularValue(selectedCategories);
  // build the list of options for the style section
  createStyleList();
  $('.js-game-chosen-category').text(userCategory);
  $('.game__style').show();
  $('.game__category').hide();
  // scroll back to the top of the game section
  $('html,body').scrollTop( $('.game').offset().top );
});

// function for selecting style options
$('body').on('click', '.'+styleOption, function() {
  if ($(selectedStyle).length >= 5){
    // Do nothing when 5 options are already selected
    if ($(this).hasClass(selectedClass)) {
      // allow unselecting options once limit reached
      $(this).removeClass(selectedClass);
    }
  } else {
    // no limit reached, allow selection
    $(this).toggleClass(selectedClass);
  }
  // add visual feedback when 5 options are selected
  if ($(selectedStyle).length == 5){
    $('.'+styleList).addClass('has-limit');
    $('.game__style').addClass('has-limit');
  } else {
    $('.'+styleList).removeClass('has-limit');
    $('.game__style').removeClass('has-limit');
  }
});

// submit function for style
$('body').on('click', '.'+submitStyleBtn, function() {
  // collect selected categories
  var selectedStyles = [];
  $(selectedStyle).each(function() {
    // put each answer into array
    selectedStyles.push($(this).data('style'));
  });
  // stores user's most selected category
  userStyle = mostPopularValue(selectedStyles);
  // show the user's result
  $('.game__result').show();
  $('.js-result-' + userStyle).show();
  $('.game__style').hide();
  $('.game').addClass('game--complete');
  // scroll back to the top of the game section
  $('html,body').scrollTop( $('.game').offset().top );
});

// Reset the game at the results screen
$('body').on('click', '.'+resetBtn, function() {
  $('.game').removeClass('game--complete');
  // remove the previous lists
  $('.'+styleList+', .'+categoryList).removeClass('has-limit').empty();
  $('.game__category, .game__style').removeClass('has-limit');
  // hide the previous screens
  $('.game__style, .game__result, .result').hide();
  // rebuild the category selection & show
  createCategoryList();
  $('.game__category').show();
  $('html,body').scrollTop( $('.game').offset().top );
});


// When submit is clicked the result for category is taken
// if 2,2,1 is the case then 50/50 between each of the 2 category
// with category selected, fill the options of the style list
// The category styles need to be retreaved from somewhere?
// create two options and duplicate so there are tweleve options
// the category page is hidden and the style page is shown
// same clicking funtion as before, 3 to be selected this time
// when submit is clicked the result for the style is done
// the category and style are inserted into the result
// also the product with the correct tags and description is inserted as well
// the style page is hidden and the result page is shown
// also a link to look at the collection / other options that fit the category and style
// There is either a start again option, or a switch results / see all results




///////////////////////////////////////
//      Game message fixed
///////////////////////////////////////

function offsetMsg(){
  // gives padding to the game wrap which goes underneath the
  // absolute positioned message
  var msgHeight = $('.game__message').outerHeight();
  $('.game__wrap').css('padding-top', msgHeight + 'px');
}
$(document).ready(function(){ offsetMsg(); });
$(window).resize(function(){ offsetMsg(); });

function stickMsg(){
  var st = $(document).scrollTop();
  var trigger = $('.game__wrap');
  var distance = trigger.offset().top;
  var end = distance + trigger.height();
  var msg = $('.game__message');

  // pin message to the top when scrolled to .game__wrap
  if( st > distance && st < end ){
    msg.addClass('game__message--fixed');
  }else{
    msg.removeClass('game__message--fixed');
  }
  // pin message to the bottom of the game when you scroll too far
  if( st > end ){
    msg.addClass('game__message--end');
  }else{
    msg.removeClass('game__message--end');
  }
}
if( $('.game__message').length ){
  $(document).scroll(function() { stickMsg(); });
}
