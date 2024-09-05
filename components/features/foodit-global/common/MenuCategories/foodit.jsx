import React from 'react';
import { Itemcard } from '@ln/foodit-ui-itemcard';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import {
    DESCUBRIR_SECTIONS,
    transformDataLayerString
} from '../dataLayer/_helpers';

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
                                data-test-id={`header-link-${title?.text}`}
                                data-interaction="dataLayerInteraction"
                                data-event="e_linkclick"
                                data-category="header"
                                data-label={title.text}
                                data-action="N/A"
                            />
                        </li>
                    )}
                    {items.map(({ href, text }) => {
                        const dataLayerText = transformDataLayerString(text);

                        const label = DESCUBRIR_SECTIONS.includes(dataLayerText)
                            ? 'descubrir'
                            : title?.text || 'N/A';

                        return (
                            <li key={text}>
                                <Itemcard
                                    type={href ? 'link' : 'text'}
                                    href={href}
                                    text={text}
                                    level={2}
                                    fullWidth={fullWidth}
                                    icon={<IconSprite name="bullet-xs" />}
                                    data-interaction="dataLayerInteraction"
                                    data-event="e_linkclick"
                                    data-category="header"
                                    data-label={label}
                                    data-action={dataLayerText}
                                    data-test-id={`header-link-${text}`}
                                />
                            </li>
                        );
                    })}
                </ul>
            ))}
        </div>
    );
};

export default MenuCategories;
