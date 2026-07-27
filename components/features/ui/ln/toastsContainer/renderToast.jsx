import React from 'react';
import { toastManager } from '@ln/ds-common-toasts';
import { Button } from '@ln/ds-common-button';
import IconSprite from '../icon/default';

const colorDefault = 'info';

/**
 * Renderiza un toast con iconos personalizados según el color/variante.
 * Los iconos se configuran automáticamente según el color proporcionado.
 *
 * @param {import('@ln/ds-common-toasts').ToastPublicProps & { color?: 'success' | 'error' | 'info' | 'warning' }} options
 * @returns {void}
 */
function renderToasts({
    color = colorDefault,
    duration = 3000,
    buttonProps,
    ...props
}) {
    // Configuración de icons
    const closeIcon = <IconSprite name="close" />;

    // Mapeo de color a nombre de icono
    const iconNameMap = {
        success: <IconSprite name="check-circle-filled" />,
        error: <IconSprite name="danger-filled" />,
        info: <IconSprite name="info-filled" />,
        warning: <IconSprite name="warning-filled" />
    };

    const iconProps = {
        children: iconNameMap[color] || iconNameMap[colorDefault]
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
                color="custom"
                className="bg-neutral-1 text-black-default hover:bg-neutral-1-lighten border-black-default w-fit"
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
