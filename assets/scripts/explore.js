// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const synth = window.speechSynthesis;
  const voiceSelect = document.querySelector("select");
  let voices = [];

  function populateVoiceList(){
    voices = synth.getVoices();
    
    for(let i=  0; i <voices.length; i++){
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang}`;

      if (voices[i].default) {
        option.textContent += " — DEFAULT";
      }
      
      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }
  }

  populateVoiceList();
  if(speechSynthesis.onvoiceschanged !== undefined){
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  let button = document.querySelector("button");
  button.addEventListener("click", playSound);

  function playSound(){
    let textToSpeak = document.getElementById("text-to-speak");
    let speak = new SpeechSynthesisUtterance(textToSpeak.value);
    let selectedOpt = voiceSelect.selectedOptions[0].getAttribute("data-name");
    for(let i = 0; i < voices.length; i++){
      if(voices[i].name === selectedOpt){
        speak.voice = voices[i];
      }
    }

    speak.onstart = (event) => {
      document.querySelector("img").src = "./assets/images/smiling-open.png"
    }
    speak.onend = (event) => {
      document.querySelector("img").src = "./assets/images/smiling.png"
    }
    console.log(synth.speaking);
    synth.speak(speak);
    console.log(synth.speaking);
    
  }
  // TODO
}