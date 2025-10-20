import React from 'react';
import PropTypes from 'prop-types';
import { cx } from '@ln/cva';
import { Text } from '@ln/contenidos-ui-text';
import ListOrderedOrUnordered from '../../../../../private/LN/nota/cuerpo/listOrderedOrUnordered';

function BlockQuote({
    data: { content_elements: contentElements = [], subtype },
    ...r
}) {
    const {
        content,
        items,
        list_type: listType
    } = contentElements.length === 0 ? {} : contentElements[0];

    if (subtype !== 'blockquote') return null;

    if (!content && !items) return null;

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
                {/* TODO: Actualizar componente ListOrderedOrUnordered a librería */}
                {items && (
                    <ListOrderedOrUnordered
                        data={{ items, list_type: listType }}
                    />
                )}
            </blockquote>
            <hr className={cx(baseDividerClasses, 'w-90')} />
        </div>
    );
}

BlockQuote.arcType = 'blockquote';
BlockQuote.isStatic = true;

BlockQuote.propTypes = {
    data: PropTypes.shape({
        content_elements: PropTypes.arrayOf(
            PropTypes.shape({
                content: PropTypes.string
            })
        ),
        subtype: PropTypes.string
    }).isRequired
};

export default BlockQuote;
