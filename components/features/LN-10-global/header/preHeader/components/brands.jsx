import React from 'react';
import { Link } from '@ln/contenidos-ui-link';
import { Icon } from '@ln/common-ui-icon';

export const Brands = ({ brands }) => {
    if (brands.lenght === 0) return <></>;
    return (
        <div className="brands-container flex ai-center pl-16 border border-left border-thin border-neutral-light-200 overflow-hidden relative">
            <nav className="brands flex ai-center --scroll-x pr-60">
                <ul className="tag-list inline-flex gap-28">
                    {brands.map(
                        (
                            {
                                title,
                                link,
                                dataEvent,
                                dataSection,
                                icon,
                                callback
                            },
                            i
                        ) => {
                            return (
                                <li
                                    className="w-max flex ai-center text-neutral-light-800"
                                    key={i}
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
                                        unstyled
                                    >
                                        <Icon size={20}>{icon}</Icon>
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
