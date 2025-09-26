import React from 'react';
import { Scrollarea } from '@ln/ds-common-scrollarea';
import Icon from '../icon/default';

/**
 * @typedef {import('@ln/ds-common-scrollarea').ScrollareaRootProps} ScrollareaProps
 */

/**
 * @param {ScrollareaProps} props
 * @returns {React.ReactElement}
 */
function ScrollArea({ position = 'horizontal', children, ...props }) {
    return (
        <Scrollarea direction={position} hideScrollbar {...props}>
            <Scrollarea.Content className="gap-24">
                {children}
            </Scrollarea.Content>
            <div className="hidden xl:block">
                <Scrollarea.Arrow
                    direction="start"
                    className="p-8 text-black-default"
                >
                    <Icon name="arrowLeft" size={16} />
                </Scrollarea.Arrow>
                <Scrollarea.Arrow
                    direction="end"
                    className="p-8 text-black-default"
                >
                    <Icon name="arrowRight" size={16} />
                </Scrollarea.Arrow>
            </div>
            <Scrollarea.Gradient gradientColor="var(--color-white-default)" />
        </Scrollarea>
    );
}

ScrollArea.propTypes = Scrollarea.propTypes;

export default ScrollArea;
