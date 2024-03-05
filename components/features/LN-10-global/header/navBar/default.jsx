import React from 'react';
import { Navbarmobile } from '@ln/contenidos-ui-navbarmobile';
import { useGetNavBarItems } from './useGetNavBarItems';

import '../../../../../resources/packages/css/@ln/contenidos-ui-navbarmobile/index.css';
import '../../../../../resources/packages/css/@ln/common-ui-link/index.css';
import '../../../../../resources/packages/css/@ln/common-ui-icon/index.css';

export const NavBar = () => {
    const { data = [] } = useGetNavBarItems();
    return <Navbarmobile data={data} className="--no-app" />;
};
