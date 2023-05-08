// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  let selector = document.querySelector("select");
  selector.addEventListener("change", updateImageSound);

  let button = document.querySelector("button");
  button.addEventListener("click", playSound);

  let volume = document.getElementById("volume");
  volume.addEventListener("input", changeVolume);

  let hornAudio = document.querySelector("audio");

  const jsConfetti = new JSConfetti();

  

  function updateImageSound(){
    document.querySelector("img").src = `assets/images/${selector.value}.svg`;
    hornAudio.src = `assets/audio/${selector.value}.mp3`
    
  }

  function playSound(){
    hornAudio.play();
    if(selector.value == "party-horn"){
      jsConfetti.addConfetti();
    }
  }

  function changeVolume(){
      let volumeImg = document.getElementById("volume-controls").querySelector("img");
      if(volume.value < 33 && volume.value > 1){
        volumeImg.src = "assets/icons/volume-level-1.svg";
        
      }else if(volume.value > 32 && volume.value < 64){
        volumeImg.src = "assets/icons/volume-level-2.svg";
        
      }else if(volume.value > 63){
        volumeImg.src = "assets/icons/volume-level-3.svg";
        
      }else{
        volumeImg.src = "assets/icons/volume-level-0.svg";
      }
      hornAudio.volume = volume.value/100;
  }
}