'use strict';
//initialize variables
var secretNumber, 
userGuess, 
pastGuesses = [], 
count,
guessHtml, 
userFeedback,
alreadyGuessed,
$newButton,
$form,
$input,
$feedback,
$count,
$guessList;

//runs when dom is ready - set up event handlers
//info box animation
//assigning variables
 function pageLoad(){
	
	/*--- Display information modal box ---*/
  	$('.what').click(function(){
    	$('.overlay').fadeIn(1000);
  	});
  	/*--- Hide information modal box ---*/
  	$('a.close').click(function(){
  		$('.overlay').fadeOut(1000);
  	});

  	//fetch dom objects
  	$newButton = $('a.new');
  	$form = $('form');
    //assign input within user guess function
  	$input = $form.find('#userGuess');
  	$feedback = $('#feedback');
  	$count = $('#count');
  	$guessList = $('#guessList');

    //event handlers
    $form.submit(function(event){
      event.preventDefault();
      getUserGuess();
    });
    $newButton.click(newGame);
    //start the game
    newGame();
}

//new game function
function newGame(){
  //show form again if hidden from previous winner function
	$form.show().find('input[type=submit]').css('opacity','1');
	$('#userGuess').focus();
  resetVariables();
	render();
	generateNumber();
  $feedback.hide().fadeIn(1000);
  $input.hide().fadeIn(500);
  $form.show();
}

//get the user guess
function getUserGuess(){
	//get the user guess
	userGuess = $input.val();
	//reset input value
	$input.val('');
	//focus on input for next guess
	$input.focus();
	//ensure valid input
	if(isCheckGuessValid()){return ;}
	//generate feedback
	generateFeedback();
	//track the past user guesses
	trackGuess();
	//increment the count
	guessCount();
	//render changes to the page
	render();
}

  	//check for valid input
  	function isCheckGuessValid(){
  		if(userGuess % 1 !== 0){
  			alert('please input a number');
  			return false;
  		}
  		if(userGuess < 0 || userGuess > 101){
  			alert('please choose a number between zero and 100');
  			return false;
  		}
  		if(pastGuesses.length > 0){
			$.each(pastGuesses,function(guess,value){
				if(userGuess == value){
					alreadyGuessed = true;
				}
			}); 
		}
		if(alreadyGuessed){
			alreadyGuessed = true;
			alert('You guessed this number already');
			return true;
		}
    return false;
	}

//generate user feedback
function generateFeedback(){
	if(secretNumber == userGuess){
		$feedback.fadeIn(75).fadeOut(75).fadeIn(75);
    winner();
  } else if(Math.abs(secretNumber - userGuess) < 5){
    $feedback.fadeIn(75).fadeOut(75).fadeIn(75);
    userFeedback = 'very hot!';
	} else if(Math.abs(secretNumber - userGuess) < 10){
		$feedback.fadeIn(75).fadeOut(75).fadeIn(75);
    userFeedback = 'hot';
	} else if(Math.abs(secretNumber - userGuess) < 20 && Math.abs(secretNumber - userGuess) > 9){
		$feedback.fadeIn(75).fadeOut(75).fadeIn(75);
    userFeedback = ' warm';
	} else if(Math.abs(secretNumber - userGuess) < 30 && Math.abs(secretNumber - userGuess) > 19){
		$feedback.fadeIn(75).fadeOut(75).fadeIn(75);
    userFeedback = 'cold';
	} else {
		$feedback.fadeIn(75).fadeOut(75).fadeIn(75);
    userFeedback = 'freezing!';
	}
}

//keep track of the users past guesses
function trackGuess(){
	pastGuesses.push(userGuess);
	guessHtml = '';
	if(pastGuesses[0].length) {
		$.each(pastGuesses,function(guess,value){
			guessHtml += '<li>' + value + '</li>';
		});
	}
}

//keep track of guess count
function guessCount(){
	count++;
}

//page render function
function render(){
	$guessList.html(guessHtml);
	$count.html(count);
	$feedback.html(userFeedback);
}

function winner(){
	userFeedback = 'You Won. Click new game to play again';
  $feedback.fadeIn(50).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
	$form.find('input[type=submit]').css('opacity','0');
  $form.hide();
}
  	
//generate secret number
function generateNumber(){
	secretNumber = Math.floor(Math.random()*100)+1;
}

//reset variable 
function resetVariables(){
	count = 0;
	pastGuesses = [];
	guessHtml='';
	userGuess = '';
	userFeedback = 'Make your Guess!';
}

// init 
$(document).ready(pageLoad);

  	
  	

  




