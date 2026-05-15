import React from 'react';
import { cx } from '@ln/ds-cva';
import get from '../../../../private/common/utils/get';
import { parseHeading } from '../../../../private/common/utils/parseHelper';
import { getHeadingConfig } from './_helpers';

function Heading({ data, classname, ...props }) {
    const level = get(data, 'level');
    const content = get(data, 'content');

    if (typeof content !== 'string' || !content) return null;

    const config = getHeadingConfig(level);

    const parsedContent = <span>{parseHeading(content)}</span>;

    const Tag = config.tag || 'h4';

    if (!content) return null;

    return (
        <Tag className={cx(config.className, classname)} {...props}>
            {parsedContent}
        </Tag>
    );
}

Heading.isStatic = true;

export default Heading;
