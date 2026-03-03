import React from 'react';
import { SITIO_SEGURO_REGISTRACION } from 'fusion:environment';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Tooltip } from '@ln/contenidos-ui-tooltip';
import IconSprite from '../../../../../private-global/common/iconSprite/IconSprite';
import { useHeaderContext } from '../../../context';
import { getTermicaValues, showSubscribeButton } from '../../_helper';
import {
    FallBackTextButton,
    termicaValuesSubscribe,
    getClassNameButtonSubscribe
} from './_helper';
import useTermica from '../../../../../../private/common/hooks/useTermica';
import addEventToDataLayer from '../../../../../../private/LN/common/utils/addEventToDataLayer';

export function SubscribeButton() {
    const { isHome, sticky, userType, negative } = useHeaderContext();

    const termicaSubscribe = useTermica('buttonsuscribe');
    const subscription = userType === 'subscribed';
    const hasSubscribeButton = showSubscribeButton(subscription);

    const {
        button_text: buttonText,
        class_tooltip: classTooltip,
        sticky_button_text: stickyButtonText,
        tooltip_text: tooltipText
    } = getTermicaValues(termicaValuesSubscribe);

    const { tooltipClassName, subscribeButtonClassName } =
        getClassNameButtonSubscribe({
            class_tooltip: classTooltip,
            isHome,
            negative
        });
    const shouldShowTooltip = Boolean(
        termicaSubscribe && tooltipText && isHome
    );

    if (userType === 'subscribed' || !hasSubscribeButton) return null;
    return (
        <Button
            id="btnsuscribite"
            title="Suscribite"
            variant="subscribe"
            size={{ sm: 32, md: 40 }}
            className={subscribeButtonClassName}
            onClick={() => {
                window.location.href = `${SITIO_SEGURO_REGISTRACION}/ln/suscribirme?callback=${window.btoa(
                    window.location.href
                )}`;
                addEventToDataLayer({
                    category: 'home_ln10',
                    label: 'suscribite',
                    action: 'header_logo',
                    event: 'e_linkclick'
                });
            }}
        >
            {shouldShowTooltip && (
                <Tooltip className={tooltipClassName} text={tooltipText} />
            )}
            <Icon size={16} className="--mobile-none">
                <IconSprite name="subscriberInverted" color />
            </Icon>
            <FallBackTextButton
                buttonText={buttonText}
                isHome={isHome}
                sticky={sticky}
                stickyButtonText={stickyButtonText}
                termicaSubscribe={termicaSubscribe}
            />
        </Button>
    );
}
