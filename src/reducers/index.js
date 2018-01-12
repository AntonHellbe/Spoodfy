import { combineReducers } from 'redux';
import AuthReducer from './reducer_auth';
import PlaylistReducer from './reducer_playlists';
import SearchReducer from './reducer_search';
import MusicReducer from './reducer_music';
import BrowseReducer from './reducer_browse';
import ArtistReducer from './reducer_artists';
import TrackReducer from './reducer_track';
import AlbumReducer from './reducer_albums';

const rootReducer = combineReducers({
    user: AuthReducer,
    playlists: PlaylistReducer,
    search: SearchReducer,
    music: MusicReducer,
    browse: BrowseReducer,
    artists: ArtistReducer,
    tracks: TrackReducer,
    albums: AlbumReducer
});

export default rootReducer;