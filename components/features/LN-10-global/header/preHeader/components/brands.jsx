import React from 'react';
import { Link } from '@ln/contenidos-ui-link';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';

export const Brands = ({ brandsData = [] }) => {
    if (brandsData.length === 0) return <></>;
    return (
        <div className="brands-container flex ai-center pl-16 border border-left border-thin border-neutral-light-200 overflow-hidden relative">
            <nav className="brands flex ai-center --scroll-x pr-60">
                <ul className="tag-list inline-flex gap-28">
                    {brandsData.map(
                        (
                            {
                                title,
                                link,
                                dataEvent,
                                dataSection,
                                icon,
                                callback
                            },
                            brandIndex
                        ) => {
                            const relTitle =
                                title === 'EN VIVO' ? 'LN+ EN VIVO' : '';

                            return (
                                <li
                                    className="w-max flex ai-center text-neutral-light-800"
                                    key={brandIndex}
                                >
                                    <Link
                                        className="--font-bold flex gap-8 uppercase ai-center"
                                        size="xs"
                                        href={link}
                                        title={title}
                                        data-event={dataEvent}
                                        data-section={dataSection}
                                        onClick={callback}
                                        target="_blank"
                                        rel={relTitle}
                                        unstyled
                                    >
                                        <Icon size={20}>
                                            <IconSprite
                                                name={icon}
                                                critical
                                                fill="#333333"
                                            />
                                        </Icon>
                                        {title}
                                    </Link>
                                </li>
                            );
                        }
                    )}
                </ul>
            </nav>
        </div>
    );
};
