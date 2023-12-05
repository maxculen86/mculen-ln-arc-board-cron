import React from 'react';
import DrawerContainer from '../DrawerContainer/foodit';
import MenuCategories from '../MenuCategories/foodit';
import { menuCategories } from '../utils/menuCategories';
import { Text } from '@ln/common-ui-text';

const DrawerMenu = () => {
    // TODO: contenido de menú
    const sections = menuCategories ?? [];

    if (!sections.length) return <></>;

    return (
        <DrawerContainer
            drawerId="drawer-menu"
            position="left"
            bodyClassName="pr-16"
        >
            {sections.map(({ title, data }) => (
                <div key={title}>
                    <Text className="roboto-bold text-14 uppercase bg-background-positive p-8 block rounded-top-right-4 rounded-bottom-right-4">
                        {title}
                    </Text>
                    <MenuCategories data={data} fullWidth />
                </div>
            ))}
        </DrawerContainer>
    );
};

export default DrawerMenu;
