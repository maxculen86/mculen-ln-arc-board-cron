import React from 'react';
import { paragraphVariants } from './styles';

const isLetter = (text = '') => text.match(/^[A-Za-z]/);

function Paragraph({
    content = '',
    capital = false,
    className = '',
    alignment = ''
} = {}) {
    if (!content) return null;

    return (
        <p
            className={paragraphVariants({
                alignment,
                capital: capital && isLetter(content),
                className
            })}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
                __html: content
            }}
        />
    );
}

export default Paragraph;
