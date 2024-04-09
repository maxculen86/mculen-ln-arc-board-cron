import React from 'react';
import { Itemcard } from '@ln/foodit-ui-itemcard';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';

export const MenuCategories = ({ data = [], fullWidth }) => {
    return (
        <div className="flex flex-column flex-row_lg">
            {data.map(({ title, items = [] }, i) => (
                <ul
                    className={fullWidth ? 'w-100' : 'w-202'}
                    key={`section-${i}`}
                >
                    {title && (
                        <li key={title.text}>
                            <Itemcard
                                type={title.href ? 'link' : 'text'}
                                href={title.href}
                                text={title.text}
                                level={1}
                                icon={title.icon}
                                fullWidth={fullWidth}
                                {...(title.href && {
                                    arrowIcon: <IconSprite name="arrow-right" />
                                })}
                                data-interaction="dataLayerInteraction"
                                data-event-data-layer="e_linkclick"
                                data-dynamic-category="header"
                                data-dynamic-label={title.text}
                                data-dynamic-action="N/A"
                            />
                        </li>
                    )}
                    {items.map(({ href, text }) => (
                        <li key={text}>
                            <Itemcard
                                type={href ? 'link' : 'text'}
                                href={href}
                                text={text}
                                level={2}
                                fullWidth={fullWidth}
                                icon={<IconSprite name="bullet-xs" />}
                                data-interaction="dataLayerInteraction"
                                data-event-data-layer="e_linkclick"
                                data-dynamic-category="header"
                                data-dynamic-label={
                                    (title && title.text) || 'N/A'
                                }
                                data-dynamic-action={text}
                            />
                        </li>
                    ))}
                </ul>
            ))}
        </div>
    );
};

export default MenuCategories;
