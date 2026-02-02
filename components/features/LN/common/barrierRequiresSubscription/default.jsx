import React from 'react';
import isSSR from '../../../../private/LN/common/utils/isSSR';
import { a11yAttrsBarrierSub } from '../../../../private/common/audioNews/helpers';
import { getConfigBarrierData } from '../../../LN-10-global/common/barrierRequiresSubscription/helpers';
import CONFIG_BARRIER from '../../../LN-10-global/common/barrierRequiresSubscription/_config';
import Button from '../../../ui/ln/button/default';
import Icon from '../../../ui/ln/icon/default';
import Link from '../../../ui/ln/link/default';

// FALTA FRONT
function BarrierRequiresSubscription({
    isLogged = '',
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
                isIconOnly
                onClick={closeBarrier}
                className="as-flex-end mb-24"
                aria-label="Cerrar modal"
                title="Cerrar modal"
            >
                <Icon name="close" />
            </Button>
            {/* TODO: antes estaba el badge */}
            <span>Suscriptores</span>
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
                    isIconOnly
                    variant="outline"
                    color="secondary"
                    title="Suscribirme"
                    asChild
                    id="btnsuscribirme"
                >
                    <a
                        href={`${button.href}${redirectCallback}`}
                        target="_self"
                    >
                        {button.label}
                    </a>
                </Button>
                <span
                    className="font-bold mb-4"
                    id={a11yAttrsBarrierSub['aria-describedby']}
                >
                    {message.text}
                </span>
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
