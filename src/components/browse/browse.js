import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    requestCategories
} from '../../actions/browse_actions';
import Loader from '../loader/loader';

class Browse extends Component {

    constructor(props) {
        super(props);

        if (this.props.categories.length === 0) {
            this.props.requestCategories();
        }
        
    }

    render() {
        const {
            categories,
            loadingBrowse
        } = this.props;

        return (
            <div className="main-content">
            <div className="main-content-wrapper">
                <div className="categories-content">

                    { loadingBrowse ? 
                        (
                            <Loader />
                        )
                        :
                        (
                            categories.map((category) => {
                                return (
                                    <div className="category-image">
                                        <Link 
                                        to={ `/category/${category.id}` }
                                        >
                                            <div className="category-image-wrapper">
                                                <img
                                                src={ `${category.icons[0].url}` }
                                                role="presentation"
                                                />
                                            </div>
                                        </Link>
                                            <h3>
                                                { category.name }
                                            </h3>
                                    </div>
                                );
                            })
                        )
                    }
                    
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    categories: state.browse.categories,
    loadingBrowse: state.browse.loadingBrowse
});

const mapDispatchToProps = (dispatch) => ({
    requestCategories: () => dispatch(requestCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Browse);