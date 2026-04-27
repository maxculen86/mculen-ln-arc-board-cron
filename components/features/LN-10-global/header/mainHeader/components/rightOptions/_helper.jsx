/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames';

export const termicaValuesUpselling = [
    'black_button_text',
    'class_upselling_tooltip',
    'duo_button_text',
    'triple_button_text',
    'upselling_tooltip_text'
];

export const termicaValuesSubscribe = [
    'button_text',
    'class_tooltip',
    'sticky_button_text',
    'tooltip_text'
];

export const getClassNameButtonSubscribe = ({ class_tooltip, negative }) => ({
    tooltipClassName: classNames(
        '--mobile-none max-w-165 white-space-normal',
        class_tooltip
    ),
    subscribeButtonClassName: classNames('relative text-neutral-light-800', {
        '--negative': negative
    })
});

function TextButton({ sticky, isHome, stickyButtonText, buttonText }) {
    return sticky || !isHome ? (
        <span
            id="sticky-button-text"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
                __html: stickyButtonText
            }}
        />
    ) : (
        <span
            id="button-text"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
                __html: buttonText
            }}
        />
    );
}

export function FallBackTextButton({
    buttonText,
    isHome,
    sticky,
    stickyButtonText,
    termicaSubscribe
}) {
    if (!termicaSubscribe || !buttonText || !stickyButtonText)
        return <span>Suscribite</span>;
    return (
        <TextButton
            sticky={sticky}
            isHome={isHome}
            stickyButtonText={stickyButtonText}
            buttonText={buttonText}
        />
    );
}

export const toggleBellColor = negative => {
    document.documentElement.style.setProperty(
        '--notification-drawer-button-icon-color',
        negative ? '#FEFEFE' : '#333333'
    );
};

export const isAndroid = () => {
    if (typeof window === 'undefined') return false;
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /android/.test(userAgent);
};

export const getAppLink = (url = '') => {
    const baseUrl = url || 'https://www.lanacion.com.ar/';
    const encodedUrl = encodeURIComponent(baseUrl);
    return `intent://handle?url=${encodedUrl}%2f#Intent;scheme=lanacion;package=app.lanacion.activity;S.browser_fallback_url=https%3A%2f%2fplay.google.com%2fstore%2fapps%2fdetails%3Fid%3Dapp.lanacion.activity;end;`;
};
