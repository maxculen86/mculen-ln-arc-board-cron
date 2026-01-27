import React from 'react';
import { cx } from '@ln/ds-cva';
import Divider from '../divider/default';

/**
 * @param {Object} props
 * @param {string} props.content - Contenido HTML del blockquote
 * @param {string} [props.className] - Clases CSS adicionales
 * @returns {React.ReactElement|null}
 */
function BlockQuote({ content, className, ...props }) {
    if (!content) return null;

    return (
        <div className={cx('flex flex-col gap-16', className)} {...props}>
            <div className="w-154">
                <Divider size={2} color="custom" className="bg-base-default" />
            </div>
            <blockquote>
                <p
                    className="font-primary text-subheading-md font-w-bold"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </blockquote>
            <div className="w-90">
                <Divider size={2} color="custom" className="bg-base-default" />
            </div>
        </div>
    );
}

export default BlockQuote;
