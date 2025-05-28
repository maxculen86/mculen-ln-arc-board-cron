import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ln/foodit-ui-button';
import { Avatar } from '@ln/foodit-ui-avatar';
import { SITIO_SEGURO_REGISTRACION } from 'fusion:environment';
import { AccountItem } from './accountItem';
import PwaInstallPrompt from '../PWAInstallPrompt/PWAInstallPrompt';

export function MyAccount({
    avatarProps = {},
    itemsList = [],
    fullWidth,
    logOutItem,
    arcSite,
    deployment
}) {
    const { email, initials, hasSubscription } = avatarProps;

    if (!itemsList.length) return null;

    return (
        <>
            {(initials || email) && (
                <div className="flex flex-column ai-center gap-24">
                    <div className="flex flex-column ai-center gap-8">
                        <Avatar
                            size={56}
                            variant={
                                hasSubscription ? 'suscriber' : 'no-suscriber'
                            }
                        >
                            {initials && (
                                <Avatar.Initials>{initials}</Avatar.Initials>
                            )}
                            {email && <Avatar.Email>{email}</Avatar.Email>}
                        </Avatar>
                    </div>
                    {!hasSubscription && (
                        <Button
                            title="Ir a Suscribirse"
                            variant="accent"
                            href={`${SITIO_SEGURO_REGISTRACION}/suscripcion/V/3/?cv=670&fc=825&callback=${window.btoa(
                                window.location.href
                            )}`}
                        >
                            Suscribite
                        </Button>
                    )}
                </div>
            )}
            <ul
                className={fullWidth ? 'flex flex-column w-100 h-100' : 'w-288'}
            >
                {itemsList.map(item => (
                    <AccountItem key={item.text} item={item} />
                ))}
                <PwaInstallPrompt
                    arcSite={arcSite}
                    deployment={deployment}
                    variant="snackBarDrawer"
                />
                {logOutItem && (
                    <AccountItem key={logOutItem.text} item={logOutItem} />
                )}
            </ul>
        </>
    );
}

MyAccount.propTypes = {
    avatarProps: PropTypes.shape({
        email: PropTypes.string.isRequired,
        initials: PropTypes.string.isRequired,
        hasSubscription: PropTypes.bool.isRequired
    }).isRequired,
    itemsList: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.node.isRequired,
            onClick: PropTypes.func.isRequired,
            text: PropTypes.string.isRequired,
            variant: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            classNameList: PropTypes.string.isRequired
        })
    ).isRequired,
    fullWidth: PropTypes.bool.isRequired,
    logOutItem: PropTypes.shape({
        icon: PropTypes.node.isRequired,
        onClick: PropTypes.func.isRequired,
        text: PropTypes.string.isRequired,
        variant: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        classNameList: PropTypes.string.isRequired
    }).isRequired,
    arcSite: PropTypes.string.isRequired,
    deployment: PropTypes.string.isRequired
};

export default MyAccount;
