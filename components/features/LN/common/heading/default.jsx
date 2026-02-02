import React from 'react';
import parse from '../../../../private/common/utils/parseHelper';
import generateProps from '../link/_helpers';
import { getHeadingConfig } from './_helpers';
import HeadingView from './View';

function Heading({ data }) {
    const { level, content, link } = data;

    const config = getHeadingConfig(level);
    const parsedContent = <span>{parse(content)}</span>;
    const linkProps = link ? generateProps({ href: link }) : null;

    return (
        <HeadingView
            tag={config.tag || 'h4'}
            className={config.classCondition}
            content={parsedContent}
            linkProps={linkProps}
        />
    );
}

export default Heading;
