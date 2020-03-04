function renderAll() {
  let $gameplay = document.querySelector("#gameplay");
  $gameplay.innerHTML = "";
  renderZombie();
  renderBrains();
//   checkCollision();
    colision()
}

setInterval(renderAll, 100);

setInterval(() => {
  let brains = {
    positionX: Math.floor(Math.random() * 650), // width of the game
    positionY: 510 // 1000 px height of game
  };
  brainsArr.push(brains); // push a new brain in the brains
}, 400);

// function isCollide(zombie, $brainImage) {
//   const $zombieRect = zombie.getBoundingClientRect();
//   const $brainRect = $brainImage.getBoundingClientRect();
//   console.log($zombieRect);
//   return !(
//     $zombieRect.top + $zombieRect.height < $brainRect.top ||
//     $zombieRect.top > $brainRect.top + $brainRect.height ||
//     $zombieRect.left + $zombieRect.width < $brainRect.left ||
//     $zombieRect.left > $brainRect.left + $brainRect.width
//   );
// }

// function isCollide(element1, element2) {
//   var a = {
//     y: element1.offsetTop - element1.height,
//     x: element1.offsetLeft,
//     height: element1.height,
//     width: element1.width
//   };
//   var b = {
//     y: element2.offsetTop - element2.height,
//     x: element2.offsetLeft,
//     height: element2.height,
//     width: element2.width
//   };
//   return !(
//     a.y + a.height < b.y ||
//     a.y > b.y + b.height ||
//     a.x + a.width < b.x ||
//     a.x > b.x + b.width
//   );
// }
// function checkCollision() {
//   // const $zombie = $zombie.getBoundingClientRect();
//   // const $brainImgRect = $brainImage.getBoundingClientRect();
//   let $brainImage = document.getElementById("cbrain");
//   if (isCollide($zombie, $brainImage)) {
//     console.log("=====>");
//   }
// }
function colision() {
  if (
    (brain.positionX <= zombie.positionX + zombie.width ||
        brain.positionX >= zombie.positionX - zombie.width) &&
        brain.positionY <= zombie.positionY + zombie.height
  ) {
    console.log("------->");
  }
}
