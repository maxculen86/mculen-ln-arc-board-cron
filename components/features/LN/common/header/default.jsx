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
import { Desplegable } from '../../../LN-10-global/desplegable/default';

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
            <div data-tw style={{ display: 'contents' }}>
                {isHome && <PreHeader />}
                <HeaderProvider
                    value={{ position, appearance, isHome, ...loginData }}
                >
                    <CommonHeader
                        className={wrapperHeaderVariants({
                            position,
                            appearance
                        })}
                        style={{
                            animation
                        }}
                    >
                        <MainHeader />
                        {/* {isHome && <SubHeader />} */}
                    </CommonHeader>
                    <div className="header-sentinel" />
                </HeaderProvider>
            </div>

            {/* TODO: Implementar DrawerSections con DS cuando se defina el diseño/producto. */}
            <Desplegable />
        </>
    );
}

export default Header;
