import React from 'react';
import { SignInButton } from './signInButton';
import { MenuUser } from './menuUser';
import { SubscribeButton } from './subscribeButton';
import { UpsellingButton } from './upsellingButton';
import BellButton from './bellButton';

export const RightOptions = ({ userType }) => {
    return (
        <>
            <BellButton />
            {userType !== 'loading' && (
                <>
                    <UpsellingButton />
                    <MenuUser />
                    <SignInButton />
                    <SubscribeButton />
                </>
            )}
        </>
    );
};

export default RightOptions;
