// let brains = {
//   positionX: Math.floor(Math.random() * 800) , // width of the game
//   positionY: 1050 // 1000 px height of game 
// };


let brainsArr = []
// setInterval(renderBrain, 5000)


function renderBrain(brain){
    let $gameplay = document.querySelector("#gameplay");
    let $brainImage = document.createElement("img");
    brain.positionY -= 80;
    $brainImage.setAttribute("src", "/images/cbrain.png")
    $brainImage.setAttribute("id", "cbrain")
    
    
    $brainImage.style.bottom = `${brain.positionY}px`
    $brainImage.style.left = `${brain.positionX}px`

    $gameplay.appendChild($brainImage)

    if(brain.positionY < 0){
      $gameplay.removeChild($brainImage)
    }
    if (brain.positionX === zombie.positionX){

        console.log('!!!!')
      }
}
function renderBrains() {
     for (let i = 0; i < brainsArr.length; i++) {
      renderBrain(brainsArr[i])// call renderBrain on every brain
     }
}

// renderBrains();
