import React from 'react';
import PropTypes from 'fusion:prop-types';
import ModNavigation from './mod-navigation';
//import '../../../resources/dist/css/ln/modules/mod-category.css';

const ModCategory = props => {
    const { revista, category, style, navigation } = props;

    return (
        <div className="mod-categories">
            {revista ? (
                <i className={`com-logo logo-${revista} --large`} />
            ) : (
                <h1 className="com-title --xl" style={style}>
                    {category}
                </h1>
            )}

            <ModNavigation
                navigation={navigation}
                classCondition="--category"
                style={style}
            />
        </div>
    );
};

ModCategory.propTypes = {
    revista: PropTypes.string,
    category: PropTypes.string,
    style: PropTypes.obj,
    navigation: PropTypes.string.isRequired
};

ModCategory.defaultProps = {
    revista: '',
    category: '',
    style: {}
};

export default ModCategory;
