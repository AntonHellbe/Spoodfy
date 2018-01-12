import React, { Component } from 'react';


class Banner extends Component {

    onClickFollow = (e) => {
        const id = e.target.id;
        this.props.followAction(id);
    }

    renderButtons = () => {
        const buttons = [];

        const {
            isFollowing = false,
            playAction = null,
            shareButton = false,
            isPlaying = false,
            pauseAction = null,
            followButton = false
        } = this.props;


        if (followButton) {
            if (isFollowing) {
                buttons[0] = (
                    <button className="btn-follow" id="unfollow" onClick={ this.onClickFollow  } >
                        Unfollow
                    </button>
                );
            } else {
            buttons[0] = (
                <button className="btn-follow" id="follow" onClick={ this.onClickFollow } >
                    Follow
            </button>
            );
            }

        }
        if (playAction) {
            if (isPlaying) {
                buttons[1] = (
                <button className="btn-play" onClick={ pauseAction } >
                        Pause
                </button>    
                );
            } else {
            buttons[1] = (
                <button className="btn-play" onClick={ playAction } >
                    Play
                </button>
            );
            }
        }

        if (shareButton) {
            buttons[2] = (
                <button className="btn-share">
                    ...
                </button>
            );
        }

        return buttons;

    }

    renderAllButtons = () => {
        const { isFollowing, playAction } = this.props;

        const followingButton = isFollowing ?
        (
            <button 
            className="btn-unfollow" 
            id="unfollow" 
            onClick={ this.onClickFollow }
            >
                Unfollow
            </button>
        ) :
        (
            <button className="btn-follow" id="follow" onClick={ this.onClickFollow } >
                Follow
            </button>
        );

        return (
            <React.Fragment>
                { followingButton }

                <button className="btn-play" onClick={ playAction } >
                    Play
                </button>

                <button className="btn-share">
                    ...
                </button>
            </React.Fragment>
        );
    }

    renderImage = () => {
        const { image } = this.props;
        if (image) {
            return (
                <img 
                src={ image }
                role="presentation"
                />
            );
        }

        return (
            <img
                src="https://d1wn0q81ehzw6k.cloudfront.net/additional/thul/media/0eaa14d11e8930f5?w=400&h=400"
                role="presentation"
            />
        );
    }


    render() {

        const {
            subtitle = null,
            title = null,
            items = [],
            topRightInformation = null,
            bottomRightInformation = null,
            renderAllButtons = false
            
        } = this.props;

        return (
            <div className="banner-container">
                <div className="image-wrapper">
                    { this.renderImage() }

                    </div>
                    <div className="banner-title">
                        <h3>
                            { subtitle }
                        </h3>
                        <h1>
                            { title }
                        </h1>
                    </div>

                    <div className="banner-description">
                        <ul>
                            { items.map((item) => (
                                <li>{ item }</li>
                            )) }
                        </ul>

                    </div>  

                <div className="information-top-right">
                    <p>
                        { topRightInformation }
                    </p>

                </div>

                <div className="information-bottom-right">
                    <p>
                        { bottomRightInformation }
                    </p>
                </div>

                <div className="action-buttons">
                    { renderAllButtons ?
                        (
                            this.renderAllButtons() 
                        ) :
                        (
                            this.renderButtons() 
                        )
                    }
                    {  }
                    {/* { this.renderPlayButton() }
                    { this.renderFollowButton() }
                    { this.renderShareButton() } */}
                </div>
            </div>

        );
    }
}

export default Banner;