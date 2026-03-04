import React from 'react';
import { useHeaderContext } from '../../../../context';
import { HEADER_VARIANTS } from '../../../../constants';

function SubscribeButtonText({
    termicaValues = {},
    isActiveTermicaSubscribe = false
}) {
    const { position, isHome } = useHeaderContext();
    const { button_text: buttonText, sticky_button_text: stickyButtonText } =
        termicaValues;

    const isSticky = position === HEADER_VARIANTS.POSITION.STICKY;

    const textToDisplay = isSticky ? stickyButtonText : buttonText;
    const textId = isSticky ? 'sticky-button-text' : 'button-text';

    if (
        !isActiveTermicaSubscribe ||
        !buttonText ||
        !stickyButtonText ||
        !isHome
    ) {
        return <span>suscribite</span>;
    }

    return (
        <span
            id={textId}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: textToDisplay }}
        />
    );
}

export default SubscribeButtonText;
