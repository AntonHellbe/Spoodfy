import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';


class PlaylistForm extends Component {

    renderField = ({ input, label, type, labelFor, meta: { touched, error } }) => (
        <div className="input-field">
            <label htmlFor={ labelFor }>{label}</label>
            <div className="input-field-wrapper">
                <input { ...input } placeholder={ label } type={ type } />
                {touched && <p>{error} </p>}
            </div>
        </div>
    )

    renderSelect = ({ input, label, type, labelFor, meta: { touched, error }, children }) => (
        <div className="input-field">
            <label htmlFor={ labelFor }>{label}</label>
            <div className="input-field-wrapper">
                <select { ...input } type={ type }>
                    {children}
                </select>
                {touched && (error && <p> {error} </p>)}
            </div>
        </div>
    )

    render() {
        const {
            initialValues,
            create,
        } = this.props;
        // console.log(this.props);
        return (
            <form
                className="edit-playlist-form"
                initialvalues={ initialValues }
                onSubmit={ this.props.handleSubmit }
            >
                <Field
                    name="name"
                    type="text"
                    component={ this.renderField }
                    label="Name"
                    labelFor="name"
                />

                <Field
                    name="publicPlaylist"
                    type="select"
                    component={ this.renderSelect }
                    label="public"
                    labelFor="publicPlaylist"
                >
                    <option value="true">True</option>
                    <option value="false">False</option>
                </Field>

                <Field
                    name="collaborative"
                    type="select"
                    component={ this.renderSelect }
                    label="collaborative"
                    labelFor="collaborative"
                >
                    <option value="true">True</option>
                    <option value="false">False</option>
                </Field>

                <div className="input-field">
                    <label htmlFor="description">Description</label>
                    <Field
                        name="description"
                        component="textarea"
                        type="text"
                    />
                </div>
                {!create ?
                    (
                        <button type="submit">
                            Update
                </button>
                    ) :
                    (
                        <button type="submit">
                            Create
                    </button>
                    )
                }
            </form>
        );
    }
}

const validateInput = (formProps) => {
    const errors = {};
    if (formProps.name.length < 3) {
        errors.name = 'Needs to be 3 characters or more';
    }
    if (formProps.publicPlaylist === 'true' && formProps.collaborative === 'true') {
        console.log('Both public and collaborative true');
        errors.publicPlaylist = 'Playlist needs to be private if it\'s collaborative';
    }

    return errors;
};

const Playlist = reduxForm({
    enableReinitialize: true,
    validate: validateInput
})(PlaylistForm);

export default Playlist;