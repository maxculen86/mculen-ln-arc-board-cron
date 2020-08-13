import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComTitle from '../../../common/com-title';
import '../../../../../resources/dist/css/ln/components/title.css';

const titleArticle = ({ label, headlines, prefix }) => {
    const { basic } = headlines || {};
    const volantaText = `${
        label.volanta && label.volanta.text !== ''
            ? `${label.volanta.text} `
            : ''
    }`;
    const prefixText = `${prefix !== '' ? `${prefix} ` : prefix}`;

    return (
        <ComTitle
            tag="h1"
            size="--threexl"
            content={`${prefixText}${volantaText}${basic}`}
        />
    );
};

titleArticle.propTypes = {
    label: PropTypes.shape({
        volanta: PropTypes.shape({
            text: PropTypes.string
        })
    }).tag({ defaultValue: { volanta: '' } }).isRequired,
    prefix: PropTypes.string.tag({ defaultValue: '' }).isRequired,
    headlines: PropTypes.shape({
        basic: PropTypes.string.isRequired
    }).isRequired
};

// titleArticle.defaultProps = {
//     prefix: ''
// };

export default titleArticle;
