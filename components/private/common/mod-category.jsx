import React from 'react';
import PropTypes from 'fusion:prop-types';
import ModNavigation from './mod-navigation';
//import '../../../resources/dist/css/ln/modules/mod-category.css';

const ModCategory = props => {
    const { revista, category, color, navigation } = props;

    return (
        <div className="mod-categories">
            {revista ? (
                <i className={`com-logo logo-${revista} --large`} />
            ) : (
                <h1 className="com-title --xl" style={color}>
                    {category}
                </h1>
            )}

            <ModNavigation
                navigation={navigation}
                classCondition="--category"
            />
        </div>
    );
};

ModCategory.propTypes = {
    revista: PropTypes.string,
    category: PropTypes.string,
    color: PropTypes.obj,
    navigation: PropTypes.string.isRequired
};

ModCategory.defaultProps = {
    revista: '',
    category: '',
    color: {}
};

export default ModCategory;
