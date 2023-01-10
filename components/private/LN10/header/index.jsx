import React from 'react';
import { Header } from '@ln/contenidos-ui-header';

import SubHeader from '../subHeader';
import MainHeader from '../mainHeader';

import '../../../../resources/packages/css/@ln/contenidos-ui-header/index.css';
import '../../../../resources/packages/css/@ln/common-ui-button/index.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-button/index.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-text/index.css';
import '../../../../resources/packages/css/@ln/common-ui-icon/index.css';

import { isLoggedIn, isSubscribed } from '../../LN/common/utils/contextHelper';
import { setUserType } from './_helper';

const HeaderLN = () => {
    const isUserLoggedIn = isLoggedIn();
    const isUserSubscribed = isSubscribed();

    const userType = setUserType(isUserLoggedIn, isUserSubscribed);

    return (
        <Header userType={userType}>
            <MainHeader userType={userType} />
            <SubHeader />
        </Header>
    );
};

export default HeaderLN;
