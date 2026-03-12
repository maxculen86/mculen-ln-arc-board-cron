import React from 'react';
import { Link } from '@ln/contenidos-ui-link';
import { Text } from '@ln/contenidos-ui-text';
import { targetUrlRedirect } from '../../../../chains/utils/targetUrlRedirect';

function LiveNote({
    children,
    title = '',
    url = '',
    timeSinceUpdate = '',
    ...r
}) {
    const Wrapper = url ? Link : 'div';
    const wrapperprops = url
        ? { href: url, title, target: targetUrlRedirect(url) }
        : {};

    return (
        <li className="flex ai-center">
            <article {...r}>
                <Wrapper
                    className="notes flex ai-center gap-4 mt-4 w-max"
                    {...wrapperprops}
                >
                    <Text
                        font="prumo"
                        as="h4"
                        size="m"
                        weight="black"
                        className="text-neutral-light-800"
                    >
                        {children || title}
                    </Text>
                    {timeSinceUpdate && (
                        <Text
                            className="time-since mb-2 text-danger-600"
                            weight="regular"
                            size="xs"
                        >
                            {timeSinceUpdate}
                        </Text>
                    )}
                </Wrapper>
            </article>
        </li>
    );
}

export default LiveNote;
