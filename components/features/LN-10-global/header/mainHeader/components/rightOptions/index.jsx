import React, { useEffect, useState } from 'react';
import { SignInButton } from './signInButton';
import { MenuUser } from './menuUser';
import { SubscribeButton } from './subscribeButton';
import { UpsellingButton } from './upsellingButton';
import { useHeaderContext } from '../../../context';
import BellButton from './bellButton';
import { OpenInApp } from './openInApp';

export function RightOptions() {
    const [loadingData, setLoadingData] = useState(true);

    const { loading } = useHeaderContext();
    useEffect(() => {
        setLoadingData(loading);
    }, []);

    if (loadingData) return null;
    return (
        <>
            <OpenInApp />
            <BellButton />
            <UpsellingButton />
            <MenuUser />
            <SubscribeButton />
            <SignInButton />
        </>
    );
}

export default RightOptions;
