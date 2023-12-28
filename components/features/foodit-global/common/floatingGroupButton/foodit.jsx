import React from 'react';
import { Groupbutton } from '@ln/common-ui-groupbutton';
import { Button } from '@ln/foodit-ui-button';
import { useFloatingGroupButton } from './useFloatingGroupButton';
import classNames from 'classnames';

export const FloatingGroupButton = ({ layout }) => {
    const { visible, className, buttons } = useFloatingGroupButton({ layout });

    const _className = classNames(
        'inline-flex fixed bottom-0 left-50 -translate-x-50 mb-16 z-10 shadow-down-2xs',
        'transition transition-all transition-duration-400',
        { 'translate-y-100': !visible },
        className
    );

    return (
        <Groupbutton className={_className}>
            {buttons.map((button, i) => (
                <Button key={`button-${i}`} size={32} {...button} />
            ))}
        </Groupbutton>
    );
};

export default FloatingGroupButton;
