const body = document.getElementsByTagName("body")[0];
const mainWrap = document.getElementById("main-wrapper"); //main div in html

// Gameplay
const gameWrap = document.createElement("div");
gameWrap.style.width = "840px";
gameWrap.style.height = "650px";
gameWrap.style.position = "relative";
gameWrap.style.background = "url('./images/road.jpg')";
gameWrap.style.backgorundRepeat = "repeat-y";
gameWrap.style.overflow = "hidden";

mainWrap.appendChild(gameWrap);

// Scoreboard
let scoreboard = document.getElementById("scoreboard");
scoreboard.innerHTML = 'Score: 0'

//Start Button

const $startBtn = document.getElementById("startBtn");
startBtn.onclick = function() {
  initGame();
};

// Reset Button
const resetBtn = document.getElementById("resetBtn");
resetBtn.onclick = function() {
  window.location.reload();
};

// Function to randomize position of the obstacles
// let x is the lane on which obstacle will appear
// conversion to lane cordinates and then render
function randomnum() {
  let x = Math.floor(Math.random() * 4);
  x = 185 + x * 130;
  return x;
}
//Start Game
function initGame() {
  // defines the zombie
  function Zombie(posx) {
    this.x = posx;
    this.y = 550;
    let that = this;

    this.createZombie = function() {
      let Zombie = document.createElement("div");
      Zombie.style.width = "88px";
      Zombie.style.height = "90px";
      Zombie.style.position = "absolute";
      Zombie.style.left = this.x + "px";
      Zombie.style.top = this.y + "px";
      Zombie.style.background = "url('./images/zombie.png')";
      Zombie.style.backgroundPosition = "0px 0px";
      gameWrap.appendChild(Zombie);
      return Zombie;
    };

    this.element = this.createZombie();

    this.updatePositionX = function(offset) {
      this.x += offset;
      this.element.style.left = this.x + "px";
    };

    this.str = function() {
      return this.posx;
    };
  }

  // defines obstacle
  function Obstacle(posx) {
    this.x = posx;
    this.y = -90;
    let that = this;

    this.createObstacle = function() {
      let obstacle = document.createElement("div");
      obstacle.style.width = "90px";
      obstacle.style.height = "90px";
      obstacle.style.position = "absolute";
      obstacle.style.left = this.x + "px";
      obstacle.style.top = this.y + "px";
      obstacle.style.background = "url('./images/human.png')";
      obstacle.style.backgroundPosition = "0px 0px";
      gameWrap.appendChild(obstacle);
      return obstacle;
    };

    this.element = this.createObstacle();

    this.updatePosition = function() {
      this.y += 2;
      this.element.style.top = this.y + "px";
      if (this.y >= 640) {
        console.log("!!!");
        // debugger
        gameOver();
      }
    };

    this.kill = function() {
      gameWrap.removeChild(this.element);
      delete this;
    };

    this.str = function() {
      return this.posx + " px " + this.posy;
    };
  }

  // defines brain
  function Brain(posx) {
    this.x = posx;
    this.y = -90;

    this.createbrain = function() {
      let Brain = document.createElement("div");
      Brain.style.width = "90px";
      Brain.style.height = "90px";
      Brain.style.position = "absolute";
      Brain.style.left = this.x + "px";
      Brain.style.top = this.y + "px";
      Brain.style.background = "url('/images/brain.png')";
      Brain.style.backgroundPosition = "0px 0px";
      gameWrap.appendChild(Brain);
      return Brain;
    };

    this.element = this.createbrain();

    this.updatePosition = function() {
      this.y += 2;
      this.element.style.top = this.y + "px";
      if (this.y >= 640) {
        gameOver();
      }
    };

    this.kill = function() {
      gameWrap.removeChild(this.element);
      // this = null;
      delete this;
    };
  }

  // Defines bullet
  function Bullet(posx, posy) {
    this.x = posx;
    this.y = posy;
    let that = this;

    this.createBullet = function() {
      let bullet = document.createElement("div");
      bullet.style.width = "60px";
      bullet.style.height = "40px";
      bullet.style.position = "absolute";
      bullet.style.left = this.x + "px";
      bullet.style.top = this.y + "px";
      bullet.style.background = "url('./images/bullet.png')";
      bullet.style.backgroundPosition = "0px 0px";
      gameWrap.appendChild(bullet);
      return bullet;
    };

    this.element = this.createBullet();

    this.updatePosition = function() {
      this.y -= 2;
      this.element.style.top = this.y + "px";
      if (this.y <= 0) {
        allBullets.splice(allBullets.indexOf(this), 1);
        this.kill();
      }
    };

    this.kill = function() {
      gameWrap.removeChild(this.element);
      delete this;
    };
  }

  // Collision Detection
  let checkCollision = function(object1, object2) {
    if (
      object2.y + 90 >= object1.y &&
      object2.y <= object1.y + 90 &&
      object2.x + 90 >= object1.x &&
      object2.x <= object1.x + 90
    ) {
      return 1;
    }
  };

  // store score
  let score = 0;

  // create Zombie
  let zombie = new Zombie(185);

  // obstacles array
  let allObstacles = [];

  // bullets array
  let allBullets = [];

  // brains array
  let allbrains = [];

  // controls speed (smaller value, faster game)
  let speed = 12;

  // key bindings 
  document.onkeydown = function(event) {

    switch (event.keyCode) {
      // Left Arrowkey is 37
      case 37:
        if (zombie.x >= 55) {
          zombie.updatePositionX(-130);
        }
        break;
      // Right Arrowkey is 39
      case 39:
        if (zombie.x <= 575) {
          zombie.updatePositionX(130);
        }
        break;
      // Up Arrowkey is 38
      case 38:
        var bull = new Bullet(zombie.x + 35, zombie.y);
        allBullets.push(bull);
        break;
      default:
        console.log("Unknown Key Pressed!!");
    }
  };

  let increment = 0;
  let backgroundInterval = setInterval(function() {
    // background movement
    gameWrap.style.backgroundPosition = "0px " + increment + "px";
    // obstacles movement
    allObstacles.forEach(function(obs) {
      obs.updatePosition();
    });
    // brain movement
    allbrains.forEach(function(Brain) {
      Brain.updatePosition();
    });
    // bullet movement
    allBullets.forEach(function(bull) {
      bull.updatePosition();
    });
    // End game on collision zombie with obstacle
    allObstacles.forEach(function(obs) {
      if (checkCollision(obs, zombie)) {
        gameOver();
      }

      // Destroys obstacle on collision with bullet
      // Destroy the bullet too
      allBullets.forEach(function(bull) {
        if (checkCollision(obs, bull)) {
          obs.kill();
          allObstacles.splice(allObstacles.indexOf(obs), 1);
          bull.kill();
          allBullets.splice(allBullets.indexOf(bull), 1);
        }
      });
    });
    // Remove brain on collision with zombie
    // End game on collison brain  with bullet
    allbrains.forEach(function(Brain) {
      if (checkCollision(Brain, zombie)) {
        Brain.kill();
        allbrains.splice(allbrains.indexOf(Brain), 1);
      }
      allBullets.forEach(function(bull) {
        if (checkCollision(Brain, bull)) {
          gameOver();
        }
      });
    });
    // Update speed display
    scoreboard.innerHTML = `Score: ${score}`;
    // Offset to move background
    increment += 2;
  }, 10);

  // renders obstacle per 1  sec in random lane

  let obstacleInterval = setInterval(function() {
    let option = Math.floor(Math.random() * 2);
    if (option > 0) {
      obstacleLane = randomnum();
      obs = new Obstacle(obstacleLane);
      allObstacles.push(obs);
    } else {
      brainLane = randomnum();
      brain = new Brain(brainLane);
      allbrains.push(brain);
      console.log(brainLane, brain);
    }
    score++;
  }, 1000);
  // what happens when the game ends
  
  let gameOver = function() {
    clearInterval(backgroundInterval);
    clearInterval(obstacleInterval);
    document.onkeydown = null;
    let gmOver = document.createElement("div");
    gmOver.style.background = "red";
    gmOver.style.width = "800px";
    gmOver.style.height = "150px";
    gmOver.style.position = "relative";
    gmOver.style.left = "0%";
    gmOver.style.top = "30%";
    gmOver.style.textAlign = "center";
    gmOver.style.fontSize = "50px";
    gmOver.style.fontFamily = "'Acme', sans-serif";
    gmOver.innerHTML = "You got killed <br> Points: " + score;
    gameWrap.appendChild(gmOver);
  };
}