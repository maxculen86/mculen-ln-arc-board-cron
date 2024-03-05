import React from 'react';
import { Link } from '@ln/contenidos-ui-link';
import { Icon } from '@ln/common-ui-icon';

export const Access = ({ data }) => {
    if (data.leght === 0) return <></>;
    return (
        <div className="access-container --tablet-none ">
            <ul className="access flex">
                {data.map(({ href, text, icon, callback }, i) => {
                    return (
                        <li className="w-max mr-16" key={i}>
                            <Link
                                className="flex ai-center"
                                href={href}
                                title={`Ir a ${text}`}
                                size="xs"
                                onClick={callback}
                                unstyled
                            >
                                <Icon size={20} className="mr-4">
                                    {icon}
                                </Icon>
                                {text}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
