import React from 'react';
import { SITIO_SEGURO_REGISTRACION } from 'fusion:environment';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Tooltip } from '@ln/contenidos-ui-tooltip';
import IconSprite from '../../../../../private-global/common/iconSprite/IconSprite';
import { useHeaderContext } from '../../../context';
import { getTermicaValues } from '../../_helper';
import {
    FallBackTextButton,
    termicaValuesSubscribe,
    getClassNameButtonSubscribe
} from './_helper';
import { showSubscribeButton } from '../../_helper';
import useTermica from '../../../../../../private/common/hooks/useTermica';
import addEventToDataLayer from '../../../../../../private/LN/common/utils/addEventToDataLayer';

export const SubscribeButton = () => {
    const { isHome, sticky, userType, negative } = useHeaderContext();

    const termicaSubscribe = useTermica('buttonsuscribe');
    const subscription = userType === 'subscribed';
    const hasSubscribeButton = showSubscribeButton(subscription);

    const {
        button_text,
        class_tooltip,
        sticky_button_text,
        tooltip_text
    } = getTermicaValues(termicaValuesSubscribe);

    const {
        tooltipClassName,
        subscribeButtonClassName
    } = getClassNameButtonSubscribe({
        class_tooltip,
        isHome,
        negative
    });

    if (userType === 'subscribed' || !hasSubscribeButton) return <></>;
    return (
        <Button
            id="btnsuscribite"
            title="Suscribite"
            variant="subscribe"
            size={{ sm: 32, md: 40 }}
            className={subscribeButtonClassName}
            onClick={() => {
                window.location.href = `${SITIO_SEGURO_REGISTRACION}/suscribirme?callback=${window.btoa(
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
            {termicaSubscribe && tooltip_text && (
                <Tooltip className={tooltipClassName} text={tooltip_text} />
            )}
            <Icon
                icon="suscriptorExclusivo"
                size={16}
                className="--mobile-none"
            >
                <IconSprite
                    name="exclusivoSuscriptores"
                    fill="#FDB727"
                    critical
                />
            </Icon>
            <FallBackTextButton
                buttonText={button_text}
                isHome={isHome}
                sticky={sticky}
                stickyButtonText={sticky_button_text}
                termicaSubscribe={termicaSubscribe}
            />
        </Button>
    );
};
