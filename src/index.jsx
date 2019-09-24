import React from 'react'
import Sentence from './sentence.jsx'
import { render } from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.activeRef = React.createRef()
        window.webkitSpeechRecognition || window.SpeechRecognition;
        this.recognition = new webkitSpeechRecognition()
        this.recognition.continuous = true
        this.recognition.interimResults = true
        this.recognition.lang = 'en-us'
        this.recognition.onresult = this.recognizeListener
        this.recognition.onerror = this.recognizeOnError
        this.state = {
            isRecognizing: false,
            activeSentenceIndex: 0,
            sentences: [
                { text: 'His job requires that he take an international English test.' },
                { text: 'No man is an island, after all.' },
                { text: 'Well, she was naturally nervous, but I insisted that it was the right thing to do.' },
                { text: 'I know that there is a flashlight in the kitchen drawer.' },
                { text: 'You said you had no hobbies, but now look.' },
                { test: 'You’ll never find a rainbow if you’re looking down.' }
            ],
        }
    }

    recognizeListener = (event) => {
        this.scrollToRef(this.activeRef)
        let sentences = this.state.sentences
        sentences[this.state.activeSentenceIndex].input = event.results[event.resultIndex][0].transcript
        this.setState({
            sentences,
            isRecognizing: true
        })
        if (event.results[event.resultIndex].isFinal) {
            this.moveNextSentence()
        }
        console.log("音声認識成功: " + event.results[event.resultIndex][0].transcript);
    }

    recognizeOnSoundEnd = (event) => {
        console.log('音声終了')
    }

    recognizeOnSoundEnd = (event) => {
        console.log('音声終了')
    }

    recognizeOnError = (event) => {
        this.setState({ isRecognizing: !this.state.isRecognizing })
        alert('音声認識で問題が発生しました: ' + event.error)
    }

    scrollToRef(ref) {
        if (ref.current) {
            window.scrollTo(0, ref.current.offsetTop - 100)
        }
    }

    moveNextSentence() {
        let activeSentenceIndex = this.state.activeSentenceIndex < this.state.sentences.length - 1 ? this.state.activeSentenceIndex + 1 : 0
        this.setState({
            activeSentenceIndex,
        })
    }

    onClickStartRecord = () => {
        this.scrollToRef(this.activeRef)
        this.recognition.start()
        this.setState({
            isRecognizing: true
        })
    }

    onClickStopRecord = () => {
        this.recognition.stop()
        this.setState({
            isRecognizing: false
        })
    }

    render() {
        return (
            <div className="container">
                <h1 className="center">Prono<br /><span className="subtitle">〜発音確認アプリ〜</span></h1>
                {this.renderProgress()}
                <div className="section">
                    <h5>Pronoとは</h5>
                    <p>
                        このサービスは英文を実際に読み上げて自分の発音を機械が正しく認識できるか確認するサービスです<br />
                        機械が認識できるような発音であるならば、正しい英語と言えるのではないかという考えの元作られています
                    </p>
                    <div className="space"></div>
                    <h5>Pronoの使い方</h5>
                    <p>
                        STARTボタンを押すと音声認識が開始します<br />
                        開始ボタンを押した後に左側が赤くなっている英文を読み上げてください<br />
                        一時縦断したいときはSTOPボタンを押してください
                    </p>
                </div>
                <div className='space-96'></div>
                <div className="divider"></div>
                {this.state.sentences.map((value, index) => this.renderSentence(value, index))}
                {this.renderActionBtn()}
            </div>
        )
    }

    renderSentence(value, index) {
        return (
            <div key={'sentence-' + index} ref={this.state.activeSentenceIndex == index ? this.activeRef : ''}>
                <Sentence isActive={this.state.activeSentenceIndex == index && this.state.isRecognizing} sentence={value} ></Sentence>
                <div className='divider'></div>
            </div>
        )
    }

    renderProgress() {
        if (this.state.isRecognizing) {
            return (
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>)
        }
        return (<div className="divider"></div>)
    }

    renderActionBtn() {
        if (this.state.isRecognizing) {
            return (<div id='fixBtn' onClick={this.onClickStopRecord} className=' btn-floating btn-large waves-effect waves-light red'><i className="material-icons">pause</i></div>)
        } else {
            return (<div id='fixBtn' onClick={this.onClickStartRecord} className=' btn-floating btn-large waves-effect waves-light red'><i className="material-icons">play_arrow</i></div>)
        }
    }
}

render(<App />, document.getElementById('app'))