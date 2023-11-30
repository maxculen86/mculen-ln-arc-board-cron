import React from 'react';
import { Itemcard } from '@ln/foodit-ui-itemcard';

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
                            />
                        </li>
                    ))}
                </ul>
            ))}
        </div>
    );
};

export default MenuCategories;
