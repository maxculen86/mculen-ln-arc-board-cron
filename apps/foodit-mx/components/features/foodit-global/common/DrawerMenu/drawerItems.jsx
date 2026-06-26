import React from 'react';
import { Text } from '@ln/common-ui-text';
import { Itemcard } from '@ln/foodit-ui-itemcard';
import { DESCUBRIR_SECTIONS } from '../dataLayer/_helpers';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

export function DrawerItems({ href, title, dynamicLabel }) {
    return (
        <div>
            {href ? (
                <Itemcard
                    style={{ paddingTop: '16px' }}
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
                        (DESCUBRIR_SECTIONS.includes(dynamicLabel) &&
                            'descubrir') ||
                        'N/A'
                    }
                />
            ) : (
                <Text className="roboto-bold text-14 uppercase bg-positive p-8 -mt-8 block rounded-top-right-4 rounded-bottom-right-4">
                    {title}
                </Text>
            )}
        </div>
    );
}
