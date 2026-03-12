import React from 'react';
import Text from '../../../common/text';

function LabelText({ text, className = '', size = '4xs' }) {
    const classes = `label-text ${className}`;
    return <Text weight="bold" size={size} extraClass={classes} text={text} />;
}

export default LabelText;
