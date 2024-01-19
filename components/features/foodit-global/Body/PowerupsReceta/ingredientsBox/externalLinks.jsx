import React from 'react';
import { Link } from '@ln/foodit-ui-link';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../../../features/private-global/common/iconSprite/IconSprite';

export const ExternalLinks = props => {
    const { items = [] } = props || {};
    if (items.legth) return <></>;
    return (
        <ul className="flex flex-column gap-16">
            {items.map(({ text, url }, i) => {
                return (
                    <li key={text}>
                        <Link
                            variant="secondary"
                            uppercase
                            href={url}
                            className="text-12"
                        >
                            <Icon size={16}>
                                <IconSprite name="cart" critical />
                            </Icon>
                            {text}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default ExternalLinks;
