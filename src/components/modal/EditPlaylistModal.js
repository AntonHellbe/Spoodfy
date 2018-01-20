import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';


class EditPlaylistModal extends Component {


    componentWillReceiveProps(nextProps) {

        console.log(nextProps.initialValues);
        if (nextProps.isVisible && !this.props.isVisible) {
            console.log('Adding event listener');
            document.addEventListener('click', this.handlePageClick);
        }

        if (!nextProps.isVisible && this.props.isVisible) {
            console.log('Removing event listener');
            document.removeEventListener('click', this.handlePageClick);
        }
    }


    handlePageClick = (e) => {
        if (this.modal.contains(e.target)) {
            return;
        }
        this.props.toggleModal();
    }

    render() {
        const {
            initialValues,
            isVisible,
        } = this.props;

        return (
            <div 
            className="modal-background" 
            style={ isVisible ? { display: 'block' } : { display: 'none' } }
            >
                <div 
                className="select-playlist"
                ref={ modal => { this.modal = modal; } }
                >
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
                </div>

            </div>
        );
    }
}

const EditPlaylist = reduxForm({
    form: 'playlist',
    enableReinitialize: true
})(EditPlaylistModal);

export default EditPlaylist;