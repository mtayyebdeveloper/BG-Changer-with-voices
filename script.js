const startBtn = document.getElementById("startBtn");
const resultElem = document.getElementById("result");
const answers = document.getElementById("answers");
let istrue =false;

// Check if the browser supports the Web Speech API
if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();

  // Set some recognition options
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = true;

  // Event handler when speech is recognized
  recognition.onresult = (event) => {
    const result = event.results[0][0].transcript;
    resultElem.innerHTML = result;
    alldata(result)
    // speaker(result)
  };

  // Event handler when recognition is started
  recognition.onstart = () => {
    resultElem.textContent = "Listening...";
  };

//   Event handler when recognition is stopped
  recognition.onend = () => {
    startBtn.disabled = false;
    startBtn.textContent = "Start Listening";
  };

  // Event handler for errors
  recognition.onerror = (event) => {
    resultElem.textContent = `Error: ${event.error}`;
    startBtn.disabled = false;
    startBtn.textContent = "Start Listening";
  };

  // Event listener for the start button
  startBtn.addEventListener("click", () => {
    recognition.start();
    startBtn.disabled = true;
    startBtn.textContent = "Listening...";
    istrue=true;
  });
} else {
  resultElem.textContent =
    "Speech recognition is not supported in this browser.";
  startBtn.disabled = true;
}
let alldata =(result)=>{
    if (result == "bg green" || result == "BG green") {
        document.body.style.backgroundColor = "green";
        let ans = "your background is green. thanks";
        speaker(ans)
      } else if (result == "bg black" || result == "BG black") {
        document.body.style.backgroundColor = "black";
        let ans = "your background is black. thanks";
        speaker(ans)
      } else if (result == "bg yellow" || result == "BG yellow") {
        document.body.style.backgroundColor = "yellow";
        let ans = "your background is yellow. thanks";
        speaker(ans)
      } else if (result == "open youtube" || result == "open YouTube") {
        let a = "http://www.youtube.com";
        let url = `<a href="${a}" target="_blank">youtube</a>`;
        answers.innerHTML = url;
        let ans =
          "this is youtube channal link. Please click the link to visit my youtube channal. thanks";
          speaker(ans)
      } else if (result == "ilaka" || result == "walaka") {
        let ans =
          "Waya kana.";
          speaker(ans)
      }
}
// istrue =true
let speaker = (data) => {
    if(istrue==true){

        let synth =window.speechSynthesis;
        // let voices =synth.getVoices();
        let utterance = new SpeechSynthesisUtterance(data);
        synth.speak(utterance)
    }
    istrue=false;
};

// speaker();
