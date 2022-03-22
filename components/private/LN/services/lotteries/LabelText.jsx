import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../../common/text';

const LabelText = ({ text, className, size }) => {
    const classes = `label-text ${className}`;

    return (
        <Text
            weight="bold"
            size={`${size}` || '4xs'}
            extraClass={classes}
            text={text}
        />
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
