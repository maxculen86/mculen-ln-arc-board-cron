import React from 'react';
import { Link } from '@ln/contenidos-ui-link';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';

function Brands({ brandsData }) {
    if (brandsData?.length === 0) return null;

    return (
        <div className="brands-container flex ai-center overflow-hidden relative">
            <nav className="brands flex ai-center --scroll-x pr-60">
                <ul className="brands-list inline-flex gap-28">
                    {brandsData.map(
                        ({
                            title,
                            link,
                            dataEvent,
                            dataSection,
                            icon,
                            iconWidth,
                            callback
                        }) => {
                            const relTitle =
                                title === 'EN VIVO' ? 'LN+ EN VIVO' : title;

                            return (
                                <li
                                    className="w-max flex ai-center text-neutral-light-800"
                                    key={title}
                                >
                                    <Link
                                        className="flex gap-8 uppercase ai-center text-12"
                                        href={link}
                                        title={relTitle}
                                        data-event={dataEvent}
                                        data-section={dataSection}
                                        onClick={callback}
                                        target="_blank"
                                        unstyled
                                    >
                                        <Icon height={24}>
                                            <IconSprite
                                                name={icon}
                                                critical
                                                fill="#333333"
                                                width={iconWidth}
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
}

export default Brands;
