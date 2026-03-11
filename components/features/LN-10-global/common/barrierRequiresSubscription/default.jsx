import React from 'react';
import { Badge } from '@ln/contenidos-ui-badge';
import { Button } from '@ln/contenidos-ui-button';
import { Link } from '@ln/contenidos-ui-link';
import { Text } from '@ln/contenidos-ui-text';
import { Icon } from '@ln/common-ui-icon';
import CONFIG_BARRIER from './_config';
import { getConfigBarrierData } from './helpers';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import isSSR from '../../../../private/LN/common/utils/isSSR';
import { a11yAttrsBarrierSub } from '../../../../private/common/audioNews/helpers';

function BarrierRequiresSubscription({
    isLogged = false,
    closeBarrier = () => null
}) {
    const { button, title, message } = getConfigBarrierData(
        isLogged,
        CONFIG_BARRIER
    );

    const redirectCallback = !isSSR() ? window.btoa(window.location.href) : '';

    return (
        <div className="barrier flex flex-column jc-center ai-center rounded-4 py-16 px-20 w-100 bg-dark-200 text-light-200">
            <Button
                iconOnly
                size="inherit"
                onClick={closeBarrier}
                className="as-flex-end mb-24"
                aria-label="Cerrar modal"
                title="Cerrar modal"
            >
                <Icon size={24}>
                    <IconSprite name="close" fill="#fff" />
                </Icon>
            </Button>
            <Badge
                type="subscriberNegative"
                text="Suscriptores"
                className="mb-24"
            />
            <div className="text-center mb-16">
                {title && (
                    <p
                        className="--font-primary --l --font-medium"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: title }}
                        id={a11yAttrsBarrierSub['aria-labelledby']}
                    />
                )}
            </div>
            <div className="w-100 text-center flex flex-column jc-center ai-center">
                <Button
                    variant="custom"
                    className="w-250 bg-light-100 mb-16 text-light-700"
                    title="Suscribirme"
                    target="_self"
                    href={`${button.href}${redirectCallback}`}
                >
                    {button.label}
                </Button>
                <Text
                    as="p"
                    className="font-bold mb-4"
                    id={a11yAttrsBarrierSub['aria-describedby']}
                >
                    {message.text}
                </Text>
                <Link
                    href={`${message.href}${redirectCallback}`}
                    title="Iniciar sesión"
                    className="text-blue-300 font-bold"
                >
                    {message.textLink}
                </Link>
            </div>
        </div>
    );
}

export default BarrierRequiresSubscription;
