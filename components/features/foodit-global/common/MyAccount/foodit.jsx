import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import { Itemcard } from '@ln/foodit-ui-itemcard';
import { Avatar } from '@ln/foodit-ui-avatar';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import { SITIO_SEGURO_REGISTRACION } from 'fusion:environment';

export const MyAccount = ({ avatarProps = {}, itemsList = [], fullWidth }) => {
    const { email, initials, hasSubscription, restoreContext } = avatarProps;

    if (!itemsList.length) return <></>;

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
                {itemsList.map(
                    ({
                        icon,
                        onClick,
                        text,
                        variant,
                        title,
                        classNameList
                    }) => {
                        return (
                            <li key={text} className={classNameList}>
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
                                    arrowIcon={
                                        <IconSprite name="arrow-right" />
                                    }
                                />
                            </li>
                        );
                    }
                )}
            </ul>
        </>
    );
};

export default MyAccount;
