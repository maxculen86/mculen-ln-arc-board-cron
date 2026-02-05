/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import { Dropdown } from '@ln/contenidos-ui-dropdown';
import { useAppContext } from 'fusion:context';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { toggleScroll } from './_helper';
import FirstSection from './firstSection';
import { menuData } from './menuData';
import { OBSERVABLE_EVENTS } from '../../LN/common/utils/constants';

export function Desplegable() {
    const [showMenu, setShowMenu] = useState(false);

    const { TOGGLE_DESPLEGABLE } = OBSERVABLE_EVENTS;

    const { contextPath, deployment } = useAppContext();

    const path = `${contextPath}/resources/images/la-nacion.webp`;
    const deploymentPath = deployment(path);

    useEffect(() => {
        const handleToggle = args => {
            if (args?.show !== undefined) {
                setShowMenu(args.show);
            } else {
                setShowMenu(prev => !prev);
            }
        };

        window?.LN?.observable?.subscribe(TOGGLE_DESPLEGABLE, handleToggle);
        return () => {
            window?.LN?.observable?.unsubscribe(
                TOGGLE_DESPLEGABLE,
                handleToggle
            );
        };
    }, []);

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
                callback={() =>
                    window?.LN?.observable?.publish(TOGGLE_DESPLEGABLE)
                }
                className={showMenu ? '--dd-active' : ''}
            />
        </div>
    );
}
