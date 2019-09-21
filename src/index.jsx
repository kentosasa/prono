import React from 'react'
import Sentence from './sentence.jsx'
import { render } from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.activeRef = React.createRef()
        this.state = {
            isRecognizing: false,
            activeSentenceIndex: -1,
            sentences: [
                { text: 'His job requires that he take an international English test.' },
                { text: 'No man is an island, after all.' },
                {
                    text: 'Well, she was naturally nervous, but I insisted that it was the right thing to do.',
                    input: 'well he Was natural nervous but i insisted that it was the right things to do',
                },
                { text: 'I know that there is a flashlight in the kitchen drawer.' },
                { text: 'You said you had no hobbies, but now look.' },
            ],
        }
    }

    scrollToRef(ref) {
        if (ref.current) {
            window.scrollTo(0, ref.current.offsetTop - 100)
        }
    }

    onClickDebug = () => {
        let sentences = this.state.sentences
        let activeSentenceIndex = this.state.activeSentenceIndex < sentences.length - 1 ? this.state.activeSentenceIndex + 1 : this.state.activeSentenceIndex
        let isRecognizing = !this.state.isRecognizing
        sentences[activeSentenceIndex].input = 'well he Was natural nervous but i insisted that it was the right things to do'
        this.setState({
            sentences,
            activeSentenceIndex,
            isRecognizing
        })
    }

    componentDidUpdate() {
        this.scrollToRef(this.activeRef)
    }

    render() {
        return (
            <div className="container">
                <div className='btn' onClick={this.onClickDebug}>DEBUG</div>
                <h1 className="center">Prono<br /><span className="subtitle">〜発音確認アプリ〜</span></h1>
                {this.renderProgress()}
                <div className="divider"></div>
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
                <div className="divider"></div>
                <h3>英文</h3>
                {this.state.sentences.map((value, index) => this.renderSentence(value, index))}
                {this.renderActionBtn()}
            </div>
        )
    }

    renderSentence(value, index) {
        return (
            <div key={'sentence-' + index} ref={this.state.activeSentenceIndex == index ? this.activeRef : ''}>
                <Sentence isActive={this.state.activeSentenceIndex == index} sentence={value} ></Sentence>
                <div className='divider'></div>
            </div>
        )
    }

    renderProgress() {
        if (this.state.isRecognizing) {
            return (
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            )
        }
        return
    }

    renderActionBtn() {
        if (this.state.isRecognizing) {
            return (<div id='fixBtn' onClick={this.onClickDebug} className=' btn-floating btn-large waves-effect waves-light red'><i className="material-icons">pause</i></div>)
        } else {
            return (<div id='fixBtn' onClick={this.onClickDebug} className=' btn-floating btn-large waves-effect waves-light red'><i className="material-icons">play_arrow</i></div>)
        }
    }
}

render(<App />, document.getElementById('app'))