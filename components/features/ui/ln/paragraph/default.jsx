import React from 'react';
import { cx } from '@ln/ds-cva';

const isLetter = (text = '') => text.match(/^[A-Za-z]/);

function Paragraph({
    content = '',
    capital = false,
    className = '',
    // eslint-disable-next-line no-unused-vars
    alignment = ''
} = {}) {
    if (!content) return null;
    // TODO Front: aplicar clase de alineado segun alignment ('left' | 'center' | 'right') proveniente de Composer y borrar el eslint-disable de arriba
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
