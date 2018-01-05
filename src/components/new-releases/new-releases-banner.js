import React from 'react';

const NewReleasesBanner = (props) => {
    
    return (
        <div className="banner">
            <h3>Welcome</h3>
            <button className="btnSearch" onClick={ props.handleClick } >Search &#62;&#62;</button>
            <p>
                This is the landing page, here you can browse new released albums and singles
            </p>
        </div>
    );
};

export default NewReleasesBanner;