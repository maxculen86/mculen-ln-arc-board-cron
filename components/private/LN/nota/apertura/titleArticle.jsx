import React from 'react';
import PropTypes from 'fusion:prop-types';

import ComText from '../../../common/com-text';

const titleArticle = ({ label, headlines, prefix }) => {
    const { basic } = headlines || {};
    return (
        <ComText tag="h1" size="xl" classCondition="com-title-nota">
            {!prefix && prefix !== '' ? `${prefix}\u00A0` : prefix}
            {label.volanta ? `${label.volanta.text}\u00A0` : ''}
            {basic}
        </ComText>
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
