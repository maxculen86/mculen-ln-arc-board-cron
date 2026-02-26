import React from 'react';
import { SITIO_SEGURO_REGISTRACION } from 'fusion:environment';
import {
    currentUrlCallback,
    getTermicaValues,
    shouldHideSubscribeButton,
    termicaValuesSubscribe
} from '../helpers';
import Button from '../../../../../../../ui/ln/button/default';
import IconSprite from '../../../../../../../ui/ln/icon/default';
import { useHeaderContext } from '../../../../context';
import useTermica from '../../../../../../../../private/common/hooks/useTermica';
import { addEventToDataLayerV2 } from '../../../../../../../../private/LN/common/utils/addEventToDataLayer';
import SubscribeButtonText from './SubscribeButtonText';
import SubscribeTooltip from './SubscribeTooltip';

function SubscribeButton({ isHome }) {
    const { userType } = useHeaderContext();
    const isActivePaywall = Boolean(useTermica('paywall'));
    const isActiveTermicaSubscribe = Boolean(useTermica('buttonsuscribe'));

    const termicaValues = getTermicaValues(termicaValuesSubscribe);

    if (
        shouldHideSubscribeButton({
            userType,
            isActivePaywall,
            isActiveTermicaSubscribe
        })
    ) {
        return null;
    }

    return (
        <SubscribeTooltip
            termicaValues={termicaValues}
            isActiveTermicaSubscribe
            isHome={isHome}
        >
            <Button
                color="subscription"
                title="Suscribirse"
                onClick={() => {
                    addEventToDataLayerV2({
                        category: 'home_ln10',
                        label: 'suscribite',
                        action: 'header_logo',
                        event: 'e_linkclick'
                    });
                }}
                asChild
            >
                <a
                    href={`${SITIO_SEGURO_REGISTRACION}/ln/suscribirme?callback=${currentUrlCallback}`}
                >
                    <div className="max-lg:hidden flex items-center">
                        <IconSprite name="subscriber-inverted" type="color" />
                    </div>
                    <SubscribeButtonText
                        termicaValues={termicaValues}
                        isActiveTermicaSubscribe
                    />
                </a>
            </Button>
        </SubscribeTooltip>
    );
}

export default SubscribeButton;
