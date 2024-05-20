import React from 'react';
import { Link } from '@ln/contenidos-ui-link';
import { Text } from '@ln/contenidos-ui-text';

export const Dollar = ({ dollarData = [] }) => {
    if (dollarData.length === 0) return <></>;
    return (
        <div className="dollar dollar-container flex --scroll-x --degrade-scroll_max1279">
            <ul className="flex --bullet-list_4">
                {dollarData.map(
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
                        dollarIndex
                    ) => {
                        return (
                            <li
                                className="w-max flex ai-center"
                                key={dollarIndex}
                            >
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
