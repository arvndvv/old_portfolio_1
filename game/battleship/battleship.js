//intro and audio settings
var myAudio = document.getElementById("myAudio");
myAudio.play();
function togglePlay() {
  myAudio.pause();
  var myAudi = document.getElementById("bgm");
  myAudi.play();
  myAudi.loop = true;
  myAudio.loop = true;
  var intro = document.getElementById("intro");
  var main = document.getElementById("main");
  intro.style.opacity = 0;
  intro.style.visibility = "hidden";
  main.style.visibility = "visible";
}
myAudio.onplaying = function() {
  isPlaying = true;
};
myAudio.onpause = function() {
  isPlaying = false;
};
//click sound-when miss fired
function miss() {
  var audio = new Audio("music/miss.mp3");
  audio.play();
}
function hit() {
  var audio = new Audio("music/hit.mp3");
  audio.play();
}
function destroye() {
  var audio = new Audio("music/destroyed.mp3");
  audio.play();
}
function launch() {
  var audio = new Audio("music/launch.mp3");
  audio.play();
}

//final out
//to print the output ogf game
var final = document.getElementById("final");
var end = document.getElementById("end");
// set grid rows and columns and the size of each square
var rows = 10;
var cols = 10;
var squareSize = 50;
function tryagain() {
  location.reload();
}

// get the container element
var gameBoardContainer = document.getElementById("gameboard");

// make the grid columns and rows
for (i = 0; i < cols; i++) {
  for (j = 0; j < rows; j++) {
    // create a new div HTML element for each grid square and make it the right size
    var square = document.createElement("div");
    gameBoardContainer.appendChild(square);

    // give each div element a unique id based on its row and column, like "s00"
    square.id = "s" + j + i;

    // set each grid square's coordinates: multiples of the current row or column number
    var topPosition = j * squareSize;
    var leftPosition = i * squareSize;

    // use CSS absolute positioning to place each grid square on the page
    square.style.top = topPosition + "px";
    square.style.left = leftPosition + "px";
  }
}

/* lazy way of tracking when the game is won: just increment hitCount on every hit
   in this version, and according to the official Hasbro rules (http://www.hasbro.com/common/instruct/BattleShip_(2002).PDF)
   there are 17 hits to be made in order to win the game:
      Carrier     - 5 hits
      Battleship  - 4 hits
      Destroyer   - 3 hits
      Submarine   - 3 hits
      Patrol Boat - 2 hits
*/
var hitCount = 0;

/* create the 2d array that will contain the status of each square on the board
   and place ships on the board (later, create function for random placement!)

   0 = empty, 1 = part of a ship, 2 = a sunken part of a ship, 3 = a missed shot
*/
var gameBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var destroyed = 0;
var ships = ["carrier", "battleship", "destroyer", "submarine", "patrol"];
var carrier = {};
var battleship = {};
var destroyer = {};
var submarine = {};
var patrol = {};
var shipcount = 5;
var torpedo = 30;
var s = torpedo + " torpedos left!";
document.getElementById("torpedo").innerHTML = s;
//carrier

while (shipcount == 5) {
  //i=row j=column
  var dir = Math.floor(Math.random() * 2);
  if (dir == 0) {
    f = 0;
    var i = Math.floor(Math.random() * 10);
    var j = Math.floor(Math.random() * 5);

    var t = j;
    var x = j + 5;
    for (t; t < x; t++) {
      if (gameBoard[i][t] != 0) {
        f = 1;

        break;
      }
    }
    if (f == 0) {
      carrier = { row: i, col: j, d: 0, l: 5 };
      for (j; j < x; j++) {
        gameBoard[i][j] = 1;
      }

      shipcount--;
    }
  } else {
    f = 0;
    var i = Math.floor(Math.random() * 5);
    var j = Math.floor(Math.random() * 10);

    var t = i;
    var x = i + 5;
    for (; t < x; t++) {
      if (gameBoard[t][j] != 0) {
        f = 1;
        break;
      }
    }
    if (f == 0) {
      carrier = { row: i, col: j, d: 1, l: 5 };
      for (; i < x; i++) {
        gameBoard[i][j] = 1;
      }

      shipcount--;
    }
  }
}
//battleship
while (shipcount == 4) {
  //i=row j=column
  var dir = Math.floor(Math.random() * 2);
  if (dir == 0) {
    f = 0;
    var i = Math.floor(Math.random() * 10);
    var j = Math.floor(Math.random() * 6);

    var t = j;
    var x = j + 4;
    for (t; t < x; t++) {
      if (gameBoard[i][t] != 0) {
        f = 1;

        break;
      }
    }
    if (f == 0) {
      battleship = { row: i, col: j, d: 0, l: 4 };
      for (j; j < x; j++) {
        gameBoard[i][j] = 1;
      }
      shipcount--;
    }
  } else {
    f = 0;
    var i = Math.floor(Math.random() * 6);
    var j = Math.floor(Math.random() * 10);

    var t = i;
    var x = i + 4;
    for (; t < x; t++) {
      if (gameBoard[t][j] != 0) {
        f = 1;
        break;
      }
    }
    if (f == 0) {
      battleship = { row: i, col: j, d: 1, l: 4 };
      for (; i < x; i++) {
        gameBoard[i][j] = 1;
      }
      shipcount--;
    }
  }
}
//destroyer/submarine
while (shipcount == 3 || shipcount == 2) {
  //i=row j=column
  var dir = Math.floor(Math.random() * 2);
  if (dir == 0) {
    f = 0;
    var i = Math.floor(Math.random() * 10);
    var j = Math.floor(Math.random() * 7);

    var t = j;
    var x = j + 3;
    for (t; t < x; t++) {
      if (gameBoard[i][t] != 0) {
        f = 1;

        break;
      }
    }
    if (f == 0) {
      if (shipcount == 3) {
        destroyer = { row: i, col: j, d: 0, l: 3 };
      } else {
        submarine = { row: i, col: j, d: 0, l: 3 };
      }
      for (j; j < x; j++) {
        gameBoard[i][j] = 1;
      }
      shipcount--;
    }
  } else {
    f = 0;
    var i = Math.floor(Math.random() * 7);
    var j = Math.floor(Math.random() * 10);

    var t = i;
    var x = i + 3;
    for (; t < x; t++) {
      if (gameBoard[t][j] != 0) {
        f = 1;
        break;
      }
    }
    if (f == 0) {
      if (shipcount == 3) {
        destroyer = { row: i, col: j, d: 1, l: 3 };
      } else {
        submarine = { row: i, col: j, d: 1, l: 3 };
      }
      for (; i < x; i++) {
        gameBoard[i][j] = 1;
      }
      shipcount--;
    }
  }
}
//patrol boat
while (shipcount == 1) {
  //i=row j=column
  var dir = Math.floor(Math.random() * 2);
  if (dir == 0) {
    f = 0;
    var i = Math.floor(Math.random() * 10);
    var j = Math.floor(Math.random() * 8);

    var t = j;
    var x = j + 2;
    for (t; t < x; t++) {
      if (gameBoard[i][t] != 0) {
        f = 1;

        break;
      }
    }
    if (f == 0) {
      patrol = { row: i, col: j, d: 0, l: 2 };
      for (j; j < x; j++) {
        gameBoard[i][j] = 1;
      }
      shipcount--;
    }
  } else {
    f = 0;
    var i = Math.floor(Math.random() * 8);
    var j = Math.floor(Math.random() * 10);

    var t = i;
    var x = i + 2;
    for (; t < x; t++) {
      if (gameBoard[t][j] != 0) {
        f = 1;
        break;
      }
    }
    if (f == 0) {
      patrol = { row: i, col: j, d: 1, l: 2 };
      for (; i < x; i++) {
        gameBoard[i][j] = 1;
      }
      shipcount--;
    }
  }
}
/*
for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    console.log(gameBoard[i][j]);
  }
}*/
/*console.log(
  "battleship" +
    battleship["row"] +
    battleship["col"] +
    "dir:" +
    battleship["d"]
);
console.log(
  "carrier" + carrier["row"] + carrier["col"] + "dir:" + carrier["d"]
);
console.log(
  "destroyer" + destroyer["row"] + destroyer["col"] + "dir:" + destroyer["d"]
);
console.log(
  "submarine" + submarine["row"] + submarine["col"] + "dir:" + submarine["d"]
);
console.log("patrol" + patrol["row"] + patrol["col"] + "dir:" + patrol["d"]);*/
// set event listener for all elements in gameboard, run fireTorpedo function when square is clicked
gameBoardContainer.addEventListener("click", fireTorpedo, false);

// initial code via http://www.kirupa.com/html5/handling_events_for_many_elements.htm:
function fireTorpedo(e) {
  torpedo--;
  setTimeout(launch, 0);

  var s = torpedo + " torpedos left!";

  if (torpedo >= 0) {
    if (torpedo < 10) {
      document.getElementById("torpedo").style.color = "red";
    }
    document.getElementById("torpedo").innerHTML = s;
    // if item clicked (e.target) is not the parent element on which the event listener was set (e.currentTarget)
    if (e.target !== e.currentTarget) {
      //console.log(e.target.id);
      // extract row and column # from the HTML element's id
      var row = e.target.id.substring(1, 2);
      var col = e.target.id.substring(2, 3);
      //alert("Clicked on row " + row + ", col " + col);

      // if player clicks a square with no ship, change the color and change square's value
      if (gameBoard[row][col] == 0) {
        //miss();
        setTimeout(miss, 3000);
        e.target.style.background = "#bbb";
        // set this square's value to 3 to indicate that they fired and missed
        gameBoard[row][col] = 3;

        // if player clicks a square with a ship, change the color and change square's value
      } else if (gameBoard[row][col] == 1) {
        // hit();
        setTimeout(hit, 3000);
        e.target.style.background = "red";
        // set this square's value to 2 to indicate the ship has been hit
        gameBoard[row][col] = 2;
        //check if fully destroyed var ships = ["carrier", "battleship", "destroyer", "submarine", "patrol"];
        for (var i = 0; i < ships.length; i++) {
          var x = window[ships[i]]["row"];
          var y = window[ships[i]]["col"];
          var d = window[ships[i]]["d"];

          var des = 0;
          if (d == 0) {
            var l = y + window[ships[i]]["l"];
            for (y; y < l; y++) {
              if (gameBoard[x][y] != 2) {
                des = 0;
                break;
              } else {
                des = 1;
              }
            }
            if (des == 1) {
              setTimeout(destroye, 3000);
              var s = ships[i] + " destroyed!";
              s = s.toUpperCase();
              document.getElementById("out").innerHTML = s;
              var s = ships[i];

              document.getElementById(s).style.textDecoration = "line-through";

              ships.splice(i, 1);
            }
          } else {
            var l = x + window[ships[i]]["l"];
            for (x; x < l; x++) {
              if (gameBoard[x][y] != 2) {
                des = 0;
                break;
              } else {
                des = 1;
              }
            }
            if (des == 1) {
              var s = ships[i] + " destroyed!";
              setTimeout(destroye, 3000); //destroyed();
              s = s.toUpperCase();
              document.getElementById("out").innerHTML = s;
              var s = ships[i];

              document.getElementById(s).style.textDecoration = "line-through";
              ships.splice(i, 1);
            }
          }
        }

        // increment hitCount each time a ship is hit
        hitCount++;
        count = 5;
        //while (count > 0) {}
        // this definitely shouldn't be hard-coded, but here it is anyway. lazy, simple solution:
        if (hitCount == 17) {
          document.getElementById("out").style.color = "green";
          document.getElementById("out").innerHTML =
            "All enemy battleships have been defeated! You win!";
          final.innerHTML =
            "All enemy battleships have been defeated! You win!";
          end.style.background = "url(img/won.jpg)";
          end.style.backgroundSize = "cover";
          end.style.visibility = "visible";
          end.style.opacity = 1;

          //alert("All enemy battleships have been defeated! You win!");
        }

        // if player clicks a square that's been previously hit, let them know
      } else if (gameBoard[row][col] > 1) {
        document.getElementById("out").innerHTML =
          "Stop wasting your torpedos! You already fired at this location.";

        /* alert(
          "Stop wasting your torpedos! You already fired at this location."
        );*/
      }
    }
    e.stopPropagation();
  } else {
    document.getElementById("out").style.color = "red";
    document.getElementById("out").innerHTML = "You have LOST!";
    final.innerHTML = "You have LOST!";
    end.style.background = "url(img/lost.jpg)";
    end.style.backgroundSize = "cover";
    end.style.visibility = "visible";
    end.style.opacity = 1;
    final.style.color = "red";
  }
}
