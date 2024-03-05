/* eslint-disable react/require-default-props */
import React from 'react';
import { useContent } from 'fusion:content';
import PropTypes from 'prop-types';
import { Dropdown } from '@ln/contenidos-ui-dropdown';
import { setDropdownData, toggleScroll } from './_helper';
import { useHeaderContext } from '../header/context';

export const Desplegable = ({ arcSite }) => {
    const { toggleDesplegable, showMenu } = useHeaderContext();

    const menuData = useContent({
        source: 'menuSource',
        query: {
            website: arcSite
        }
    });

    toggleScroll(showMenu);

    return (
        <div>
            <Dropdown
                data={setDropdownData(menuData) || []}
                callback={toggleDesplegable}
                className={showMenu ? '--dd-active' : ''}
            />
        </div>
    );
};

Desplegable.propTypes = {
    arcSite: PropTypes.string.isRequired
};
