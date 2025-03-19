/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  }
  
  // Game Item Objects
  var walker = {
    coordX: 0,
    coordY: 0,
    speedX: 0,
    speedY: 0
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame at 60fps
  $(document).on('keydown', handleKeyDown);                           // handling key down events
  $(document).on('keyup', handleKeyUp);                               // handling key up events
  $("#walker").on('click', changeColor);                              // changing color on clicking player
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem(walker);
    wallCollision(walker);
    redrawGameItem(walker);
    
    //console.log("X" + walker.coordX);
    //console.log("Y" + walker.coordY);
  }
  
  /* 
  Called in response to keypresses.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      walker.speedX = -5;
      console.log("LEFT pressed");
    }
    if (event.which === KEY.UP) {
      walker.speedY = -5;
      console.log("UP pressed");
    }
    if (event.which === KEY.RIGHT) {
      walker.speedX = 5;
      console.log("RIGHT pressed");
    }
    if (event.which === KEY.DOWN) {
      walker.speedY = 5;
      console.log("DOWN pressed");
    }
    //console.log(event.which)
  }
  /*
    Called in response to key releases.
  */
  function handleKeyUp(event){
    if (event.which === KEY.LEFT) {
      walker.speedX = 0;
      console.log("LEFT released");
    }
    if (event.which === KEY.UP) {
      walker.speedY = 0;
      console.log("UP released");
    }
    if (event.which === KEY.RIGHT) {
      walker.speedX = 0;
      console.log("RIGHT released");
    }
    if (event.which === KEY.DOWN) {
      walker.speedY = 0;
      console.log("DOWN released");
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  //taking an object and moving it
  function repositionGameItem(item) {
    //pulling all relevant data
    let speedX = item.speedX;
    let speedY = item.speedY;

    item.coordX += speedX;
    item.coordY += speedY;
  }
  //taking an object and moving it visually
  function redrawGameItem(item) {
    //utilizes relavent data, except speed
    let coordX = item.coordX;
    let coordY = item.coordY;
    //redraws the x pixels from the left and y pixels from the top
    $("#walker").css("left", coordX);
    $("#walker").css("top", coordY);
  }
  //be moved behind walls when past them
  function wallCollision(item) {
    //pulls relevant data and makes containers.
    let coordX = item.coordX;
    let coordY = item.coordY;
    let speedX = item.speedX;
    let speedY = item.speedY;
    let width = $("#board").width() - 45;
    let height = $("#board").height() - 45;

    if (coordX < 0) {
      //collide with left wall
      item.coordX -= speedX;
    }
    if (coordY < 0) {
      //collide with top wall
      item.coordY -= speedY;
    }
    if (coordX > width) {
      //collide with right wall
      item.coordX -= speedX;
    }
    if (coordY > height) {
      //collide with bottom wall
      item.coordY -= speedY;
    }
  }
}
