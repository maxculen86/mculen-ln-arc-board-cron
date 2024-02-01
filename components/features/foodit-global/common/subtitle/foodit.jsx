import React from 'react';
import setClassName from '../../../../private/common/utils/setClassName';
import { Text } from '@ln/common-ui-text';
import get from '../../../../private/common/utils/get';

const Subtitle = ({ globalContent, calssName }) => {
    const subtitle = get(globalContent, 'subheadlines.basic', '');

    const classes = setClassName({
        baseClass: 'text-18 text-20_md',
        calssName
    });

    return (
        subtitle && (
            <Text as="p" className={classes}>
                {subtitle}
            </Text>
        )
    );
};

export default Subtitle;
