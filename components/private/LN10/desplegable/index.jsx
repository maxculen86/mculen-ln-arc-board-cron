/* eslint-disable react/require-default-props */
import React from 'react';
import { useContent } from 'fusion:content';
import PropTypes from 'prop-types';
import { Dropdown } from '@ln/contenidos-ui-dropdown';
import { setDropdownData, toggleScroll } from './_helper';

const Desplegable = ({ toggleDesplegable, arcSite, isActive = false }) => {
    const menuData = useContent({
        source: 'menuSource',
        query: {
            website: arcSite
        }
    });

    toggleScroll(isActive);

    return (
        <div>
            <Dropdown
                data={setDropdownData(menuData) || []}
                callback={toggleDesplegable}
                className={isActive ? '--dd-active' : ''}
            />
        </div>
    );
};

Desplegable.propTypes = {
    toggleDesplegable: PropTypes.func.isRequired,
    arcSite: PropTypes.string.isRequired,
    isActive: PropTypes.bool
};

export default Desplegable;
