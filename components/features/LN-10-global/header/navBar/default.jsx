import React from 'react';
import { useHeaderContext } from '../context';
import { Navbarmobile } from '@ln/contenidos-ui-navbarmobile';
import { getNavbarItems } from './_helper';
import useTermica from '../../../../private/common/hooks/useTermica';

import '../../../../../resources/packages/css/@ln/contenidos-ui-navbarmobile/index.css';
import '../../../../../resources/packages/css/@ln/common-ui-link/index.css';
import '../../../../../resources/packages/css/@ln/common-ui-icon/index.css';

export const NavBar = () => {
    const withBookmark = useTermica('bookmark_web');
    const { isHome, toggleDesplegable, userType } = useHeaderContext();
    const isUserSubscribed = userType === 'subscribed';
    const data = getNavbarItems(
        isHome,
        withBookmark,
        isUserSubscribed,
        toggleDesplegable
    );
    return <Navbarmobile data={data} className="--no-app" />;
};
