/* eslint-disable react/no-danger */
import React from 'react';
import { cx } from '@ln/ds-cva';
import '../../../resources/dist/css/ln/components/com-paragraph.css';

function ComParagraph({
    size = '',
    capital = '',
    content,
    classCondition = '',
    alignment = ''
}) {
    return (
        <p
            className={cx(
                'com-paragraph',
                classCondition,
                capital,
                size,
                alignment && `text-${alignment}`
            )}
            dangerouslySetInnerHTML={{
                __html: content
            }}
        />
    );
}

export default ComParagraph;
