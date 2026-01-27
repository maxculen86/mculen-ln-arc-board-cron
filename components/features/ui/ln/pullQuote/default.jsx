import React from 'react';
import { cx } from '@ln/ds-cva';
import Icon from '../icon/default';

/**
 * @param {Object} props
 * @param {string} props.content - Contenido HTML del pullquote
 * @param {string} [props.author] - Autor de la cita
 * @param {string} [props.className] - Clases CSS adicionales
 * @returns {React.ReactElement|null}
 */

function PullQuote({ content, author, className, ...props }) {
    if (!content) return null;

    return (
        <section
            className={cx(
                'flex gap-8 md:ml-16 pl-8 border-l-2 border-base-default',
                className
            )}
            {...props}
        >
            <Icon name="quote" />
            <div>
                <p
                    className="font-primary-italic text-24 font-w-bold pb-16"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                        __html: `${content}&rdquo;`
                    }}
                />
                {author && <cite className="text-14 italic">— {author}</cite>}
            </div>
        </section>
    );
}

export default PullQuote;
