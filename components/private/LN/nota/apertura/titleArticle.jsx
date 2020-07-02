import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComTitle from '../../../common/com-title';

import ComText from '../../../common/com-text';

const titleArticle = ({ label, headlines, prefix }) => {
    const { basic } = headlines || {};
    const volantaText = `${label.volanta ? `${label.volanta.text}\u00A0` : ''}`;
    const prefixText = `${prefix !== '' ? `${prefix}\u00A0` : prefix}`;
    const renderTitle = `${prefixText}${volantaText}${basic}`;

    return <ComTitle tag="h1" size="threexl" content={renderTitle}></ComTitle>;
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
