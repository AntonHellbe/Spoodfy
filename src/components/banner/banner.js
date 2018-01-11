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
            followButton = false,
            playButton = false, 
            playAction = null,
            shareButton = false
        } = this.props;


        if (followButton) {
            if (isFollowing) {
                buttons[0] = (
                    <button className="btn-follow" id="unfollow" onClick={ this.onClickFollow  } >
                        Unfollow
                    </button>
                );
            }
            buttons[0] = (
                <button className="btn-follow" id="follow" onClick={ this.onClickFollow } >
                    Follow
            </button>
            );

        }

        if (playButton) {
            buttons[1] = (
                <button className="btn-play" onClick={ playAction } >
                    Play
                </button>
            );
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

    renderFollowButton = () => {
        const { 
            isFollowing = false, 
            followButton = false,
        } = this.props;
        

        if (followButton) {
            if (isFollowing) {
                return (
                    <button className="btn-follow" id="unfollow" onClick={ this.onClickFollow } >
                        Unfollow
                    </button>
                );
            }
            return (
            <button className="btn-follow" id="follow" onClick={ this.onClickFollow } >
                Follow
            </button>
            );

            }
        return null;

        }
        

    renderPlayButton = () => {
        const { playButton = false, playAction } = this.props;
        if (playButton) {
            return (
                <button className="btn-play" onClick={ playAction } >
                    Play
                </button>
            );
        }
        return null;
    }

    renderShareButton = () => {
        const { shareButton = false } = this.props;
        if (shareButton) {
            return (
                <button className="btn-share">
                    ...
                </button>
            );
        }

        return null;
        
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
            item1 = null,
            item2 = null,
            item3 = null,
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
                            <li>{ item1 }</li>
                            <li>{ item2 }</li>
                            <li>{ item3 }</li>
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
                    { renderAllButtons &&
                    this.renderAllButtons()
                    }
                    { this.renderPlayButton() }
                    { this.renderFollowButton() }
                    { this.renderShareButton() }
                </div>
            </div>

        );
    }
}

export default Banner;