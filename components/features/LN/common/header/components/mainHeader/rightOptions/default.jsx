import React, { useEffect, useState } from 'react';
import SubscribeButton from './subscribeButton/default';
import MenuUser from './menuUser/default';
import BellButton from './bellButton/default';
import LoginButton from './LoginButton';
import OpenInApp from './OpenInApp';
import UpsellingButton from './upsellingButton/default';
import { useHeaderContext } from '../../../context';

function RightOptions() {
    const [loadingData, setLoadingData] = useState(true);
    const { loading, isHome } = useHeaderContext();

    useEffect(() => {
        setLoadingData(loading);
    }, []);

    if (loadingData) return null;
    return (
        <div className="flex gap-16 items-center">
            <OpenInApp />
            <BellButton />
            <LoginButton />
            <UpsellingButton isHome={isHome} />
            <MenuUser />
            <SubscribeButton isHome={isHome} />
        </div>
    );
}

export default RightOptions;
