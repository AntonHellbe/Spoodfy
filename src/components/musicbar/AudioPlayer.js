import React, { Component } from 'react';


class AudioPlayer extends Component {

    componentDidMount() {
        this.audioElement.volume = this.props.volume;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.preview_url !== this.props.preview_url
        && !this.props.isPlaying) {
            this.playAudio();
        }

        if (!nextProps.isPlaying && this.props.isPlaying) {
            this.audioElement.pause();
        }

        if (nextProps.isPlaying && !this.props.isPlaying) {
            this.audioElement.play();
        }

    }

    onTimeUpdate = () => {
        const time = this.audioElement.currentTime;
        this.props.timeUpdate(time);
    }
    

    playAudio = () => {
        this.props.togglePlaying();
        this.audioElement.play();
    }


    render() {
        const {
            preview_url,
            repeat,
            autoPlay
        } = this.props;
        return (
            <audio
                ref={ (audio) => { this.audioElement = audio; } }
                id="audioPlayer"
                src={ preview_url }
                key="audio"
                id="audioPlayer"
                crossOrigin="anonymous"
                volume={ 0.05 } //This doesn't work it seems like
                onTimeUpdate={ this.onTimeUpdate }
                onEnded={ this.props.onEnded }
                autoPlay={ autoPlay } //eslint-disable-line
                loop={ repeat }
            />
        );
    }
}

export default AudioPlayer;