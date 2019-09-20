SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
if ('SpeechRecognition' in window) {
    console.log('SpeechRecognitionに対応ブラウザ')
} else {
    alert('申し訳ありません。お使いのブラウザはサービスに対応していません')
}

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
}

const recognizeListener = (event) => {
    let finalTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
        let transcript = event.results[i][0].transcript;
        finalTranscript += transcript;
    }
    console.log("音声認識成功: " + finalTranscript);
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
const recognizeError = (event) => {
    console.log('SpeechRecognition Error: ' + event.error);
    statusText.innerHTML = "エラー";
    speechIndeterminate.style.visibility = "hidden";
}
const recognizeSoundend = () => {
    statusText.innerHTML = "停止中";
    speechIndeterminate.style.visibility = "hidden";
}

window.addEventListener('load', initRecognize());
