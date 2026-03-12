import React from 'react';
import { cx } from '@ln/cva';
import { Text } from '@ln/contenidos-ui-text';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import '../../../../../../resources/dist/css/ln/components/com-lead.css';
import '../../../../../../resources/dist/css/ln/modules/mod-linklist.css';

function PullQuote({ data, className = '', ...r }) {
    const {
        citation: { content: author = '' } = {},
        content_elements: {
            0: { content }
        }
    } = data;

    if (!content) return null;

    const _classNames = cx(
        'cita-autor',
        'flex flex-column gap-16 flex-nowrap',
        'w-100',
        'px-16 py-24',
        className
    );

    return (
        <section className={_classNames} {...r}>
            <div className="cita-content border border-left border-1-5 border-neutral-light-800 container-center-100">
                <div className="title-cita flex gap-8 pl-8 pb-16">
                    <Icon size={24}>
                        <IconSprite name="quote" />
                    </Icon>
                    <Text
                        as="p"
                        font="prumo"
                        weight="bold"
                        className="prumo prumo-extra --prumo-italic text-24"
                    >
                        {/* eslint-disable-next-line react/no-danger */}
                        <span dangerouslySetInnerHTML={{ __html: content }} />
                        &rdquo;
                    </Text>
                </div>
                {author && (
                    <Text as="h3" font="arial" className="text-14 pl-40">
                        — {author}
                    </Text>
                )}
            </div>
        </section>
    );
}

PullQuote.arcType = 'pullquote';
PullQuote.isStatic = true;

export default PullQuote;
