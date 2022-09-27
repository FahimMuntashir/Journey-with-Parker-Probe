window.onload = function () {
  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  var categories;         // Array of categories
  var selectedCategory;   // Selected category
  var getHint;            // Word getHint
  var word;               // Selected word
  var guess;              // Guess
  var guesses = [];       // Stored guesses
  var lives;              // Lives
  var counter;            // Count correct guesses
  var space;              // Number of spaces in word '-'

  // Get elements
  var showLives = document.getElementById("mylives");
  var showCategory = document.getElementById("scategory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");

  // Create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }

  // Select Category
  var selectCat = function () {
    if (selectedCategory === categories[0]) {
      categoryName.innerHTML = "The Selected Category Is Big Stuffs in the Solar System";
    } else if (selectedCategory === categories[1]) {
      categoryName.innerHTML = "The Selected Category Is Planets";
    } else if (selectedCategory === categories[2]) {
      categoryName.innerHTML = "The Selected Category Is Dwarf Planets";
    }
  }

  // Create guesses ul
  result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      guesses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

  // Show lives
  comments = function () {
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "Game Over!";
      setTimeout(reset, 1500)
    }
    for (i = 0; i < guesses.length; i++) {
      if (counter + space === guesses.length) {
        showLives.innerHTML = "You Win!";
        setTimeout(reset, 1500)
      }
    }
  }

  // Animate man
  var animate = function () {
    var drawMe = lives;
    drawArray[drawMe]();
  }

  // Hangman
  canvas = function () {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
  };

  head = function () {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI * 2, true);
    context.stroke();
  }

  draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
  }

  frame1 = function () {
    draw(0, 150, 150, 150);
  };

  frame2 = function () {
    draw(10, 0, 10, 600);
  };

  frame3 = function () {
    draw(0, 5, 70, 5);
  };

  frame4 = function () {
    draw(60, 5, 60, 15);
  };

  torso = function () {
    draw(60, 36, 60, 70);
  };

  rightArm = function () {
    draw(60, 46, 100, 50);
  };

  leftArm = function () {
    draw(60, 46, 20, 50);
  };

  rightLeg = function () {
    draw(60, 70, 100, 100);
  };

  leftLeg = function () {
    draw(60, 70, 20, 100);
  };

  drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];

  // OnClick Function
  check = function () {
    list.onclick = function () {
      var guess = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          guesses[i].innerHTML = guess;
          counter += 1;
        }
      }
      var j = (word.indexOf(guess));
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    }
  }

  // Play
  play = function () {
    categories = [
      ['sun', 'kuiper-belt', 'oort-cloud'],
      ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'],
      ['pluto', 'ceres', 'makemake', 'haumea', 'eris']
    ];

    selectedCategory = categories[Math.floor(Math.random() * categories.length)];
    word = selectedCategory[Math.floor(Math.random() * selectedCategory.length)];
    word = word.replace(/\s/g, "-");
    buttons();

    guesses = [];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
    canvas();
  }

  play();

  // Hint
  getHint.onclick = function () {
    hints = [
      ['A star that we all know', 'A belt in the Solar System', 'A cloud in the Solar System'],
      ['Smallest planet', 'Second planet from the Sun', 'Our home planet', 'Fourth planet from the Sun - the red planet', 'Largest planet', 'Jewel of the Solar System - Sixth planet from the Sun', 'The sideways planet', 'The windiest planet - a blue planet'],
      ['Double planet system', 'Roman goddess of grain crops and harvests', 'Second largest Kuiper Belt object', 'One of the fastest rotating large objects in our solar system, oval-shaped', 'The most massive and second-largest known dwarf planet']
    ];

    var categoryIndex = categories.indexOf(selectedCategory);
    var hintIndex = selectedCategory.indexOf(word);
    showClue.innerHTML = "Hint: " + hints[categoryIndex][hintIndex];
  };

  // Reset
  document.getElementById('reset').onclick = reset;

  function reset() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "Hint: ";
    context.clearRect(0, 0, 400, 400);
    play();
  };
};