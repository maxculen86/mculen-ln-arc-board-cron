import React from 'react';
import { useHeaderContext } from '../../../../context';
import AvatarComponent from '../../../../../../../ui/ln/avatar/default';
import { USER_TYPES } from '../../../../../utils/constants';

function Avatar() {
    const { userType, initials, userEmail } = useHeaderContext();

    return (
        <div className="flex items-center gap-8">
            <AvatarComponent
                color="muted"
                className="bg-neutral-100"
                fallbackProps={{
                    children: initials || 'US',
                    className: 'font-bold'
                }}
            />
            <div className="flex flex-col gap-4 max-w-115">
                <span className="text-body-sm font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                    {userEmail}
                </span>
                <span className="text-label-sm text-secondary-default overflow-hidden text-ellipsis whitespace-nowrap  text-start">
                    {userType === USER_TYPES.SUBSCRIBED
                        ? 'Suscriptor digital'
                        : 'Sin suscripción digital'}
                </span>
            </div>
        </div>
    );
}

export default Avatar;
