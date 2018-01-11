import { combineReducers } from 'redux';
import AuthReducer from './reducer_auth';
import PlaylistReducer from './reducer_playlists';
import SearchReducer from './reducer_search';
import MusicReducer from './reducer_music';
import BrowseReducer from './reducer_browse';
import ArtistReducer from './reducer_artist';
import TrackReducer from './reducer_track';

const rootReducer = combineReducers({
    user: AuthReducer,
    playlists: PlaylistReducer,
    search: SearchReducer,
    music: MusicReducer,
    browse: BrowseReducer,
    artists: ArtistReducer,
    tracks: TrackReducer
});

export default rootReducer;