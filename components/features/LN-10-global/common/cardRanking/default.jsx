import React from 'react';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { Link } from '@ln/contenidos-ui-link';
import { Text } from '@ln/contenidos-ui-text';
import { cx } from '@ln/cva';

function CardRanking({ href, title, mediaData, i }) {
    const articleClasses = cx(
        'flex gap-12 pb-12',
        i === 0 ? 'flex-column' : 'flex-row-reverse'
    );
    const placeholderClasses = cx(
        'ln-placeholder flex jc-center ai-center relative overflow-hidden h-100 bg-light-200',
        i === 0 ? 'ratio-21-9' : 'ratio-1-1 w-120 min-w-120'
    );
    return (
        <Link href={href} title={title} unstyled>
            <article className={articleClasses}>
                <div className={placeholderClasses}>
                    <Adaptableimage
                        {...mediaData}
                        className="absolute w-100 h-100"
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className="flex gap-12 flex-grow-1">
                    <Text
                        text={String(i + 1)}
                        className="as-start --prumo --font-medium --font-ranking"
                    />
                    <Text
                        as="h3"
                        className="title text-16 flex-grow-1"
                        text={title}
                    />
                </div>
            </article>
        </Link>
    );
}

export default CardRanking;
