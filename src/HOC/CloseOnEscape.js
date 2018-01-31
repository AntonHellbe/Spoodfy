import React, { Component } from 'react';


const closeOnEscape = (WrappedComponent) => {

        return class CloseOnEscape extends Component {
        
        componentDidMount() {
            document.addEventListener('keydown', this.onEscape);
        }
        
        componentWillUnmount() {
            document.removeEventListener('keydown', this.onEscape);
        }
        
        onEscape = ({ keyCode }) => {
            if (keyCode === 27) {
                this.props.hideModal();
            }
        }

        render() {
            return (
                <WrappedComponent { ...this.props } />
            );
        }
    };
};

export default closeOnEscape;