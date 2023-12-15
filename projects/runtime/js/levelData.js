var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot Romp",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY - 20 },
          { type: "sawblade", x: 600, y: groundY- 20 },
          { type: "sawblade", x: 900, y: groundY - 20 },
          { type: "enemy", x: 500, y: groundY - 600 },
          { type: "enemy", x: 700, y: groundY - 600 },
          { type: "enemy", x: 900, y: groundY - 600 },
          { type: "reward", x: 1300, y: groundY - 600 },
          { type: "marker", x: 1500, y: groundY - 600}
        ],
      },
      {
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "enemy", x: 300, y: 50 },
          { type: "sawblade", x: 600, y: groundY - 20 },
          { type: "sawblade", x: 900, y: groundY - 20 },
          { type: "enemy", x: 500, y: 50},
          { type: "enemy", x: 670, y: 50},
          { type: "marker", x: 1500, y: 30},
        ],
      },
      { name: "Robot thingy",
      number: 3,
      speed: -3,
      gameItems: [
        { type: "sawblade", x: 400, y: groundY - 20 },
        { type: "sawblade", x: 600, y: groundY - 20 },
        { type: "sawblade", x: 900, y: groundY- 20 },
        { type: "sawblade", x: 980, y: groundY - 50 },
        { type: "enemy", x: 300, y: 50},
        { type: "enemy", x: 500, y: 50},
        { type: "enemy", x: 700, y: 50},
        { type: "enemy", x: 1300, y: 50},
        { type: "reward", x: 1500, y: 50},
          ]
        }
      ]
    ;
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
