import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';


class PlaylistForm extends Component {

    render() {
        const {
            initialValues,
            
        } = this.props;
        return (
            <form
                className="edit-playlist-form"
                initialvalues={ initialValues }
                onSubmit={ this.props.handleSubmit }
            >
                <div className="input-field">
                    <label htmlFor="name">Name</label>
                    <Field name="name" component="input" type="text" />
                </div>
                <div className="input-field">
                    <label htmlFor="publicPlaylist">Public</label>
                    <Field name="publicPlaylist" component="select">
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </Field>
                </div>

                <div className="input-field">
                    <label htmlFor="collaborative">Collaborative</label>
                    <Field name="collaborative" component="select">
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </Field>
                </div>

                <div className="input-field">
                    <label htmlFor="description">Description</label>
                    <Field
                        name="description"
                        component="textarea"
                        type="text"
                    />
                </div>
                <button type="submit">
                    Update
                    </button>
            </form>
        );
    }
}

const Playlist = reduxForm({
    enableReinitialize: true
})(PlaylistForm);

export default Playlist;