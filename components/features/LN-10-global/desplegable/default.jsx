/* eslint-disable react/require-default-props */
import React from 'react';
import { Dropdown } from '@ln/contenidos-ui-dropdown';
import { toggleScroll } from './_helper';
import { useHeaderContext } from '../header/context';
import { useAppContext } from 'fusion:context';
import { Search } from './search';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import menuData from './menuData.json';

export const Desplegable = () => {
    const { toggleDesplegable, showMenu } = useHeaderContext();
    const { contextPath, deployment } = useAppContext();

    const path = `${contextPath}/resources/images/la-nacion.webp`;
    const deploymentPath = deployment(path);

    toggleScroll(showMenu);

    return (
        <div>
            <Dropdown
                search={<Search />}
                logo={<Adaptableimage src={deploymentPath} width={164} />}
                data={menuData}
                callback={toggleDesplegable}
                className={showMenu ? '--dd-active' : ''}
            />
        </div>
    );
};
