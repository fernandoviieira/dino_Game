const dino = document.querySelector('.dino');
const background = document.querySelector('.background')

let isJumping = false
let isGameOver = false
let position = 0


function handleKeyUp(event) {
  if (event.keyCode === 32) {
    document.getElementById('sound1').play();
    if (!isJumping) {
     jump()
    }
  }
}

function jump() {

isJumping = true

let upInterval = setInterval(() => {
    if (position >= 200) {
    clearInterval(upInterval)
        
    // Descendo
    let downInterval = setInterval(() => {
        if (position <= 0) {
        clearInterval(downInterval)
        isJumping = false
    } else {
        position -= 30
        dino.style.bottom = position + 'px';
        }
        }, 20)
    } else {
        //Subindo
        position += 30
        dino.style.bottom = position + 'px';
    }
  }, 20)
}

function createCactus() {
    const cactus = document.createElement('div')
    let cactusPosition = 1000
    let randomTime = Math.random() * 6500 

    cactus.classList.add('cactus')
    cactus.style.left = 1000 + 'px'
    background.appendChild(cactus)

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
          // Saiu da tela
          clearInterval(leftInterval)
          background.removeChild(cactus)
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
          // Game over
         
          clearInterval(leftInterval)
          isGameOver = true
         
          document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>'
          
          const myDiv = document.createElement('div')
          myDiv.classList.add('refresh')
          document.body.appendChild(myDiv)
          const btn = document.createElement('input')
          btn.setAttribute("type", "button")
          btn.setAttribute("value", "Clique Aqui")
          myDiv.appendChild(btn)
          btn.addEventListener('click', function(){location.reload()});
         
        } else {
          cactusPosition -= 10
          cactus.style.left = cactusPosition + 'px'
        }
      }, 20)
    
      setTimeout(createCactus, randomTime);
    }

createCactus()
document.addEventListener('keyup', handleKeyUp)
