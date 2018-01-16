import React from 'react';
import ReactDOM from 'react-dom';
import { portalContainer } from '../../app';

class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.el = document.createElement('div');
    }

    componentDidMount() {
        portalContainer.appendChild(this.el);
    }

    componentWillUnmount() {
        portalContainer.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el
        );
    }
 }

export default Modal;
