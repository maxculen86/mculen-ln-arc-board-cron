import React from 'react';
import { Avatar } from '@ln/foodit-ui-avatar';
import { AccountItem } from './accountItem';
import PwaInstallPrompt from '../PWAInstallPrompt/PWAInstallPrompt';
import LoginSubscribeButtons from '../SubscribeLoginButton/foodit';
import { useNavigationData } from '../Header/hooks/useNavigationData';

export function MyAccount({
    avatarProps = {},
    itemsList = [],
    fullWidth,
    logOutItem,
    arcSite,
    deployment
}) {
    const { email, initials, hasSubscription } = avatarProps;
    const { termicasData } = useNavigationData();

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
                        <LoginSubscribeButtons
                            comesFrom="MyAccount"
                            termicasData={termicasData}
                        />
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

export default MyAccount;
