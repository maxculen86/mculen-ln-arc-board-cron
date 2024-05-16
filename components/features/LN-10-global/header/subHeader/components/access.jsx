import React from 'react';
import { Link } from '@ln/contenidos-ui-link';

export const Access = ({ data }) => {
    if (data.length === 0) return <></>;
    const lastChild = data.length - 1;
    return (
        <div className="access-container --tablet-none ">
            <ul className="access flex gap-8">
                {data.map(({ href, text, callback }, i) => {
                    const divider =
                        i !== lastChild ? (
                            <hr className="border-left-none" />
                        ) : (
                            <></>
                        );
                    return (
                        <div className="flex gap-8">
                            <li className="w-max" key={i}>
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
