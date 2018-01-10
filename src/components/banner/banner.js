import React from 'react';


const Banner = () => {

    return (
        <div className="banner-container">
            <div className="image-wrapper">
                <img
                    src="https://d1wn0q81ehzw6k.cloudfront.net/additional/thul/media/0eaa14d11e8930f5?w=400&h=400"
                    role="presentation"
                />

                </div>
                <div className="banner-title">
                    <h1>
                        Spooodfy
                    </h1>
                    <h3>
                        Some subtitle
                    </h3>
                </div>

                <div className="banner-description">
                    <ul>
                        <li>Test1</li>
                        <li>Test2</li>
                        <li>Test3</li>
                    </ul>

                </div>  

            <div className="information-top-right">
                <p>
                    Popularity
                    128,365
                </p>

            </div>

            <div className="information-bottom-right">
                <p>
                    Followers
                    383,612
                </p>
            </div>

            <div className="action-buttons">
                <button className="btn-play">
                    Play
                </button>
                <button className="btn-follow">
                    Follow
                </button>

                </div>
            </div>

    );
};

export default Banner;