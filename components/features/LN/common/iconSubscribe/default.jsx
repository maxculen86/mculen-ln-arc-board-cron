import { cx } from '@ln/ds-cva';
import React from 'react';
import Icon from '../../../ui/ln/icon/default';

function IconSubscribe({ containerProps, iconProps }) {
    const {
        withBorder = true,
        className: classNameContainer,
        ...propsContainer
    } = containerProps || {};
    return (
        <div
            className={cx(
                'flex items-center justify-center h-24 w-24 rounded-full bg-warning-default',
                withBorder && 'border border-neutral-1',
                classNameContainer
            )}
            {...propsContainer}
        >
            <Icon
                size={14}
                name="crow"
                fill="--color-primary-dark"
                {...iconProps}
            />
        </div>
    );
}

export default IconSubscribe;
