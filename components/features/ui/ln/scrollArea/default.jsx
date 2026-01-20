import React from 'react';
import { Scrollarea } from '@ln/ds-common-scrollarea';
import { cx } from '@ln/ds-cva';
import Icon from '../icon/default';

/**
 * @typedef {import('@ln/ds-common-scrollarea').ScrollareaRootProps} ScrollareaProps
 *  * @typedef {import('@ln/ds-common-scrollarea').ScrollareaContentProps} ScrollareaContentProps
 */

/**
 * @param {ScrollareaProps} props
 *  * @param {ScrollareaContentProps} props.contentProps
 * @returns {React.ReactElement}
 */
function ScrollArea({
    position = 'horizontal',
    children,
    arrowProps,
    contentProps,
    ...props
}) {
    return (
        <Scrollarea direction={position} hideScrollbar {...props}>
            <Scrollarea.Content
                {...contentProps}
                className={cx('gap-24', contentProps?.className)}
            >
                {children}
            </Scrollarea.Content>
            <div className="hidden xl:block">
                <Scrollarea.Arrow
                    direction="start"
                    className="p-8 text-black-default"
                    {...arrowProps?.start}
                >
                    <Icon name="arrow-left" size={16} />
                </Scrollarea.Arrow>
                <Scrollarea.Arrow
                    direction="end"
                    className="p-8 text-black-default"
                    {...arrowProps?.end}
                >
                    <Icon name="arrow-right" size={16} />
                </Scrollarea.Arrow>
            </div>
            <Scrollarea.Gradient gradientColor="var(--color-white-default)" />
        </Scrollarea>
    );
}

export default ScrollArea;
