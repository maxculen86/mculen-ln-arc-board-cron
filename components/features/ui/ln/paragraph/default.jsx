import React from 'react';
import { cx } from '@ln/ds-cva';

const isLetter = (text = '') => text.match(/^[A-Za-z]/);

function Paragraph({ content = '', capital = false, className = '' } = {}) {
    if (!content) return null;
    return (
        <p
            className={cx(
                'ds-custom-paragraph font-tertiary text-20 leading-[150%] tracking-[-0.1px]',
                capital && isLetter(content) && 'editorial-drop-cap',
                className
            )}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
                __html: content
            }}
        />
    );
}

export default Paragraph;
