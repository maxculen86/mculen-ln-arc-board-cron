import { Link } from '@ln/contenidos-ui-link';
import { Text } from '@ln/contenidos-ui-text';
import React from 'react';

export const DollarItem = ({
    text,
    title,
    venta,
    link,
    id,
    callback,
    dataEvent,
    dataSection,
    ...r
}) => {
    if (!text || !venta) return <></>;
    const Wrapper = link ? Link : 'span';

    return (
        <li className="w-max flex ai-center" {...r}>
            <Wrapper
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
            </Wrapper>
        </li>
    );
};
