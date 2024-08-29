import React from 'react';
import { Navbarmobile } from '@ln/contenidos-ui-navbarmobile';
import { useHeaderContext } from '../context';
import { getNavbarItems } from './_helper';

import '../../../../../resources/packages/css/@ln/contenidos-ui-navbarmobile/index.css';
import '../../../../../resources/packages/css/@ln/common-ui-link/index.css';

export const NavBar = () => {
    const { toggleDesplegable, userType } = useHeaderContext();
    return (
        <Navbarmobile
            data={getNavbarItems(toggleDesplegable, userType)}
            className="--no-app"
        />
    );
};
