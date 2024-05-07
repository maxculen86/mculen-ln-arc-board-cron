import React from 'react';
import DrawerContainer from '../DrawerContainer/foodit';
import MenuCategories from '../MenuCategories/foodit';
import { Text } from '@ln/common-ui-text';
import { Itemcard } from '@ln/foodit-ui-itemcard';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import removeAccents from '../../../../private/common/utils/removeAccents';
import { DESCUBRIR_SECTIONS } from '../dataLayer/_helpers';

const DrawerMenu = ({ categories = [] }) => {
    if (!categories.length) return <></>;

    return (
        <DrawerContainer
            drawerId="drawer-menu"
            position="left"
            bodyClassName="pr-16"
        >
            {categories.map(({ title = '', data, href }) => {
                const dynamicLabel = removeAccents(title)
                    .replace(/ /g, '_')
                    .toLowerCase();

                return (
                    <div key={title}>
                        {href ? (
                            <Itemcard
                                type="link"
                                href={href}
                                text={title}
                                level={1}
                                fullWidth
                                arrowIcon={<IconSprite name="arrow-right" />}
                                data-interaction="dataLayerInteraction"
                                data-event-data-layer="e_linkclick"
                                data-dynamic-category="header"
                                data-dynamic-label={dynamicLabel}
                                data-dynamic-action={
                                    (DESCUBRIR_SECTIONS.includes(
                                        dynamicLabel
                                    ) &&
                                        'descubrir') ||
                                    'N/A'
                                }
                            />
                        ) : (
                            <Text className="roboto-bold text-14 uppercase bg-positive p-8 block rounded-top-right-4 rounded-bottom-right-4">
                                {title}
                            </Text>
                        )}
                        <MenuCategories data={data} fullWidth />
                    </div>
                );
            })}
        </DrawerContainer>
    );
};

export default DrawerMenu;
