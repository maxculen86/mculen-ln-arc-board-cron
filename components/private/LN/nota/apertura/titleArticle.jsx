import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComTitle from '../../../common/com-title';

const titleArticle = ({ label, headlines, prefix }) => {
    const { basic } = headlines || {};
    return (
        /* <h1 className="com-title-nota">
            {prefix !== '' ? `${prefix}\u00A0` : prefix}
            {label.volanta ? `${label.volanta.text}\u00A0` : ''}
            {basic}
        </h1> */
        <ComTitle
            tag="h1"
            size="threexl"
            prefix={prefix !== '' ? `${prefix}\u00A0` : prefix}
            label={label.volanta ? `${label.volanta.text}\u00A0` : ''}
            basic={basic}
        ></ComTitle>
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
