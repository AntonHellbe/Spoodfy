import React, { Component } from 'react';
import FaPlus from 'react-icons/lib/fa/plus';


class TrackItem extends Component {

    handleClick = () => {
        this.props.selectTrack(this.props.track);
    }

    addToQueHandler = () => {
        this.props.AddToQueue(this.props.track);
    }

    render() {

        const { name, artists, duration_ms } = this.props.track;

        if (this.props.track.preview_url === null) {
            return null;
        }

        return (
        <tr className="track">
            <td 
            onDoubleClick={ this.handleClick }
            >{ name }</td>
            <td> { artists.map((artist) => `${artist.name} `) } </td>
            <td> { (Number(duration_ms) / 1000 / 60).toFixed(2) } </td>
            <td onClick={ this.addToQueHandler }> <FaPlus color={ '#ffffff' } /> </td>
        </tr>
        );
    }
}


export default TrackItem;