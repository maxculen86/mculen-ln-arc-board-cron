import React from 'react';
import get from '../../../../private/common/utils/get';
import { parseHeading } from '../../../../private/common/utils/parseHelper';
import { getHeadingTag } from './_helpers';
import { headingVariants } from './styles';

function Heading({ data, classname, ...props }) {
    const level = get(data, 'level');
    const content = get(data, 'content');
    const alignment = get(data, 'alignment', '');

    if (typeof content !== 'string' || !content) return null;

    const Tag = getHeadingTag(level);

    const parsedContent = <span>{parseHeading(content)}</span>;

    return (
        <Tag
            className={headingVariants({
                level,
                alignment: alignment || undefined,
                className: classname
            })}
            {...props}
        >
            {parsedContent}
        </Tag>
    );
}

Heading.isStatic = true;

export default Heading;
