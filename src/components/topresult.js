import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopItem from './topitem';


class TopResult extends Component {

    render() {
        return (
            <div className="topdiv">
                {/* { this.props.topResult.map((item) => {
                    return (
                        <TopItem item={ item } />
                    );
                }) } */}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    topResult: state.search.topResult 
});


export default connect(mapStateToProps)(TopResult);