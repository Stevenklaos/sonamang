window.onload = function () {

  var alphabet = ['z', 'y', 'x', 'w', 'v', 'u', 't', 's',
    'r', 'q', 'p', 'o', 'n', 'm', 'l', 'k', 'j', 'i', 'h',
    'g', 'f', 'e', 'd', 'c', 'b', 'a'];

  // Array of different topics
  var categories;

  // Selected catagory
  var chosenCategory;

  // Word getHint
  var getHint;

  // Selected word
  var word;

  // Geuss         
  var guess;

  // Stored geusses array         
  var geusses = [];

  // Lives left
  var lives;

  // Correct guess counter     
  var counter;

  // Number of spaces in word
  var space;

  // Get elements we need to display to the user
  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");

  // create alphabet ul list to show the letters a given user could pick
  var buttons = function () {
    myButtons = document.getElementById('btns');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }

  // Select Catagory of the word
  var selectCat = function () {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML = "";
    }
  }

  // Create guess list that shows the length and the words the user has gotten correct
  result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

  // Show lives of the user
  comments = function () {
    showLives.innerHTML = "You have " + lives + " lives left";
    if (lives < 1) {
      showLives.innerHTML = "Nice try. The word was '" + word + "'!";
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = "You Guessed it!";

      }
    }
  }

  // OnClick Function that checks if the given letter is a part of the secret word
  check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.style.background = "black";
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        }
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        comments();

      } else {
        comments();
      }
    }
  }

  // Play function that picks a random word and sets the starting paramaters
  play = function () {

    // Pick a word that exists in the english lexicon at random from words.js file
    categories = [words.slice(0)];
    console.log(words);
    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(words);
    buttons();

    geusses = [];
    lives = 5;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
  }

  play();

  // Reset the screen to play again
  document.getElementById('reset').onclick = function () {
    location.reload();
  }
}

