const correctText = document.getElementById('correctText');
const inputText = document.getElementById('inputText');
const resetCorrectionBtn = document.getElementById('resetCorrectionBtn');
const correctionBtn = document.getElementById('correctionBtn');

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