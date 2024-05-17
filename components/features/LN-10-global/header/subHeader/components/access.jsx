import React from 'react';
import { Link } from '@ln/contenidos-ui-link';

export const Access = ({ accessData = [] }) => {
    if (accessData.length === 0) return <></>;
    const lastChild = accessData.length - 1;
    return (
        <div className="access-container --tablet-none ">
            <ul className="access flex gap-8">
                {accessData.map(({ href, text, callback }, accessIndex) => {
                    const divider =
                        accessIndex !== lastChild ? (
                            <hr className="border-left-none" />
                        ) : (
                            <></>
                        );
                    return (
                        <div className="flex gap-8">
                            <li className="w-max" key={accessIndex}>
                                <Link
                                    className="flex ai-center"
                                    href={href}
                                    title={`Ir a ${text}`}
                                    text={text}
                                    size="xs"
                                    onClick={callback}
                                    unstyled
                                />
                            </li>
                            {divider}
                        </div>
                    );
                })}
            </ul>
        </div>
    );
};
