import React from 'react';
import get from '../../../../private/common/utils/get';
import parse from '../../../../private/common/utils/parseHelper';
import { getHeadingConfig } from './_helpers';
import { WrapperBody } from '../wrapperBody/default';

function Heading({ data }) {
    const level = get(data, 'level');
    const content = get(data, 'content');

    if (typeof content !== 'string' || !content) return null;

    const config = getHeadingConfig(level);
    const parsedContent = <span>{parse(content)}</span>;

    const Tag = config.tag || 'h4';

    if (!content) return null;

    return (
        <WrapperBody>
            <Tag className={config.className}>{parsedContent}</Tag>
        </WrapperBody>
    );
}

Heading.arcType = 'header';
Heading.isStatic = true;

export default Heading;
