import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import {
    togglePlaying,
    loadNextTrack,
    previousTrack,
    toggleShuffle,
    toggleRepeat,
    updateVolume
} from '../../actions/music_actions';
import MusicPlayer from './musicplayer';
import Playing from './playing';

let WIDTH = 0;
let HEIGHT = 0;

class MusicBar extends Component {

    constructor(props) {
        super(props);
        this.currentTimeInterval = null;
    }

    state = {
        value: 0
    }


    componentDidMount() {
        this.audioElement.addEventListener('ended', this.OnEndedListener);
        this.audioElement.addEventListener('play', this.OnPlay);
        this.audioElement.addEventListener('loadedmetadata', this.metaDataloaded);
        this.audioElement.addEventListener('loadeddata', this.onLoadedData);
        this.audioElement.addEventListener('pause', this.OnPause);
        this.initializeVisualization();
        this.audioElement.volume = this.props.volume; //Why?
        // document.addEventListener('keydown', this.handleKeyPress);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.currentTrack.preview_url !== null && 
            this.props.currentTrack.id !== nextProps.currentTrack.id) {
            this.setState(() => ({ value: 0 }));
            clearInterval(this.currentTimeInterval); 
            //Clear interval if it isn't the same track we are receiving, 
            //i.e slider needs to back to zero and then preview url on the incoming track is not null
        }
         if (nextProps.currentTrack.preview_url === null) {
            if (nextProps.playingIndex < nextProps.queue.length - 1) {
                this.props.loadNextTrack();
            }
         }

        if (!nextProps.isPlaying && this.props.isPlaying) {
             clearInterval(this.currentTimeInterval);
             this.audioElement.pause();
         }

        if (nextProps.isPlaying && !this.props.isPlaying) {
            this.audioElement.play();
        }


    }

    componentWillUnmount() {
        this.audioElement.removeEventListener('loadmetadata', this.metaDataloaded);
        this.audioElement.removeEventListener('play', this.OnPlay);
        this.audioElement.removeEventListener('ended', this.props.OnEndedListener);
        this.audioElement.removeEventListener('loadeddata', this.onLoadedData);
        this.audioElement.removeEventListener('pause', this.OnPause);
        // document.removeEventListener('keydown', this.handleKeyPress);
    }

    onMouseDown = () => {
        this.audioElement.pause();
    }

    onChange = (e) => {
        const value = e.target.value;
        this.setState(() => ({ value }));
        this.audioElement.currentTime = value;
        clearInterval(this.currentTimeInterval);
    }

    onMouseUp = () => {
        this.audioElement.play();
    }

    onVolumeClick = () => {
        this.audioElement.volume = 0;
        this.props.updateVolume(0);
    }
    
    onLoadedData = () => {
        if (!this.props.isPlaying) {
            this.props.togglePlaying();
        }
        if (!this.state.isSeeking) {
            this.playAudio();
        }

    }
    
    onChangeVolume = (e) => {
        const volume = e.target.value;
        this.audioElement.volume = (volume);
        this.props.updateVolume(volume);
    }

    initializeVisualization() {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = context.createAnalyser();
        analyser.fftSize = 128;
        this.ctx = this.canvas.getContext('2d');
        this.audioSrc = context.createMediaElementSource(this.audioElement);
        this.audioSrc.connect(analyser);
        this.audioSrc.connect(context.destination);
        analyser.connect(context.destination);
        

        const renderAnim = () => {

            WIDTH = this.canvas.width;
            HEIGHT = this.canvas.height;

            const freqData = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(freqData);

            this.ctx.fillStyle = '#282828';
            this.ctx.fillRect(0, 0, WIDTH, HEIGHT);

            const barWidth = 3;
            let barHeight;
            let x = 0;

            for (let i = 0; i < analyser.frequencyBinCount; i++) {
                barHeight = freqData[i];

                this.ctx.fillStyle = '#ff6b42';
                this.ctx.fillRect(x, HEIGHT, barWidth, -(barHeight / 2));

                x += barWidth + 2;
            }

            
            requestAnimationFrame(renderAnim);
        };
        
        renderAnim();
        
    }
    
    OnPause = () => {
        clearInterval(this.currentTimeInterval);
    }


    OnEndedListener = () => {
        const { queue, repeat, playingIndex } = this.props;
        if (repeat) {
            this.audioElement.load();
            this.audioElement.play();
        } else if (playingIndex < queue.length - 1) {
            this.setState(() => ({ value: 0 }));
            this.props.loadNextTrack(queue[playingIndex + 1].album);
            
            
        } else {
            console.log('We are here');
            clearInterval(this.currentTimeInterval); 
            this.setState(() => ({ value: 0 }));
            this.props.togglePlaying();
        }

    }


    OnPlay = () => {
        this.audioElement.currentTime = this.state.value;
        this.currentTimeInterval = setInterval(() => {
            this.setState(() => ({ value: this.audioElement.currentTime }));
        }, 500);
        this.audioElement.play();

    }

    handleMusicControls = (e) => {
        e.stopPropagation();
        console.log(e.target.id);
        const {  
            currentTrack,
            playingIndex,
            queue,
            currentAlbum
         } = this.props;
        const id = e.target.id;
        switch (id) {
            case 'pause':
                this.pauseAudio();
                this.props.togglePlaying();
                break;

            case 'play':
                // if (!_.isEmpty(currentTrack)) {
                    this.playAudio();
                    this.props.togglePlaying();
                // }
                break;

            case 'shuffle':
                this.props.toggleShuffle();
                break;
            case 'repeat':
                this.props.toggleRepeat();
                break;
            case 'next':
                    this.props.loadNextTrack();
                break;
            case 'prev':
                if (playingIndex > 0) {
                    this.props.previousTrack();
                }
                break;

            default:
                console.log('ERROR - DEFAULT CASE MUSICPLAYER');
        }
    }

    playAudio = () => {
        this.audioElement.play();
    }

    playAndLoad = () => {
        this.audioElement.load();
        this.audioElement.play();
    }

    pauseAudio = () => {
        this.audioElement.pause();
    }

    render() {
        const { 
            repeat,
            currentTrack,
            isPlaying,
            shuffle,
            volume
            
         } = this.props;
        const preview_url = _.isEmpty(currentTrack) ? null : currentTrack.track ? currentTrack.track.preview_url : currentTrack.preview_url; //eslint-disable-line
        return (
            <React.Fragment>
                <div className="musicDisplay" key="musicDisplay">
                    <MusicPlayer 
                    handleMusicControls={ this.handleMusicControls }
                    repeat={ repeat }
                    currentTrack={ currentTrack }
                    isPlaying={ isPlaying }
                    shuffle={ shuffle }
                    key="musicPlayer"
                    />

                <div className="progress" key="progress">
                    
                    <input 
                    className="inputProgress"
                    ref={ (slider) => { this.slider = slider; } }
                    value={ this.state.value }
                    type="range"
                    name="points" 
                    min="0"
                    max={ 30 }
                    onMouseDown={ this.onMouseDown }
                    onMouseUp={ this.onMouseUp }
                    onChange={ this.onChange }
                    key="inputProgress"
                    />
                    <ul>
                        <li className="currentVal">{ (this.state.value / 100).toFixed(2) }</li>
                        <li>{ (30 / 100).toFixed(2) }</li>
                    </ul>    
                    </div>


                <div className="volumeControl" key="volume">
                        <i 
                        className="fa fa-volume-up" 
                        aria-hidden="true"
                        onClick={ this.onVolumeClick }  
                        />
                    <input
                        className="volumeInput"
                        type="range"
                        name="points"
                        value={ volume }
                        max="1"
                        min="0"
                        step="any"
                        onChange={ this.onChangeVolume }

                    />

                </div>
                </div>
                <audio 
                ref={ (audio) => { this.audioElement = audio; } }
                src={ preview_url }
                key="audio"
                id="audioPlayer"
                crossOrigin="anonymous"
                volume={ volume } //This doesn't work it seems like
                />
                <div className="discodiv">
                    <canvas 
                    className="disco" 
                    ref={ (canvas) => { this.canvas = canvas; } } 
                    />
                </div>
                    
                <Playing currentTrack={ currentTrack } key="playing" />

            </React.Fragment>
        );
    }

}

const mapStateToProps = (state) => ({
    repeat: state.music.repeat,
    isPlaying: state.music.isPlaying,
    queue: state.music.queue,
    currentTrack: state.music.currentTrack,
    shuffle: state.music.shuffle,
    volume: state.music.volume,
    isAuthenticated: state.user.isAuthenticated,
    playingIndex: state.music.playingIndex,
    currentAlbum: state.music.currentAlbum
});

const mapDispatchToProps = (dispatch) => {
    return {
        togglePlaying: () => dispatch(togglePlaying()),
        loadNextTrack: () => dispatch(loadNextTrack()),
        toggleShuffle: () => dispatch(toggleShuffle()),
        toggleRepeat: () => dispatch(toggleRepeat()),
        updateVolume: (volume) => dispatch(updateVolume(volume)),
        previousTrack: () => dispatch(previousTrack()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicBar);