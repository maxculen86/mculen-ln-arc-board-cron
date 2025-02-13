import { Link } from '@ln/foodit-ui-link';
import { Icon } from '@ln/common-ui-icon';
import React from 'react';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

export function TagCategories({ mockLinks }) {
    if (mockLinks.length === 0) return null;

    return (
        <nav className="flex ai-end_md">
            <ul className="flex flex-wrap gap-8 mb-8_md">
                {mockLinks.map((link, i) => (
                    <li
                        key={link.href}
                        className="flex gap-8 flex ai-center ai-end_md"
                    >
                        {i !== 0 && (
                            <Icon size={16}>
                                <IconSprite name="bullet-nav" fill="#CCCCCC" />
                            </Icon>
                        )}
                        <Link
                            variant="secondary"
                            href={link.href}
                            title={link.title}
                            className="uppercase roboto-bold text-12"
                        >
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
