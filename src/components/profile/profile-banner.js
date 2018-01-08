import React from 'react';


const ProfileBanner = (props) => {
    const {
        country,
        display_name = id,
        email,
        id,
        followers: { total },
        external_urls: { spotify },
    } = props.user;
    
    return (
        <div className="profile-banner">
            <img 
            src="https://d1wn0q81ehzw6k.cloudfront.net/additional/thul/media/0eaa14d11e8930f5?w=400&h=400" 
            role="presentation"
            />
            <h1> { id } </h1>
            <h2> { `Email: ${email}` } </h2>
            <div className="user-info">
                <span className="user-attr" >
                    { `Total Followers: ${total}` }
                </span>
                <span className="user-attr" >
                    { `Profile URL: ${spotify}` }
                </span>
                <span className="user-attr">
                    { `Country: ${country}` }
                </span>
            </div>
        </div>
    );
};

export default ProfileBanner;