/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ENTER: 13
  }
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height()
  // Game Item Objects
  var leftPaddle = ObjectFactory("#leftPaddle");
  var rightPaddle = ObjectFactory("#rightPaddle");
  var ball = ObjectFactory("#ball");
  var player1Score = 0;
  var player2Score = 0;
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  //$(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keydown', handleKeyDown);                           // handling key down events
  $(document).on('keyup', handleKeyUp);
  startBall();
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem(leftPaddle);
    repositionGameItem(rightPaddle);
    repositionGameItem(ball);
    wallCollision(leftPaddle);
    wallCollision(rightPaddle);
    wallCollision(ball);
    redrawGameItem(leftPaddle);
    redrawGameItem(rightPaddle);
    redrawGameItem(ball);
  }
  /*
  Shows what is printed to the console dependent on what key is pressed.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.W) {
      leftPaddle.speedY = -5;
      console.log("W pressed");
    }
    if (event.which === KEY.S) {
      leftPaddle.speedY = 5;
      console.log("S pressed");
    }
    if (event.which === KEY.UP) {
      rightPaddle.speedY = -5;
      console.log("UP pressed");
    }
    if (event.which === KEY.DOWN) {
      rightPaddle.speedY = 5;
      console.log("DOWN pressed");
    }
  
    //console.log(event.which)
  }
  /*
    Calls depedning on what key is released.
  */
  function handleKeyUp(event){
    if (event.which === KEY.W) {
      leftPaddle.speedY = 0;
      console.log("W released");
    }
    if (event.which === KEY.S) {
      leftPaddle.speedY = 0;
      console.log("S released");
    }
    if (event.which === KEY.UP) {
      rightPaddle.speedY = 0;
      console.log("UP released");
    }
    if (event.which === KEY.DOWN) {
      rightPaddle.speedY = 0;
      console.log("DOWN released");
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  /*
  Creates game items
  */
  function ObjectFactory(id){
    var gameItem = {};
    gameItem.id = id;
    gameItem.x = parseFloat($(id).css("left"));
    gameItem.y = parseFloat($(id).css("top"));
    gameItem.speedX = 0;
    gameItem.speedY = 0;
    gameItem.width = $(id).width();
    gameItem.height = $(id).height();
    return gameItem;
  }
  //takes object and moves it
  function repositionGameItem(item) {
    //pulls all relevant data
    let speedX = item.speedX;
    let speedY = item.speedY;
    //moves position
    item.x += speedX;
    item.y += speedY;
  }
  //takes the object and moves it to where we can see it.
  function redrawGameItem(item) {
    //This pulls all relative data except speed
    let coordX = item.x;
    let coordY = item.y;
    let id = item.id;
    //Redraws the x pixels
    $(item.id).css("left", coordX);
    $(item.id).css("top", coordY);
  }
  
  function wallCollision(item) {
    //pull relevant data
    let coordX = item.x;
    let coordY = item.y;
    let speedX = item.speedX;
    let speedY = item.speedY;
    let width = BOARD_WIDTH; 
    let height = BOARD_HEIGHT; 

    if(doCollide(ball,leftPaddle)) {
      //collide swith left paddle
      item.x -= speedX;
      item.speedX = -speedX;
    }
    if(coordX < 0){
      //ball collides with left wall, then it resets the ball and increases score
      if(item.id === "#ball"){
        player2Score++;
        $("#score2").text("Player 2 Score: " + player2Score);
        if(player2Score === 10){
          endGame();
          alert("Player 2 is the winner!");
        }
        startBall();
      }
    }
    if (coordY < 0) {
      //collides with top wall
      item.y -= speedY;
      item.speedY = -speedY;
    }
    if (coordX + item.width > width || doCollide(ball,rightPaddle)) {
      //collides with right wall
      item.x -= speedX;
      item.speedX = -speedX;
    }
    if (coordY + item.height > height) {
      //collides with bottom wall
      item.y -= speedY;
      item.speedY = -speedY;
    }
    if(coordX + item.width > width){
      //ball collides with right paddle, then reset the ball and increase score
      if(item.id === "#ball"){
        player1Score++;
        $("#score1").text("Player 1 Score: " + player1Score);
        if(player1Score === 10){
          endGame();
          alert("Player 1 is the winner!");
        }
        startBall();
      }
    }
  }
  //handle paddle-ball collisions
  function doCollide(square1, square2) {
    // TODO: calculate and store the remaining
    // sides of the square1
    square1.leftX = square1.x;
    square1.topY = square1.y;
    square1.bottomY = square1.y + square1.height
    square1.rightX = square1.x + square1.width
    
    // TODO: Do the same for square2
    square2.leftX = square2.x;
    square2.topY = square2.y;
    square2.bottomY = square2.y + square2.height
    square2.rightX = square2.x + square2.width
    // TODO: Return true if they are overlapping, false otherwise
   if(square1.leftX < square2.rightX && square1.rightX > square2.leftX && square1.topY < square2.bottomY && square1.bottomY > square2.topY){
     return true
   
	// Hint: use the following conditions:
    // red left < blue right
    // red right > blue left
    // red top < blue bottom
    // red bottom > blue top

    // TODO: Return true for the overlapping, otherwise false
    if(square1.leftX > square2.rightX){
      return false;
    } else if(square1.rightX < square2.leftX){
      return false;
    } else if(square1.topY > square2.bottomY){
      return false;
    } else if(square1.bottomY < square2.topY){
      return false;
    } else {
      return true;
    }
 
  }
}
  // Gives the ball a starting position and a random speed
  function startBall(){
    ball.x = 245
    ball.y = 175
    ball.speedX = randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  }
 
  
  function endGame() {
    // stops the timer
    clearInterval(interval);

    // turn off handlers
    $(document).off();
  }
}