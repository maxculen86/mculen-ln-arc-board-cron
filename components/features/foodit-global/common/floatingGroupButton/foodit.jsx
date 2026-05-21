import React from 'react';

import { Groupbutton } from '@ln/common-ui-groupbutton';
import { Button } from '@ln/foodit-ui-button';
import classNames from 'classnames';
import { useAppContext } from 'fusion:context';
import { useFloatingGroupButton } from './useFloatingGroupButton';
import useGetUserConfig from '../../hooks/useGetUserConfig';

function FloatingGroupButton({
    buttons = [],
    className = '',
    observerSelector = ''
}) {
    const { layout, siteProperties } = useAppContext();
    const { layoutsName = {} } = siteProperties || {};
    const isLayoutBuscador = layout === layoutsName.FooditBuscador;

    const { visible } = useFloatingGroupButton({ observerSelector });
    const { userType } = useGetUserConfig();

    const _className = classNames(
        '--no-app print-hide inline-flex fixed bottom-0 left-50 -translate-x-50 mb-16 z-7 shadow-down-2xs bg-primary-positive rounded-4 overflow-hidden',
        'transition transition-all transition-duration-400 sm-only',
        { 'translate-y-100': !visible },
        className
    );

    return (
        <Groupbutton className={_className}>
            {buttons.map(button => (
                <Button
                    className="button-nota"
                    key={button.title}
                    size={32}
                    {...button}
                    disabled={!isLayoutBuscador && userType !== 'subscribed'}
                />
            ))}
        </Groupbutton>
    );
}

export default FloatingGroupButton;
