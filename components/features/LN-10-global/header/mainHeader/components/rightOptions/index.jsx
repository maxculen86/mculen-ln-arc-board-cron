import React, { useEffect, useState } from 'react';
import { SignInButton } from './signInButton';
import { MenuUser } from './menuUser';
import { SubscribeButton } from './subscribeButton';
import { UpsellingButton } from './upsellingButton';
import { useHeaderContext } from '../../../context';

export const RightOptions = () => {
    const [loadingData, setLoadingData] = useState(true);
    const { loading } = useHeaderContext();
    useEffect(() => {
        setLoadingData(loading);
    }, []);

    if (loadingData) return <></>;
    return (
        <>
            {/* <BellButton /> */}
            <UpsellingButton />
            <MenuUser />
            <SignInButton />
            <SubscribeButton />
        </>
    );
};
