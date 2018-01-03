import React, { Component } from 'react';
import { connect } from 'react-redux';
import FaClock from 'react-icons/lib/fa/clock-o';
import TrackItem from './trackitem';
import AlbumItem from './albumitem';
import ArtistItem from './artistitem';
import Searchbar from './searchbar';
import { 
    selectTrack, 
    AddToQueue } 
    from '../actions/music_actions';


class Search extends Component {
    
    render() {
        const { tracks, albums, artists } = this.props.searchResult;

        return (
            <div className="searchDiv">
                <Searchbar />
                <h3>Tracks</h3>
                <table className="table">
                    <tbody>
                        <tr className="tableHeader">
                            <th className="table-col-title" > Title </th>
                            <th className="table-col-album"> Album </th>
                            <th className="table-col-time"> <FaClock size={ 24 } /> </th>
                            <th className="table-col-actions"> Actions </th>
                        </tr>
                        { tracks.map((track) => {
                            return (
                                <TrackItem 
                                track={ track } 
                                selectTrack={ this.props.selectTrack } 
                                AddToQueue={ this.props.AddToQueue }
                                />
                            );
                        }) }
                    </tbody>
                </table>
                { albums.length > 0 &&
                    <h3>Albums</h3>
                }
                    
                <div className="albums">
                        { albums.map((album) => (
                                <AlbumItem
                                album={ album } 
                                />
                            )) }
                </div>
                
                { artists.length > 0 &&
                    <h3>Artists</h3>
                }
                <div className="artists">
                    { artists.map((artist) => (
                        <ArtistItem artist={ artist } />
                    )) }
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    searchResult: state.search.searchResult
});

const mapDispatchToProps = (dispatch) => ({
    selectTrack: (track) => dispatch(selectTrack(track)),
    AddToQueue: (track) => dispatch(AddToQueue(track))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);