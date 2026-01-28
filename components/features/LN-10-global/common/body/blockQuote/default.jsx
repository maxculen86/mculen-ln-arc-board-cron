import React from 'react';
import { cx } from '@ln/cva';
import { Text } from '@ln/contenidos-ui-text';

function BlockQuote({
    data: { content_elements: contentElements = [], subtype },
    ...r
}) {
    const { content } = contentElements.length === 0 ? {} : contentElements[0];

    if (!content || subtype !== 'blockquote') return null;

    const baseDividerClasses =
        'border border-bottom border-thin border-neutral-light-800 h-1-5';

    return (
        <div
            className="destacado-blockquote px-16 py-24 container-center-100"
            {...r}
        >
            <hr className={cx(baseDividerClasses, 'w-154')} />
            <blockquote className="flex jc-start ai-center py-16">
                {content && (
                    <Text
                        as="p"
                        font="prumo"
                        weight="bold"
                        className="prumo text-24"
                    >
                        {content}
                    </Text>
                )}
            </blockquote>
            <hr className={cx(baseDividerClasses, 'w-90')} />
        </div>
    );
}

BlockQuote.arcType = 'blockquote';
BlockQuote.isStatic = true;

export default BlockQuote;
