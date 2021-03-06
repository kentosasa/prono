import React from 'react'
import PropTypes from 'prop-types';

// TODO Utilに切り出す
// 大文字小文字を気にしない
// 句読点は無視する
const normalization = (str) => {
    return str.toUpperCase().replace(/,|\./g, '')
}

export default class Sentence extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={"section sentence " + (this.props.isActive ? 'activeSection' : '')} >
                <h5 className='text'>{this.renderSentence()}</h5>
                <h5 className='input translucent'>{this.props.sentence.input}</h5>
            </div>
        )
    }

    randomKey() {
        return Math.random().toString(32).substr(2)
    }

    renderSentence() {
        if (!this.props.sentence.input || this.props.isActive) {
            return this.props.sentence.text
        }
        let correctWords = this.props.sentence.text.split(' ')
        let inputWords = this.props.sentence.input.split(' ')
        let correctText = []

        for (let i = 0; i < correctWords.length; i++) {
            let match = false
            for (let j = i - 3; j < i + 3 || j < correctWords.length; j++) {
                if (!inputWords[j] || !correctWords[i]) {
                    continue
                }
                if (normalization(inputWords[j]) == normalization(correctWords[i])) {
                    match = true
                }
            }

            if (!match) {
                correctText.push(<font key={this.randomKey()} color="red">{correctWords[i]} </font>)
            } else {
                correctText.push(<span key={this.randomKey()}>{correctWords[i]} </span>)
            }
        }
        return (<div>{correctText}</div>)
    }
}

Sentence.propTypes = {
    isActive: PropTypes.bool,
    sentence: {
        text: PropTypes.string.isRequired,
        input: PropTypes.string
    }
}