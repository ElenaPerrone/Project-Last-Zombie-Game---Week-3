function renderAll(){
    let $gameplay = document.querySelector("#gameplay");   
    $gameplay.innerHTML = "";
    renderZombie();
    // renderBrain()
    renderBrains()
}

setInterval(renderAll, 100);

setInterval(() => {
    let brains = {
        positionX: Math.floor(Math.random() * 650) , // width of the game
        positionY: 510 // 1000 px height of game 
      };
    brainsArr.push(brains)// push a new brain in the brains
},400);
