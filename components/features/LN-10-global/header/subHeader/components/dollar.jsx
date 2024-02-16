import React from 'react';
import { Link } from '@ln/contenidos-ui-link';
import { Text } from '@ln/contenidos-ui-text';

export const Dollar = ({ data }) => {
    if (data.length === 0) return <></>;
    return (
        <div className="dollar dollar-container --scroll-x pr-60">
            <ul className="inline-flex --bullet-list">
                {data.map(
                    (
                        {
                            id,
                            text,
                            title,
                            link,
                            venta,
                            callback,
                            dataEvent,
                            dataSection
                        },
                        i
                    ) => {
                        return (
                            <li className="w-max flex ai-center" key={i}>
                                <Link
                                    data-event={dataEvent}
                                    data-section={dataSection}
                                    href={link}
                                    onClick={callback}
                                    title={title}
                                    unstyled
                                    size="xs"
                                >
                                    {text}
                                    <Text id={id} weight="bold">
                                        {` $${venta}`}
                                    </Text>
                                </Link>
                            </li>
                        );
                    }
                )}
            </ul>
        </div>
    );
};
