import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { updateTerm, searchRequested } from '../../actions/search_actions';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        
        this.searchThrottled = _.throttle(() => this.props.searchRequested(this.props.term), 300);
    }
    
    onInputChange = (e) => {
        const term = e.target.value;
        this.props.updateTerm(term);
        if (this.props.term.length > 3) {
            this.searchThrottled();
        }
    }

    render() {
        return (
            <div className="searchOpt">
                <div className="searchBar">
                    <input 
                    className="inputSearch" 
                    type="text" 
                    placeholder="Search...." 
                    onChange={ this.onInputChange } 
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    term: state.search.term
});

const mapDispatchToProps = (dispatch) => ({
    updateTerm: (term) => dispatch(updateTerm(term)),
    searchRequested: (term) => dispatch(searchRequested(term)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

