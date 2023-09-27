import React, { useState, useEffect } from 'react';
import { createHeaderObserver } from '../utils/intersectionObserver';
import { Header, MainHeader, Search } from '@ln/foodit-ui-header';
import { useAppContext } from 'fusion:context';
import siteProperties from '../../../../../properties/sites/foodit';
import TopNavigationBar from './components/TopNavigationBar';
import RightOptions from './components/RightOptions';
import ExtraOptions from './components/ExtraOptions';

const HeaderFoodit = ({ isSticky = false, ...r }) => {
    const [sticky, setSticky] = useState(isSticky);
    const { layout } = useAppContext();
    const { layoutsName = {} } = siteProperties;

    //TODO: validar tipos de usuario 'logged' | 'unlogged' | 'subscribed';
    const userType = 'subscribed';

    // TODO: obtener data de usuario
    const userData = {
        userType,
        initialsClassName:
            userType === 'subscribed' ? 'bg-primary-positive' : 'bg-light-600',
        email: 'lbarandiaran@lanacion.com',
        initials: 'lb',
        suscription:
            userType === 'subscribed' ? 'Suscriptor digital' : 'Sin suscripción'
    };
    const { email, initials, initialsClassName, suscription } = userData;

    const isHome = layout === layoutsName.FooditHome;

    useEffect(() => {
        createHeaderObserver(setSticky);
        return () => createHeaderObserver(setSticky, true);
    }, []);

    const classNameSubHeader = sticky
        ? 'container lg-none py-16 bg-light-1'
        : 'container py-16 py-24_lg';

    return (
        <Header sticky={sticky} {...r}>
            <MainHeader className="foodit-main-header">
                <MainHeader.Logo />
                <MainHeader.Left>
                    {sticky ? <Search /> : <TopNavigationBar />}
                    {userType === 'subscribed' && <ExtraOptions />}
                </MainHeader.Left>
                <MainHeader.Right>
                    <RightOptions
                        userType={userType}
                        email={email}
                        initials={initials}
                        initialsClassName={initialsClassName}
                        suscription={suscription}
                    />
                </MainHeader.Right>
            </MainHeader>
            {isHome && <Search className={classNameSubHeader} />}
        </Header>
    );
};

export default HeaderFoodit;
