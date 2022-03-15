import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../../private/common/text';

import '../../../../../resources/dist/css/ln/components/label-text.css';

const LabelText = ({ text, className, size }) => {
    const classes = `label-text ${className}`;

    return (
        <Text weight="bold" size={`${size}` || '4xs'} className={classes}>
            {text}
        </Text>
    );
};

LabelText.propTypes = {
    text: PropTypes.string,
    size: PropTypes.string,
    className: PropTypes.string
};

LabelText.defaultProps = {
    text: '',
    size: '',
    className: ''
};

export default LabelText;
