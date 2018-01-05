import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    togglePlaying,
    loadNextTrack,
    selectTrack,
    toggleShuffle,
    toggleRepeat
} from '../actions/music_actions';
import MusicPlayer from './musicplayer';
import Playing from './playing';


class MusicBar extends Component {

    constructor(props) {
        super(props);
        this.currentTimeInterval = null;
    }

    state = {
        value: 0.0,
    }


    componentDidMount() {
        this.audioElement.addEventListener('ended', this.OnEndedListener);
        this.audioElement.addEventListener('play', this.OnPlay);
        this.audioElement.addEventListener('loadedmetadata', this.metaDataloaded);
        this.audioElement.addEventListener('loadeddata', this.onLoadedData);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentTrack !== null && 
            this.props.currentTrack.id !== nextProps.currentTrack.id) {
            clearInterval(this.currentTimeInterval); //Clear interval if it isn't the same track we are receiving, i.e slider needs to back to zero
        }
    }

    componentWillUnmount() {
        this.audioElement.removeEventListener('loadmetadata', this.metaDataloaded);
        this.audioElement.removeEventListener('canplay', this.OnCanPlay);
        this.audioElement.removeEventListener('play', this.OnPlay);
        this.audioElement.removeEventListener('ended', this.props.OnEndedListener);
        this.audioElement.removeEventListener('loadeddata', this.onLoadedData);
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
    
    onLoadedData = () => {
        console.log('Loaded Data Called...');
        if (!this.props.isPlaying) {
            this.props.togglePlaying();
        }
        if (!this.state.isSeeking) {
            console.log('TogglingAudio');
            console.log(this.state.isSeeking);
            this.playAudio();
        }

    }

    handleKeyPress = (event) => {
        console.log(event.key);
        if (event.key === 'Space') {
            if (this.props.isPlaying) {
                this.pauseAudio();
            } else {
                this.playAudio();
            }
            this.props.togglePlaying();
        }
    }

    OnEndedListener = () => {
        if (this.props.repeat) {
            this.audioElement.load();
            this.audioElement.play();
        } else if (this.props.queue.length >= 1) {
            this.props.loadNextTrack(this.props.queue[0], this.props.queue.slice(1));
        } else {
            clearInterval(this.currentTimeInterval); 
            this.setState(() => ({ value: 0 })); // If no track in queue, reset slider
            this.props.togglePlaying(); // toggle back to not playing
        }

    }


    OnPlay = () => {
        this.currentTimeInterval = setInterval(() => {
            this.setState(() => ({ value: this.audioElement.currentTime }));
        }, 500);

    }

    handleMusicControls = (e) => {
        const id = e.target.id;
        console.log(e.target);
        console.log(id);
        switch (id) {
            case 'pause':
                this.pauseAudio();
                this.props.togglePlaying();
                break;

            case 'play':
                if (this.props.currentTrack !== null) {
                    this.playAudio();
                    this.props.togglePlaying();
                }
                break;

            case 'shuffle':
                this.props.toggleShuffle();
                break;
            case 'repeat':
                this.props.toggleRepeat();
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
        // console.log(this.props.isAuthenticated);
        // if (!this.props.isAuthenticated) {
        //     return (
        //         <div className="musicDisplay" />
                 
        //     );
        // }
        return (
            <React.Fragment>
                <div className="musicDisplay" key="musicDisplay">
                    <MusicPlayer 
                    handleMusicControls={ this.handleMusicControls }
                    keyPress={ this.handleKeyPress }
                    repeat={ this.props.repeat }
                    currentTrack={ this.props.currentTrack }
                    isPlaying={ this.props.isPlaying }
                    shuffle={ this.props.shuffle }
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
                    max={ this.props.duration }
                    onMouseDown={ this.onMouseDown }
                    onMouseUp={ this.onMouseUp }
                    onChange={ this.onChange }
                    key="inputProgress"
                    />
                    <ul>
                        <li className="currentVal">{ (this.state.value / 100).toFixed(2) }</li>
                        <li>{ (this.props.duration / 100).toFixed(2) }</li>
                    </ul>    
                    </div>
                </div>
                <audio 
                ref={ (audio) => { this.audioElement = audio; } }
                src={ this.props.currentTrack ? this.props.currentTrack.preview_url : null }
                key="audio"
                />
                

                <Playing currentTrack={ this.props.currentTrack } key="playing" />

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
    duration: state.music.duration,
    isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => {
    return {
        togglePlaying: () => dispatch(togglePlaying()),
        loadNextTrack: (track, queue) => dispatch(loadNextTrack(track, queue)),
        selectTrack: () => dispatch(selectTrack(null)),
        toggleShuffle: () => dispatch(toggleShuffle()),
        toggleRepeat: () => dispatch(toggleRepeat())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicBar);