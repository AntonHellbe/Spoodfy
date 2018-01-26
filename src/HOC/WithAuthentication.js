import React from 'react';

const withAuthentication = (WrappedComponent) => {

    return class WithAuthentication extends React.Component {
        
        render() {
            if (!this.props.isAuthenticated) {
                return null;
            }

            return (
                <WrappedComponent { ...this.props } />
            );
            
        }
    };
};

export default withAuthentication;