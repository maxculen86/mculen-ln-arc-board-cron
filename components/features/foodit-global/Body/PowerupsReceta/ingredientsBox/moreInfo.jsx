import React from 'react';
import { Link } from '@ln/foodit-ui-link';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import { moreInfoElements } from './_helper';

export const MoreInfo = () => {
    return (
        <ul className="flex flex-column gap-16">
            {moreInfoElements.map(({ text, url, iconName }) => {
                return (
                    <li key={text}>
                        <Link
                            variant="secondary"
                            uppercase
                            href={url}
                            className="text-12"
                            title={`Ir a ${text}`}
                        >
                            <Icon size={16}>
                                <IconSprite name={iconName} />
                            </Icon>
                            {text}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};
