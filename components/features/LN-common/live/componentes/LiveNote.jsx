import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@ln/contenidos-ui-link';
import { Text } from '@ln/contenidos-ui-text';

function LiveNote({ children, title, url, timeSinceUpdate, ...r }) {
    return (
        <li className="flex ai-center">
            <article {...r}>
                <Link
                    href={url}
                    className="notes flex ai-center gap-4 mt-4 w-max"
                    title={title}
                >
                    <Text
                        font="prumo"
                        as="h4"
                        size="m"
                        weight="black"
                        className="text-neutral-light-800"
                    >
                        {children}
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
                </Link>
            </article>
        </li>
    );
}
LiveNote.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    url: PropTypes.string,
    timeSinceUpdate: PropTypes.string
};

LiveNote.defaultProps = {
    title: '',
    url: '',
    timeSinceUpdate: ''
};

export default LiveNote;
