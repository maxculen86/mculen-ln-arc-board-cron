import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@ln/contenidos-ui-link';

export function Access({ accessData = [] }) {
    if (accessData.length === 0) return null;

    const lastChild = accessData.length - 1;
    return (
        <div className="access-container --tablet-none ">
            <ul className="access flex gap-8">
                {accessData.map(({ href, text, callback }, accessIndex) => {
                    const divider =
                        accessIndex !== lastChild ? (
                            <hr className="vertical" />
                        ) : null;
                    return (
                        <div className="flex gap-8">
                            <li className="w-max" key={text}>
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
}

Access.propTypes = {
    accessData: PropTypes.arrayOf(
        PropTypes.shape({
            href: PropTypes.string,
            text: PropTypes.string,
            callback: PropTypes.func
        })
    ).isRequired
};
