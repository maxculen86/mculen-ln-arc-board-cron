import React from 'react';
import { useAppContext } from 'fusion:context';
import { Header as CommonHeader } from '@ln/ds-common-header';
import { HeaderProvider } from './context';
import PreHeader from './components/preHeader/default';
import MainHeader from './components/mainHeader/default';
// import { SubHeader } from './components/subHeader/default';
import useHeader from './hooks/useHeader';

import useGetUserData from '../../../../private/common/auth/hooks/useGetUserData';
import { SUBSCRIBED_HELPER } from '../../../../private/common/auth/helper/loginHelper';
import { wrapperHeaderVariants } from './styles';

function Header() {
    const { layout, section, siteProperties } = useAppContext();
    const { layoutsName } = siteProperties || {};

    const isHome = layout === layoutsName.HomeLN10;

    const loginData = useGetUserData(SUBSCRIBED_HELPER.LN);
    const { position, appearance, animation } = useHeader({
        layout,
        section,
        layoutsName
    });

    return (
        <>
            {isHome && <PreHeader />}
            <HeaderProvider
                value={{ position, appearance, isHome, ...loginData }}
            >
                <CommonHeader
                    className={wrapperHeaderVariants({ position, appearance })}
                    style={{
                        animation
                    }}
                >
                    <MainHeader />
                    {/* {isHome && <SubHeader />} */}
                </CommonHeader>
                <div className="header-sentinel" />
            </HeaderProvider>
        </>
    );
}

export default Header;
