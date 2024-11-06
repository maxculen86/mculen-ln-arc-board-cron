import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from '@ln/contenidos-ui-badge';
import { Button } from '@ln/contenidos-ui-button';
import { Link } from '@ln/contenidos-ui-link';
import { Text } from '@ln/contenidos-ui-text';
import classNames from 'classnames';
import get from '../../../../private/common/utils/get';
import CONFIG from '../../../../private/common/barrier/_config';

function BarrierRequiresSubscription({ redirectCallback, isLogged }) {
    const buttons = get(CONFIG, 'exclusive-ln.buttons', '');
    const title = get(CONFIG, 'exclusive-ln.title', '');
    const subTitle = get(CONFIG, 'exclusive-ln.subTitle', '');
    const unLogged = get(CONFIG, 'exclusive-ln.unLogged', '');
    const logged = get(CONFIG, 'exclusive-ln.logged', '');

    const message = isLogged ? logged : unLogged;

    const handleRedirect = () => {
        window.open(buttons.link + redirectCallback, '_self');
    };

    return (
        <div
            className={classNames(
                'barrier flex flex-column jc-center ai-center rounded-4 m-16 py-16 px-20',
                'w-720_md bg-dark-200 text-light-200'
            )}
        >
            <Badge
                type="subscriberNegative"
                text="Suscriptores"
                className="mb-24"
            />
            <div className="description text-center mb-16">
                {title && (
                    <p
                        className="--font-primary --l --font-medium"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                )}
                {subTitle && <Text as="p">{subTitle}</Text>}
            </div>
            <div className="interaction-container w-100 text-center flex flex-column jc-center ai-center">
                <Button
                    onClick={handleRedirect}
                    variant="custom"
                    className="w-250 bg-light-100 mb-16"
                    title="Suscribirme"
                >
                    {buttons.label}
                </Button>
                <Text as="p" className="font-bold mb-4">
                    {message.text}
                </Text>
                <Link
                    href={message.href + redirectCallback}
                    title="Iniciar sesión"
                    className="text-blue-300 font-bold"
                >
                    {message.textLink}
                </Link>
            </div>
        </div>
    );
}

BarrierRequiresSubscription.propTypes = {
    redirectCallback: PropTypes.string,
    isLogged: PropTypes.bool
};

BarrierRequiresSubscription.defaultProps = {
    redirectCallback: '',
    isLogged: false
};

export default BarrierRequiresSubscription;
