import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './reducer_auth';
import PlaylistReducer from './reducer_playlists';
import SearchReducer from './reducer_search';
import MusicReducer from './reducer_music';
import BrowseReducer from './reducer_browse';
import ArtistReducer from './reducer_artists';
import TrackReducer from './reducer_track';
import AlbumReducer from './reducer_albums';
import ModalReducer from './reducer_modal';
import MusicControlReducer from './reducer_musiccontrol';

const rootReducer = combineReducers({
    user: AuthReducer,
    playlists: PlaylistReducer,
    search: SearchReducer,
    music: MusicReducer,
    browse: BrowseReducer,
    artists: ArtistReducer,
    tracks: TrackReducer,
    albums: AlbumReducer,
    form: formReducer,
    modals: ModalReducer,
    controls: MusicControlReducer
});

export default rootReducer;