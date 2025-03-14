import React, { useCallback, useEffect, useState } from 'react';
import { ToastContainer, Toast } from '@ln/common-ui-toast';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { getIconProps } from './helpers';

function Toasts() {
    const [toast, setNewToast] = useState(null);

    const ToastIcon = useCallback(
        ({ iconName, fill }) => (
            <Icon size={24} hasWrapper>
                <IconSprite name={iconName} fill={fill} />
            </Icon>
        ),
        []
    );

    const ToastButton = useCallback(
        ({ buttonProps }) =>
            buttonProps ? (
                <Button
                    variant="secondary"
                    className="bg-neutral-light-50"
                    {...buttonProps}
                />
            ) : null,
        []
    );

    const addToast = useCallback(({ buttonProps, ...props }) => {
        const { fill, icon: iconName } = getIconProps(props);

        setNewToast(
            <Toast
                {...props}
                pauseOnHover
                icon={<ToastIcon iconName={iconName} fill={fill} />}
                button={<ToastButton buttonProps={buttonProps} />}
            />
        );
    }, []);

    useEffect(() => {
        window?.LN?.observable?.subscribe('addToast', addToast);

        return () => {
            window?.LN?.observable?.unsubscribe('addToast', addToast);
        };
    }, []);

    return (
        <ToastContainer
            newToast={toast}
            duration={2750}
            transitionIn={['fade-in-up']}
            hPosition="end"
            className="bottom-64 bottom-100_md z-1500"
            style={{ alignItems: 'center' }}
        />
    );
}

export default Toasts;
