import React from 'react';
import { cx } from '@ln/ds-cva';
import { useHeaderContext } from '../../../../context';
import AvatarComponent from '../../../../../../../ui/ln/avatar/default';
import { USER_TYPES } from '../../../../../utils/constants';

function Avatar() {
    const { userType, initials, userEmail } = useHeaderContext();

    const isSubscribed = userType === USER_TYPES.SUBSCRIBED;
    const backgroundClassName = cx(
        'border border-[#E5E5E5]',
        isSubscribed ? 'bg-neutral-999' : 'bg-neutral-100'
    );
    const textClassName = cx('font-bold', { 'text-[#FFC108]': isSubscribed });

    return (
        <div className="flex items-center gap-8">
            <AvatarComponent
                className={backgroundClassName}
                fallbackProps={{
                    children: initials || 'US',
                    className: textClassName
                }}
            />
            <div className="flex flex-col gap-4 max-w-115">
                <span className="text-body-sm font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                    {userEmail}
                </span>
                <span className="text-label-sm text-secondary-default overflow-hidden text-ellipsis whitespace-nowrap  text-start">
                    {isSubscribed
                        ? 'Suscriptor digital'
                        : 'Sin suscripción digital'}
                </span>
            </div>
        </div>
    );
}

export default Avatar;
