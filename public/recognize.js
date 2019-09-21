SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
if ('SpeechRecognition' in window) {
    console.log('SpeechRecognitionに対応ブラウザ')
} else {
    alert('申し訳ありません。お使いのブラウザはサービスに対応していません')
}

const recognition = new SpeechRecognition();
const recognizeText = document.getElementById('inputText');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const statusText = document.getElementById('status');
const speechIndeterminate = document.getElementById('speechIndeterminate');
const correctText = document.getElementById('correctText');
const inputText = document.getElementById('inputText');
const resetCorrectionBtn = document.getElementById('resetCorrectionBtn');
const correctionBtn = document.getElementById('correctionBtn');

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
    recognition.lang = 'en-us';
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
    correction()
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

const initCorrection = () => {
    correctText.innerText = 'My name is Hanako Yamada, and I will be staying at your house from January 2nd'
    inputText.innerText = 'My is Hanada Yamada, and I will be stay at your house from January 2nd'
    correctionBtn.onclick = correction;
    resetCorrectionBtn.onclick = () => {
        correctText.innerHTML = correctText.innerText;
    }
}

const correction = () => {
    let correctWords = correctText.innerText.split(' ');
    let inputWords = inputText.innerText.split(' ')
    correctText.innerHTML = '';

    for (let i = 0; i < correctWords.length; i++) {
        let match = false
        for (let j = i - 3; j < i + 3 || j < correctWords.length; j++) {
            if (inputWords[j] == correctWords[i]) {
                match = true;
            }
        }

        if (!match) {
            correctText.innerHTML += '<font color="red">' + correctWords[i] + '</font> ';
        } else {
            correctText.innerHTML += correctWords[i] + ' ';
        }
    }
}


window.addEventListener('load', initCorrection());
window.addEventListener('load', initRecognize());
