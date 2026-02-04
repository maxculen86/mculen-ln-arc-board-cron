import React from 'react';
import get from '../../../../private/common/utils/get';
import parse from '../../../../private/common/utils/parseHelper';
import { getHeadingConfig } from './_helpers';
import HeadingView from './View';

function Heading({ data }) {
    const level = get(data, 'level');
    const content = get(data, 'content');

    if (typeof content !== 'string' || !content) return null;

    const config = getHeadingConfig(level);
    const parsedContent = <span>{parse(content)}</span>;

    return (
        <HeadingView
            tag={config.tag || 'h4'}
            className={config.classCondition}
            content={parsedContent}
        />
    );
}

Heading.arcType = 'header';
Heading.isStatic = true;

export default Heading;
