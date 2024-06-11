import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Link } from '@ln/foodit-ui-link';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';

export const SocialNetwork = ({ href, icon, name }) => {
    return (
        <Link
            variant="secondary"
            href={href}
            target="_blank"
            title={`Ir a ${name}`}
        >
            <Icon size={24}>
                <IconSprite name={icon} />
            </Icon>
            <span className="sm-none text-12 uppercase">{name}</span>
        </Link>
    );
};
