/* eslint-disable react/require-default-props */
import React from 'react';
import { Dropdown } from '@ln/contenidos-ui-dropdown';
import { useAppContext } from 'fusion:context';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { toggleScroll } from './_helper';
import { useHeaderContext } from '../header/context';
import FirstSection from './firstSection';
import { menuData } from './menuData';

export function Desplegable() {
    const { toggleDesplegable, showMenu } = useHeaderContext();
    const { contextPath, deployment } = useAppContext();

    const path = `${contextPath}/resources/images/la-nacion.webp`;
    const deploymentPath = deployment(path);

    toggleScroll(showMenu);

    return (
        <div>
            <Dropdown
                firstSection={<FirstSection />}
                logo={
                    <Adaptableimage
                        src={deploymentPath}
                        className="h-100 w-100"
                        alt="LA NACION"
                    />
                }
                data={menuData}
                callback={toggleDesplegable}
                className={showMenu ? '--dd-active' : ''}
            />
        </div>
    );
}
