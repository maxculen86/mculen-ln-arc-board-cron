import React from 'react';
import { cx } from '@ln/ds-cva';
import { useHeaderContext } from '../../../../context';
import AvatarComponent from '../../../../../../../ui/ln/avatar/default';
import { USER_TYPES } from '../../../../../utils/constants';

function Avatar() {
    const { userType, initials, userEmail } = useHeaderContext();

    const isSubscribed = userType === USER_TYPES.SUBSCRIBED;
    const backgroundClassName = cx(
        'border border-muted',
        isSubscribed ? 'bg-highlight-foreground' : 'bg-neutral-100'
    );
    const textClassName = cx('font-bold', {
        'text-highlight-default': isSubscribed
    });

    return (
        <div className="flex items-center gap-8">
            <AvatarComponent
                className={backgroundClassName}
                fallbackProps={{
                    children: initials || 'US',
                    className: textClassName
                }}
            />
            <div className="flex flex-col gap-4 max-w-115 text-label-sm ">
                <span className="text-base-default font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                    {userEmail}
                </span>
                <span className="text-base-light overflow-hidden text-ellipsis whitespace-nowrap text-start">
                    {isSubscribed ? 'Suscripción digital' : 'Sin suscripción'}
                </span>
            </div>
        </div>
    );
}

export default Avatar;
