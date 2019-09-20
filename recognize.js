SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
const recognition = new SpeechRecognition();
const recognizeText = document.getElementById('recognizeText');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const statusText = document.getElementById('status');
const speechIndeterminate = document.getElementById('speechIndeterminate');

const initRecognize = () => {
    startSppechRecognizeSetup();
    speechIndeterminate.style.visibility = "hidden";
    startBtn.onclick = () => {
        speechIndeterminate.style.visibility = "visible";
        statusText.innerHTML = "認識中";
        recognition.start();
    }
    stopBtn.onclick = () => {
        speechIndeterminate.style.visibility = "hidden";
        recognition.stop();
    }
}

const startSppechRecognizeSetup = () => {
    recognition.onresult = recognizeListener;
    recognition.lang = 'ja-JP';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onsoundstart = recognizeStart;
    recognition.onnomatch = recognizeNoMatch;
    recognition.onerror = recognizeError;
    recognition.onsoundend = recognizeSoundend;

    // recognition.start();
}

const recognizeListener = (event) => {
    let finalTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
        let transcript = event.results[i][0].transcript;
        finalTranscript += transcript;
    }
    console.log(finalTranscript);
    recognizeText.innerHTML = finalTranscript;
}

const recognizeStart = () => {
    statusText.innerHTML = "認識中";
    speechIndeterminate.style.visibility = "visible";
}
const recognizeNoMatch = () => {
    statusText.innerHTML = "もう一度試してください";
    speechIndeterminate.style.visibility = "hidden";
}
const recognizeError = () => {
    statusText.innerHTML = "エラー";
    speechIndeterminate.style.visibility = "hidden";
}
const recognizeSoundend = () => {
    statusText.innerHTML = "停止中";
    speechIndeterminate.style.visibility = "hidden";
}

window.addEventListener('load', initRecognize());
