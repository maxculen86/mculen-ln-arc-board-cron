import React from 'react';
import PropTypes from 'fusion:prop-types';

const titleArticle = ({ headlines: { basic } }) => {
    return <h1 className="com-title-nota hlp-marginBottom-40">{basic}</h1>;
};

titleArticle.propTypes = {
    headlines: PropTypes.shape({
        basic: PropTypes.string.isRequired
    }).isRequired
};

export default titleArticle;
