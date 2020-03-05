const body = document.getElementsByTagName('body')[0];
const mainWrap = document.getElementById('main-wrapper');


const gameWrap = document.createElement('div');
gameWrap.style.width = '840px';
gameWrap.style.height = '650px';
gameWrap.style.position = 'relative';
gameWrap.style.background = "url('./images/road1.png')";
gameWrap.style.backgorundRepeat = 'repeat-y';
gameWrap.style.overflow = 'hidden';
mainWrap.appendChild(gameWrap);


let scoreboard = document.createElement('div');
scoreboard.style.background = 'darkred';
scoreboard.style.width = '250px';
scoreboard.style.height = '250px';
scoreboard.style.textAlign = 'center';
scoreboard.style.position = 'absolute';
scoreboard.style.zIndex = 30;
scoreboard.style.top = '50px';
scoreboard.style.left = '50px';
scoreboard.innerHTML = '0';
mainWrap.appendChild(scoreboard);


const resetButton = document.createElement('button');
resetButton.innerHTML = 'RESET';
resetButton.onclick = function () {
  window.location.reload();
};
mainWrap.appendChild(resetButton);


function randomnum() {
  let x = Math.floor(Math.random() * 4);
  x = 185 + x * 130;
  return x;
}


function $zombie(posx) {
  this.x = posx; this.y = 550;
  var that = this;

  this.create$zombie = function () {
    let $zombie = document.createElement('div');
    $zombie.style.width = '50px';
    $zombie.style.height = '50px';
    $zombie.style.position = 'absolute';
    $zombie.style.left = this.x + 'px';
    $zombie.style.top = this.y + 'px';
    $zombie.style.background = "url('./images/zombie.png')";
    $zombie.style.backgroundPosition = '0px 0px';
    gameWrap.appendChild($zombie);
    return $zombie;
  }

  this.element = this.create$zombie();

  this.updatePositionX = function (offset) {
    this.x += offset;
    this.element.style.left = this.x + 'px';
  }

  this.str = function () {
    return this.posx;
  }
}

function Obstacle(posx) {
  this.x = posx; this.y = -90;
  let that = this;

  this.createObstacle = function () {
    let obstacle = document.createElement('div');
    obstacle.style.width = '90px';
    obstacle.style.height = '90px';
    obstacle.style.position = 'absolute';
    obstacle.style.left = this.x + 'px';
    obstacle.style.top = this.y + 'px';
    obstacle.style.background = "url('/images/wire1.png')";
    obstacle.style.backgroundPosition = '0px 0px';
    gameWrap.appendChild(obstacle);
    return obstacle;
  }

  this.element = this.createObstacle();

  this.updatePosition = function () {
    this.y += 2;
    this.element.style.top = this.y + 'px';
    if (this.y >= 640){
      gameOver();
    }
  }

  this.kill = function () {
    gameWrap.removeChild(this.element);
    delete this;
  }

  this.str = function () {
    return this.posx + ' px ' + this.posy;
  }
}


function brain(posx) {
  this.x = posx; this.y = -90;

  this.createbrain = function () {
    let brain = document.createElement('div');
    brain.style.width = '90px';
    brain.style.height = '90px';
    brain.style.position = 'absolute';
    brain.style.left = this.x + 'px';
    brain.style.top = this.y + 'px';
    brain.style.background = "url('./images/brain.png')";
    brain.style.backgroundPosition = '0px 0px';
    gameWrap.appendChild(brain);
    return brain;
  }

  this.element = this.createbrain();

  this.updatePosition = function () {
    this.y += 2;
    this.element.style.top = this.y + 'px';
    if (this.y >= 640){
      gameOver();
    }
  }

  this.kill = function () {
    gameWrap.removeChild(this.element);
    
    delete this;
  }
}


function Bullet(posx, posy) {
  this.x = posx; this.y = posy;
  let that = this;

  this.createBullet = function () {
    let bullet = document.createElement('div');
    bullet.style.width = '20px';
    bullet.style.height = '20px';
    bullet.style.position = 'absolute';
    bullet.style.left = this.x + 'px';
    bullet.style.top = this.y + 'px';
    bullet.style.background = "url('./images/slime.png')";
    bullet.style.backgroundPosition = '0px 0px';
    gameWrap.appendChild(bullet);
    return bullet;
  }

  this.element = this.createBullet();

  this.updatePosition = function () {
    this.y -= 2;
    this.element.style.top = this.y + 'px';
    if (this.y <= 0) {
      allBullets.splice(allBullets.indexOf(this), 1);
      this.kill()
    }
  }

  this.kill = function () {
    gameWrap.removeChild(this.element);
    delete this;
  }
}

let checkCollision = function (object1, object2) {
  if (object2.y + 90 >= object1.y && object2.y <= object1.y + 90 && object2.x + 90 >= object1.x && object2.x <= object1.x + 90) {
    return 1;
  }
}


let gameOver = function(){
  clearInterval(backgroundInterval);
  clearInterval(obstacleInterval);
  document.onkeydown = null;
  var gyamover = document.createElement('div');
  gyamover.style.background = 'red';
  gyamover.style.width = '840px';
  gyamover.style.height= '150px';
  gyamover.style.position = 'relative';
  gyamover.style.left = '0%';
  gyamover.style.top = '30%';
  gyamover.style.textAlign = 'center';
  gyamover.style.fontSize = '50px';
  gyamover.innerHTML = 'GAME OVER <br> Your Score is: '+score;
  gameWrap.appendChild(gyamover);
  console.log("Game Over");
}


let score = 0;


let zombie = new $zombie(185);


let allObstacles = [];


let allBullets = [];


let allbrains = [];


let speed = 12;


let increment = 0;
let backgroundInterval = setInterval(function () {
  
  gameWrap.style.backgroundPosition = '0px ' + increment + 'px';

  allObstacles.forEach(function (obs) {
    obs.updatePosition();
  });

  allbrains.forEach(function (brain) {
    brain.updatePosition();
  });
 
  allBullets.forEach(function (bull) {
    bull.updatePosition();
  });
 
  allObstacles.forEach(function (obs) {
    if (checkCollision(obs, zombie)) {
      gameOver();
    }
  
    allBullets.forEach(function (bull) {
      if (checkCollision(obs, bull)) {
        obs.kill();
        allObstacles.splice(allObstacles.indexOf(obs), 1);
        bull.kill();
        allBullets.splice(allBullets.indexOf(bull), 1);
      }
    });
  });

  allbrains.forEach(function(brain){
    if (checkCollision(brain, zombie)) {
      brain.kill();
      allbrains.splice(allbrains.indexOf(brain),1);
    }
    allBullets.forEach(function(bull){
      if (checkCollision(brain, bull)) {
        gameOver();
      }
    });
  });
  
  scoreboard.innerHTML = score;
  
  increment += 2;
}, 10);


let obstacleInterval = setInterval(function () {
  let option = Math.floor(Math.random() * 2);
  if (option == 0) {
    obstacleLane = randomnum();
    obs = new Obstacle(obstacleLane);
    allObstacles.push(obs);
  } else {
    brainLane = randomnum();
    brain = new brain(brainLane);
    allbrains.push(brain);
  }
  score++;
}, 1000);



document.onkeydown = function (event) {
  console.log("document.onkeydown -> event.keyCode", event.keyCode)
  switch (event.keyCode) {
    //  lArrow
    case 37:
      if (zombie.x >= 55 ) {
        zombie.updatePositionX(-130)
          // console.log("document.onkeydown -> zombie", zombie)
      }
      break;
    // rArrow
    case 39:
      if (zombie.x <= 575) {
        zombie.updatePositionX(130);
        // console.log("document.onkeydown -> zombie", zombie)
      }
      break;
    // Up arrow
    case 38:
      var bull = new Bullet(zombie.x + 35, zombie.y);
      allBullets.push(bull);
      break;
    default:
      console.log('Unknown Key Pressed!!');
  }
};

