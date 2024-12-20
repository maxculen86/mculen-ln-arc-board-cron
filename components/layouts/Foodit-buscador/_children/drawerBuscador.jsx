import React from 'react';
import PropTypes from 'prop-types';
import { DrawerContainer } from '../../../features/foodit-global/common/DrawerContainer/foodit';
import { DRAWER } from '../../../features/foodit-global/common/DrawerContainer/constants';
import FilterBox from './filterBox';

function DrawerBuscador({ toggleDrawer }) {
    return (
        <DrawerContainer
            className="w-100"
            drawerId={DRAWER.BUSCADOR}
            title="Filtros"
            position="right"
        >
            <FilterBox toggleDrawer={toggleDrawer} />
        </DrawerContainer>
    );
}

DrawerBuscador.propTypes = {
    toggleDrawer: PropTypes.func.isRequired
};

export default DrawerBuscador;
