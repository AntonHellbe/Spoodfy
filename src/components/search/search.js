import React, { Component } from 'react';
import { connect } from 'react-redux';
import AlbumItem from '../albumitem';
import ArtistItem from '../artistitem';
import Searchbar from './searchbar';
import TrackTable from '../tracktable';
import { 
    selectTrack, 
    AddToQueue,
    requestPlayAlbum
} from '../../actions/music_actions';


class Search extends Component {
    
    render() {
        const { currentTrack, searchResult: { tracks, albums, artists } } = this.props;
        const isPlaylist = false;
        return (
            <div className="searchDiv">

                <Searchbar />
                <h3>Tracks</h3>

                <TrackTable 
                tracks={ tracks } 
                AddToQueue={ this.props.AddToQueue } 
                selectTrack={ this.props.selectTrack }
                isPlaylist={ isPlaylist }
                currentTrack={ currentTrack }
                />

                { albums.length > 0 &&
                    <h3>Albums</h3>
                }
                    
                <div className="albums">
                    { albums.map((album) => (
                            <AlbumItem
                            album={ album } 
                            requestPlayAlbum={ this.props.requestPlayAlbum }
                            currentAlbum={ this.props.currentAlbum }
                            />
                        )) }
                </div>
                
                { artists.length > 0 &&
                    <h3>Artists</h3>
                }
                <div className="artists">
                    { artists.map((artist) => (
                        <ArtistItem 
                        artist={ artist } 
                        />
                    )) }
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    searchResult: state.search.searchResult,
    currentTrack: state.music.currentTrack,
    currentAlbum: state.music.currentAlbum
});

const mapDispatchToProps = (dispatch) => ({
    selectTrack: (index, track, queue) => dispatch(selectTrack(index, track, queue)),
    AddToQueue: (track) => dispatch(AddToQueue(track)),
    requestPlayAlbum: (id, album) => dispatch(requestPlayAlbum(id, album))
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);