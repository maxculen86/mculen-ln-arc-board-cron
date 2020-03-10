import React from 'react';
import PropTypes from 'fusion:prop-types';

const titleArticle = ({ label, headlines, prefix }) => {
    const { basic } = headlines || {};
    return (
        <h1 className="com-title-nota">
            {prefix !== '' ? `${prefix}\u00A0` : prefix}
            {label.volanta ? `${label.volanta.text}\u00A0` : ''}
            {basic}
        </h1>
    );
};

titleArticle.propTypes = {
    label: PropTypes.shape({
        volanta: PropTypes.shape({
            text: PropTypes.string
        })
    }),
    prefix: PropTypes.string,
    headlines: PropTypes.shape({
        basic: PropTypes.string.isRequired
    }).isRequired
};

// titleArticle.defaultProps = {
//     prefix: ''
// };

export default titleArticle;
