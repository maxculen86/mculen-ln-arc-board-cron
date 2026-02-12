import React from 'react';
import { SHARE_OPTIONS } from '../_helpers';
import config from '../../../../../properties/sites/la-nacion-ar';
import Button from '../../../ui/ln/button/default';

function ShareMenu({
    isOpen,
    requestUri,
    title,
    mobileTitle,
    setCopied,
    onClose
}) {
    if (!isOpen) return null;

    const { host } = config;

    const handleClick = option => {
        option.onClick({
            requestUri,
            host,
            title,
            mobileTitle,
            setCopied
        });
        onClose();
    };

    return (
        <ul className="absolute top-full right-0 bg-white shadow-md rounded p-8 flex flex-column gap-8 z-10">
            {SHARE_OPTIONS.map(option => (
                <li key={option.id}>
                    <Button
                        id="btnsharemenu"
                        isIconOnly
                        variant="outline"
                        color="secondary"
                        className="flex items-center gap-8"
                        onClick={() => handleClick(option)}
                    >
                        {option.icon}
                        <span>{option.label}</span>
                    </Button>
                </li>
            ))}
        </ul>
    );
}

export default ShareMenu;
