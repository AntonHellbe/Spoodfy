import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import {
    togglePlaying,
    loadNextTrack,
    previousTrack,
    toggleShuffle,
    toggleRepeat,
    loadNextQueueTrack
} from '../../actions/music_actions';
import {
    showModal
} from '../../actions/modal_actions';
import MusicControls from './musiccontrols';
import Playing from './playing';
import AudioPlayer from './AudioPlayer';
import WithAuthentication from '../../HOC/WithAuthentication';

let WIDTH = 0;
let HEIGHT = 0;

class MusicBar extends Component {

    state = {
        value: 0,
        isDropdownVisible: false,
        volume: 0.05
    }


    componentDidMount() {
        this.audioElement = document.getElementById('audioPlayer');
        this.initializeVisualization();
        
    }


    onMouseDown = () => {
        this.props.togglePlaying();
    }

    onChange = (e) => {
        const value = e.target.value;
        this.setState(() => ({ value }));
        this.audioElement.currentTime = value;
    }

    onMouseUp = () => {
        this.props.togglePlaying();
    }

    onVolumeClick = () => {
        this.props.updateVolume(0);
    }
    
    onChangeVolume = (e) => {
        const volume = e.target.value;
        this.setState(() => ({ volume }));
        this.audioElement.volume = volume;
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

                this.ctx.fillStyle = '#03A9F4';
                this.ctx.fillRect(x, HEIGHT, barWidth, -(barHeight / 2));

                x += barWidth + 2;
            }

            
            requestAnimationFrame(renderAnim);
        };
        
        renderAnim();
        
    }

    OnEndedListener = () => {
        const { 
            tracklist, 
            playingIndex, 
            shuffle, 
            queue 
        } = this.props;

        if (shuffle && queue.length === 0) {
            this.props.loadNextTrack(Math.floor(Math.random() * (tracklist.length - 1)));
        } else if (queue.length > 0) {
            this.props.loadNextQueueTrack();
        } else if (playingIndex < tracklist.length - 1) {
            this.props.loadNextTrack(playingIndex + 1);            
        } else {
            this.setState(() => ({ value: 0 }));
            this.props.togglePlaying();
        }
    }

    timeUpdate = (value) => {
        this.setState(() => ({ value }));
    }

    handleMusicControls = (e) => {
        e.stopPropagation();

        const {  
            currentTrack,
            playingIndex,
            queue,
            tracklist
        } = this.props;

        const id = e.target.id;
        switch (id) {
            case 'pause':
                this.props.togglePlaying();
                break;

            case 'play':
                if (!_.isEmpty(currentTrack)) {
                    this.props.togglePlaying();
                }
                break;
            case 'shuffle':
                this.props.toggleShuffle();
                break;
            case 'repeat':
                this.props.toggleRepeat();
                break;
            case 'next':
                if (queue.length > 0) {
                    this.props.loadNextQueueTrack();
                } else if (playingIndex < tracklist.length - 1) {
                    this.props.loadNextTrack(playingIndex + 1);
                }
                break;
            case 'prev':
                if (playingIndex > 0) {
                    this.props.previousTrack(playingIndex - 1);
                }
                break;

            default:
                console.log('ERROR - DEFAULT CASE MUSICPLAYER');
        }
    }

    toggleDropdown = () => {
        this.setState((prevState) => ({ isDropdownVisible: !prevState.isDropdownVisible }));
    }

    hide = (e) => {
        if (e && e.relatedTarget) {
            e.relatedTarget.click();
        }

        this.toggleDropdown();
    }

    openModal = () => {
        const {
            currentTrack,
            userPlaylists,
            spotifyId
        } = this.props;
        if (_.isEmpty(currentTrack)) {
            return;
        }
        this.props.showModal({ 
            playlists: userPlaylists, 
            spotifyId,
            track: currentTrack });
    }

    render() {
        const { 
            repeat,
            currentTrack,
            isPlaying,
            shuffle,
            autoPlay
         } = this.props;

        let preview_url = null;
        if (!_.isEmpty(currentTrack)) {
            preview_url = currentTrack.track ?
                currentTrack.track.preview_url : currentTrack.preview_url; //eslint-disable-line
        } 

        
        return (
            <React.Fragment>
                <div className="musicDisplay" key="musicDisplay">
                <MusicControls 
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


                <div className="volume-area" key="volume">
                    <button
                    onClick={ this.toggleDropdown }
                    onBlur={ this.hide }
                    >
                    <i className="fa fa-angle-up" aria-hidden="true" />
                    </button>
                    <ul
                    className="dropdown-playing"
                    style={ this.state.isDropdownVisible ? 
                        { display: 'block' } : { display: 'none' } }
                    >
                        <li>
                            <button
                            onClick={ this.openModal }
                            >
                                Add to playlist
                            </button>
                        </li>
                    

                    </ul>
                    <div className="volume-control">
                    <i 
                    className="fa fa-volume-up"
                    aria-hidden="true"
                    onClick={ this.onVolumeClick }  
                    />
                    <input
                        className="volumeInput"
                        type="range"
                        name="points"
                        max="1"
                        min="0"
                        step="any"
                        value={ this.state.volume }
                        onChange={ this.onChangeVolume }
                    />
                    </div>

                </div>
                </div>
                <div className="discodiv">
                    <canvas 
                    className="disco" 
                    ref={ (canvas) => { this.canvas = canvas; } } 
                    />
                </div>

                <AudioPlayer
                onEnded={ this.OnEndedListener }
                preview_url={ preview_url }
                timeUpdate={ this.timeUpdate }
                isPlaying={ isPlaying }
                togglePlaying={ this.props.togglePlaying }
                repeat={ repeat }
                autoPlay={ autoPlay }
                volume={ this.state.volume }
                />
                    
                <Playing currentTrack={ currentTrack } key="playing" />

            </React.Fragment>
        );
    }

}

const mapStateToProps = (state) => ({
    repeat: state.music.repeat,
    autoPlay: state.music.autoPlay,
    isPlaying: state.music.isPlaying,
    tracklist: state.music.tracklist,
    currentTrack: state.music.currentTrack,
    shuffle: state.music.shuffle,
    isAuthenticated: state.user.isAuthenticated,
    playingIndex: state.music.playingIndex,
    currentAlbum: state.music.currentAlbum,
    queue: state.music.queue,
    userPlaylists: state.playlists.userPlaylists,
    spotifyId: state.user.spotifyId,
});

const mapDispatchToProps = (dispatch) => {
    return {
        togglePlaying: () => dispatch(togglePlaying()),
        loadNextTrack: (index) => dispatch(loadNextTrack(index)),
        toggleShuffle: () => dispatch(toggleShuffle()),
        toggleRepeat: () => dispatch(toggleRepeat()),
        previousTrack: (index) => dispatch(previousTrack(index)),
        loadNextQueueTrack: () => dispatch(loadNextQueueTrack()),
        showModal: (modalProps) => dispatch(showModal('ADD_TRACK_MODAL', modalProps))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithAuthentication(MusicBar));