import React, { Component } from 'react';
import { connect } from 'react-redux';
import Searchbar from './searchbar';
import TrackTable from '../tracktable/tracktable';
import { 
    requestPlayAlbum
} from '../../actions/music_actions';
import ArtistList from '../artistlist/artistlist';
import AlbumList from '../albumlist/albumlist';


class Search extends Component {
    
    render() {
        const { searchResult: { tracks, albums, artists } } = this.props;
        const isPlaylist = false;
        return (
            <div className="searchDiv">

                <Searchbar />
                <h3>Tracks</h3>

                <TrackTable 
                tracks={ tracks } 
                isPlaylist={ isPlaylist }
                />

                { albums.length > 0 &&
                    <h3>Albums</h3>
                }

                <AlbumList
                albums={ albums }
                />
                
                { artists.length > 0 &&
                    <h3>Artists</h3>
                }
                <ArtistList
                artists={ artists }
                />
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    searchResult: state.search.searchResult,
    currentAlbum: state.music.currentAlbum,
    isSearching: state.search.isSearching
});

const mapDispatchToProps = (dispatch) => ({
    requestPlayAlbum: (id, album) => dispatch(requestPlayAlbum(id, album))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);