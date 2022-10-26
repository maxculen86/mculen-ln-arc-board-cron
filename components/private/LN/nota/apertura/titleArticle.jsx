import React from 'react';
import PropTypes from 'prop-types';
import ComTitle from '../../../common/com-title';
import '../../../../../resources/dist/css/ln/components/title.css';

const titleArticle = ({ headlines, prefix, size }) => {
    const { basic = '', mobile = '' } = headlines || {};
    const prefixText = `${prefix !== '' ? `${prefix} ` : prefix}`;

    return (
        <ComTitle
            tag="h1"
            size={size || '--threexl'}
            content={
                mobile ? `${prefixText}${mobile}` : `${prefixText}${basic}`
            }
        />
    );
};

titleArticle.propTypes = {
    prefix: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
    headlines: PropTypes.shape({
        basic: PropTypes.string.isRequired
    }).isRequired
};

titleArticle.defaultProps = {
    prefix: ''
};

export default titleArticle;
