/* eslint-disable react/require-default-props */
import React from 'react';
import { Dropdown } from '@ln/contenidos-ui-dropdown';
import { toggleScroll } from './_helper';
import { useHeaderContext } from '../header/context';
import { Search } from './search';
import menuData from './menuData.json';

export const Desplegable = () => {
    const { toggleDesplegable, showMenu } = useHeaderContext();

    toggleScroll(showMenu);

    return (
        <div>
            <Dropdown
                search={<Search />}
                data={menuData}
                callback={toggleDesplegable}
                className={showMenu ? '--dd-active' : ''}
            />
        </div>
    );
};
