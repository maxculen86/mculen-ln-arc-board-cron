import React from 'react';
import { useWindowSize } from '@ln/hooks';
import DrawerContainer from '../../../features/foodit-global/common/DrawerContainer/foodit';
import { DRAWER } from '../../../features/foodit-global/common/DrawerContainer/constants';
import FilterBox from './filterBox';

function DrawerBuscador({ toggleDrawer }) {
    const { width: viewportWidth } = useWindowSize();
    const isMobile = viewportWidth < 768;
    const position = isMobile ? 'left' : 'right';
    return (
        <DrawerContainer
            className="w-100"
            drawerId={DRAWER.BUSCADOR}
            title="Filtros"
            position={position}
        >
            <FilterBox toggleDrawer={toggleDrawer} />
        </DrawerContainer>
    );
}

export default DrawerBuscador;
