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

export const getClassNameButtonSubscribe = ({
    class_tooltip,
    isHome,
    negative
}) => {
    return {
        tooltipClassName: classNames(
            !isHome && 'none',
            '--mobile-none',
            class_tooltip
        ),
        subscribeButtonClassName: classNames(
            'relative text-neutral-light-800',
            {
                '--negative': negative
            }
        )
    };
};

const TextButton = ({ sticky, isHome, stickyButtonText, buttonText }) => {
    return sticky || !isHome ? (
        <span
            id="sticky-button-text"
            dangerouslySetInnerHTML={{
                __html: stickyButtonText
            }}
        />
    ) : (
        <span
            id="button-text"
            dangerouslySetInnerHTML={{
                __html: buttonText
            }}
        />
    );
};

export const FallBackTextButton = ({
    buttonText,
    isHome,
    sticky,
    stickyButtonText,
    termicaSubscribe
}) => {
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
};

export const toggleBellColor = negative => {
    document.documentElement.style.setProperty(
        '--notification-drawer-button-icon-color',
        negative ? '#FEFEFE' : '#333333'
    );
};
