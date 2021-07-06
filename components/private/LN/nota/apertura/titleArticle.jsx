import React from 'react';
import PropTypes from 'prop-types';
import ComTitle from '../../../common/com-title';
import '../../../../../resources/dist/css/ln/components/title.css';

const titleArticle = ({ headlines, prefix }) => {
    const { basic } = headlines || {};
    const prefixText = `${prefix !== '' ? `${prefix} ` : prefix}`;

    return (
        <ComTitle tag="h1" size="--threexl" content={`${prefixText}${basic}`} />
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
