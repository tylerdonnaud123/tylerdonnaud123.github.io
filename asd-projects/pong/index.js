/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
  function makeGameItem(box){
    var box = {};
    box.x = $(box).css("left");
    box.y = $(box).css("top");
    box.width = $(box).width();
    box.height = $(box).height();
    box.speedX = 1;
    box.speedY = 1;
    box.id = box;
    return box
  }
makeGameItem("#ball")
makeGameItem("#rightPaddle")
makeGameItem("#leftPaddle")

var KEY = {
  UP: 38,
  DOWN: 40,
  W: 87,
  S: 83,
}
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keydown', handleKeyDown);   
  $(document).on('keyup', handleKeyUp);   
  startBall()
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
moveBox()
  }

  /* 
  Called in response to events.
  */
  function handleEvent(event) {
    var KEY = event.which
    console.log(KEY)
    
    if (KEY === KEY.UP){
      console.log("up arrow pressed")
    }
    if (KEY === KEY.W){
      console.log("w pressed")
    }
    if (KEY === KEY.DOWN){
      console.log("down arrow pressed")
    }
    if (KEY === KEY.S){
      console.log("s pressed")
    }
    
    if (event.which === KEY.UP) {
      rightPaddle.speedY = -5;

    }if (event.which === KEY.DOWN) {
      rightPaddle.speedY = 5;


    }if (event.which === KEY.W) {
      leftPaddle.speedY = -5;

      
    }if (event.which === KEY.S) {
      walker.speedY = 5;

    }
  }
    
  function handleKeyUp(event){
    if(event.which === KEY.UP) {
      rightPaddle.speedY = 0;

    }if(event.which === KEY.DOWN) {
      rightPaddle.speedY = 0;

    }if(event.which === KEY.W) {
      leftPaddle.speedY = 0;

    }if(event.which === KEY.S) {
      leftPaddle.speedY = 0;

    }
  }

  

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function startBall(){
    ball.x = 200;
    ball.y = 200;
  }
 
  function moveBox() {
    ball.x += ball.speedX; // update the position of the box along the x-axis
    $(ball.id).css("left", ball.x); // draw the box in the new location in terms of left.
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}
  

