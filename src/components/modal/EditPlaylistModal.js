import React from 'react';
import { Field, reduxForm } from 'redux-form';


const EditPlaylistModal = (props) => {
    const {
        initialValues
    } = props;
    return (
        <div className="modal-background">
            <div className="select-playlist">
            <form className="edit-playlist-form" initialvalues={ initialValues } >
                <div className="input-field">
                    <label htmlFor="name">Name</label>
                    <Field name="name" component="input" type="text" />
                </div>
                <div className="input-field">
                    <label htmlFor="public">Public</label>
                    <Field name="public" component="select">
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
            </form>
            </div>

        </div>
    );
};

const EditPlaylist = reduxForm({
    form: 'playlist',
})(EditPlaylistModal);

export default EditPlaylist;