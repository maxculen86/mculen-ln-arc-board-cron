import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import { Itemcard } from '@ln/foodit-ui-itemcard';
import { Avatar } from '@ln/foodit-ui-avatar';

export const MyAccount = ({ avatarProps = {}, itemsList = [], fullWidth }) => {
    const { email, initials, hasSubscription, restoreContext } = avatarProps;

    if (!itemsList.length) return <></>;

    return (
        <>
            {(initials || email) && (
                <div className="flex flex-column ai-center gap-16">
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
                        <Button title="Ir a Suscribirse" variant="accent">
                            Suscribite
                        </Button>
                    )}
                </div>
            )}
            <ul className={fullWidth ? 'w-100' : 'w-288'}>
                {itemsList.map(({ icon, onClick, text, variant, title }) => {
                    return (
                        <li key={text}>
                            <Itemcard
                                type="button"
                                text={text}
                                icon={icon}
                                title={title ?? `Ir a ${text}`}
                                onClick={() =>
                                    onClick({ callback: restoreContext })
                                }
                                level={1}
                                fullWidth
                                variant={variant}
                            />
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default MyAccount;
