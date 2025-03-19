/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
  var KEY = {
    ENTER: 13,
    RIGHT: 39,
    UP: 38,
    LEFT: 37,
    DOWN: 40,
  };
  var positionX = 0; // the x-coordinate location for the box
  var posistionY = 0; // the y-cordinate location for the box
  var speedX = 0; // the speed for the box along the x-axis
  var speedY = 0; // the speed for the box along the x-axis
  

  // one-time setup
  var interval = setInterval(newFrame, 60000);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    function repositionWalker(){
      positionX += speedX
      posistionY += speedY
    }

    function redrawWalker(){
      $("#walker").css("left", positionX)
      $("#walker").css("top", positionY)    }

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyUp(event) {
    console.log("up")
  }
  
  function handleKeyDown(event) {
      if (event.which === KEY.ENTER) {
        console.log("enter pressed")
      } if (event.which === KEY.LEFT) {
        walker.speedX = -5
      } if (event.which === KEY.RIGHT) {
        walker.speedX = 5
      } if (event.which === KEY.DOWN) {
        walker.speedy = 5
      } if (event.which === KEY.UP) {
        walker.speedX = -5
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
  
}
