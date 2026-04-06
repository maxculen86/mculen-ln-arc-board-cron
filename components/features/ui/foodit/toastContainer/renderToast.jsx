import React from 'react';
import { toastManager } from '@ln/ds-common-toasts';
import { Button } from '@ln/ds-common-button';
import IconSprite from '../icon/default';

function renderToasts({
    color = 'success',
    duration = 7000,
    buttonProps,
    ...props
}) {
    const closeIcon = <IconSprite size={20} name="close" />;

    const iconNameMap = {
        success: <IconSprite name="check-unfilled" />,
        error: <IconSprite name="error-unfilled" />,
        info: <IconSprite name="info-unfilled" />,
        warning: <IconSprite name="warning-unfilled" />
    };

    const iconProps = {
        children: iconNameMap[color] || iconNameMap.success
    };

    const closeIconProps = {
        children: closeIcon
    };

    toastManager.show({
        iconProps,
        closeIconProps,
        color,
        duration,
        customContent: buttonProps?.href ? (
            <Button
                variant="outline"
                color="secondary"
                className="w-fit"
                {...buttonProps}
                asChild
            >
                <a href={buttonProps?.href}>{buttonProps?.children}</a>
            </Button>
        ) : null,
        ...props
    });
}

export default renderToasts;
