import { Link } from '@ln/foodit-ui-link';
import { Icon } from '@ln/common-ui-icon';
import React from 'react';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

export function TagCategories({ tagLinks = [] }) {
    if (tagLinks.length <= 1) return null;

    return (
        <nav className="flex ai-end_md">
            <ul className="flex flex-wrap gap-8 gap-12_md">
                {tagLinks.map((link, i) => (
                    <li
                        key={link.href}
                        className="flex gap-8 flex ai-center ai-end_md"
                    >
                        <Link
                            variant="secondary"
                            href={link.href}
                            title={link.title}
                            className="uppercase roboto-bold text-12 border border-all_md border-thin rounded-4"
                        >
                            <span className="py-8_md px-16_md">
                                {link.title}
                            </span>
                        </Link>
                        {i < tagLinks.length - 1 && (
                            <Icon className="sm-only" size={16}>
                                <IconSprite name="bullet-nav" fill="#CCCCCC" />
                            </Icon>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
