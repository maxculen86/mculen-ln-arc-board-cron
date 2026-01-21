import React from 'react';
import Icon from '../../../ui/ln/icon/default';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

// TODO para front: realizar ajustes de estilos según diseño.
function PullQuote({ data = {}, ...restProps }) {
    const { citation = {}, content_elements: contentElements = [] } = data;
    const author = citation?.content ?? '';
    const firstElement = contentElements?.[0]?.content;

    if (!firstElement) return null;

    return (
        <section {...restProps}>
            <Icon size={24}>
                <IconSprite name="quote" />
            </Icon>
            <span
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: `${firstElement}&rdquo;` }}
            />
            {author && <h3>— {author}</h3>}
        </section>
    );
}

PullQuote.arcType = 'pullquote';
PullQuote.isStatic = true;

export default PullQuote;
