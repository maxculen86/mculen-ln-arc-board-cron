import React from 'react';
import PropTypes from 'fusion:prop-types';

const titleArticle = ({ headlines: { basic }, prefix }) => {
    return (
        <h1 className="com-title-nota">
            {prefix !== '' ? `${prefix}\u00A0` : prefix}
            {basic}
        </h1>
    );
};

titleArticle.propTypes = {
    prefix: PropTypes.string,
    headlines: PropTypes.shape({
        basic: PropTypes.string.isRequired
    }).isRequired
};

titleArticle.defaultProps = {
    prefix: ''
};

export default titleArticle;
