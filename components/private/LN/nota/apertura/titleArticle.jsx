import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComTitle from '../../../common/com-title';

const titleArticle = ({ label, headlines, prefix }) => {
    const { basic } = headlines || {};
    const volantaText = `${label.volanta ? `${label.volanta.text} ` : ''}`;
    const prefixText = `${prefix !== '' ? `${prefix} ` : prefix}`;
    const renderTitle = `${prefixText}${volantaText}${basic}`;

    return <ComTitle tag="h1" size="threexl" content={renderTitle} />;
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
