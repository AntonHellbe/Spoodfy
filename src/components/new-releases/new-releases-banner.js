import React from 'react';

const NewReleasesBanner = (props) => {
    
    return (
        <div className="banner">
            <h3>Welcome</h3>
            <button className="btnSearch" onClick={ props.handleClick } >Search &#62;&#62;</button>
        </div>
    );
};

export default NewReleasesBanner;