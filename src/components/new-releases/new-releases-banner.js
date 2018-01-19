import React from 'react';
import { Link } from 'react-router-dom';

const NewReleasesBanner = (props) => {

        const {
            playlists,
            onClickPlay,
            onClickPlaylist,
            handleClick
        } = props;
        return (
            <div className="new-releases-banner">
                <div className="new-releases-title">
                    <h3>Featured Playlists</h3>
                    <button 
                    className="btn-search" 
                    onClick={ handleClick } 
                    >
                        Search &#62;&#62;
                    </button>
                </div>
                <div className="featured-playlists">
                { playlists.map((playlist) => {
                    const {
                        images,
                        id,
                        name
                    } = playlist;
                    return (
                        <div className="playlist-item">
                            <div className="playlist-image-wrapper">
                                <Link
                                to={ `/playlists/${id}` }
                                onClick={ () => onClickPlaylist(playlist) }
                                >
                                    <img
                                        src={ images[0].url }
                                        role="presentation"
                                    />
                                </Link>
                                <i
                                    className="fa fa-play"
                                    aria-hidden="true"
                                    onClick={ (e) => {
                                        e.stopPropagation();
                                        onClickPlay(playlist)
                                    } }
                                />
                            </div>
                            <ul>
                                <li>{name}</li>
                            </ul>
                        </div>
                    );
                })

                }
                </div>
            </div>
        );
};

export default NewReleasesBanner;