import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Link } from '@ln/contenidos-ui-link';
import IconSprite from '../../features/private-global/common/iconSprite/IconSprite';

import '../../../resources/dist/css/ln/components/com-unordered.css';

const list = [
    'twitter',
    'facebook',
    'youtube',
    'instagram',
    'linkedin',
    'rss',
    'medium',
    'pinterest',
    'soundcloud',
    'snapchat',
    'whatsapp',
    'tumblr'
];

function ListSocialIcons({ data }) {
    const listItem = list.map((item, index) => {
        if (!data[item]) return null;
        const linkSocialNetwork =
            item === 'twitter' ? `https://x.com/${data[item]}` : data[item];

        const itemText = item === 'twitter' ? 'x' : item;
        return (
            <li className="flex ai-center" key={item}>
                {index > 0 && (
                    <Icon size={16} className="ml-4 mr-4">
                        <IconSprite name="bulletFilled" fill="#ccc" />
                    </Icon>
                )}
                <Link
                    href={linkSocialNetwork}
                    target="_blank"
                    className="gap-4 inline-flex ai-center font-bold"
                    title={`Ir a ${itemText}`}
                >
                    <Icon size={32}>
                        <IconSprite name={item} fill="#333333" />
                    </Icon>
                    {itemText}
                </Link>
            </li>
        );
    });

    return (
        <div className="relative overflow-hidden w-100">
            <ul className="flex flex-wrap_lg --scroll-x --degrade-scroll_max1279 pr-60">
                {listItem}
            </ul>
        </div>
    );
}

export default ListSocialIcons;
