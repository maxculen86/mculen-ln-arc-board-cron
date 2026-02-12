import React from 'react';
import { Navbarmobile } from '@ln/contenidos-ui-navbarmobile';
import { useHeaderContext } from '../context';
import { getNavbarItems } from './_helper';
import { OBSERVABLE_EVENTS } from '../../../LN/common/utils/constants';

import '../../../../../resources/packages/css/@ln/contenidos-ui-navbarmobile/index.css';
import '../../../../../resources/packages/css/@ln/common-ui-link/index.css';

export function NavBar() {
    const { userType } = useHeaderContext();

    const toggleDesplegable = () => {
        window?.LN?.observable?.publish(OBSERVABLE_EVENTS.TOGGLE_DESPLEGABLE);
    };

    return (
        <Navbarmobile
            data={getNavbarItems(toggleDesplegable, userType)}
            className="--no-app"
        />
    );
}
