import React from 'react';
import { Text } from '@ln/common-ui-text';
import setClassName from '../../../../private/common/utils/setClassName';
import get from '../../../../private/common/utils/get';

function Subtitle({ globalContent, calssName }) {
    const subtitle = get(globalContent, 'subheadlines.basic', '');

    const classes = setClassName({
        baseClass: 'text-18 text-20_md',
        calssName
    });

    return (
        subtitle && (
            <Text as="h2" className={classes}>
                {subtitle}
            </Text>
        )
    );
}

export default Subtitle;
