import React from 'react';
import PropTypes from 'fusion:prop-types';
import { Text } from '@ln/common-ui-text';
import { Itemcard } from '@ln/foodit-ui-itemcard';
import DrawerContainer from '../DrawerContainer/foodit';
import MenuCategories from '../MenuCategories/foodit';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import removeAccents from '../../../../private/common/utils/removeAccents';
import { DESCUBRIR_SECTIONS } from '../dataLayer/_helpers';
import { DRAWER } from '../DrawerContainer/constants';

function DrawerMenu({ categories = [] }) {
    if (!categories.length) return null;

    return (
        <DrawerContainer
            drawerId={DRAWER.MENU}
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
                                data-test-id={`header-menu-${title}`}
                                data-interaction="dataLayerInteraction"
                                data-event="e_linkclick"
                                data-category="header"
                                data-label={dynamicLabel}
                                data-action={
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
}

DrawerMenu.propTypes = {
    categories: PropTypes.array
};

DrawerMenu.defaultProps = {
    categories: []
};

export default DrawerMenu;
