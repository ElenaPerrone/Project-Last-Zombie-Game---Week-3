let zombie = {
  positionX: 0,
  positionY: 0
};

let $zombie = document.getElementById("zombie");

function moveZombie() {
  document.addEventListener("keydown", event => {
    if (event.key === "ArrowRight") {
      zombie.positionX += 10;
      checkGrid();
      renderZombie();
    } else if (event.key === "ArrowLeft") {
      zombie.positionX -= 10;
      checkGrid();
      renderZombie();
    } else {
      console.log(`Unknown controls`);
    }
  });
}
function checkGrid() {
  if (zombie.positionX >= 100) {
    zombie.positionX = 90;
  } else if (zombie.positionX < 0) {
   zombie.positionX = 0;
  }
}

function renderZombie() {
  let $gameplay = document.querySelector("#gameplay");
  let $zombieImage = document.createElement("img");
  $zombieImage.setAttribute("src", "/images/zombie.png");
  $zombieImage.setAttribute("id", "zombie");
  $zombieImage.style.left = `${zombie.positionX}%`;
  $gameplay.appendChild($zombieImage);
}

moveZombie();
