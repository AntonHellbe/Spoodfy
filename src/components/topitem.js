import React from 'react';


const TopItem = (props) => {
    const { album } = props.item;
    return (
        <div className="card">
            <div className="cardColumn">
                <img className="topImg" src={ album.images[0].url } role="presentation"/> 
                <span className="cardSummary">
                    <span className="cardTitle">
                        { props.item.name }
                    </span>
                    <span className="cardSubtitle">
                        { props.item.artists[0].name }
                    </span>
                </span>

            
            </div>
        </div>
    );
};

export default TopItem;