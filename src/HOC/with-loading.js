import React, { Component } from 'react';

const withLoading = (propName) => (WrappedComponent) => {
    console.log(propName);
    return class WithLoading extends Component {

        render() {
            console.log(this.props[propName]);
            if (this.props[propName]) {
                return (
                    <div className="loader-div">
                        <div className="loader" />
                    </div>
                );
            }

            return <WrappedComponent { ...this.props } />;
        }

    };
};

export default withLoading;

