import React from 'react';
import { Text } from '@ln/contenidos-ui-text';
import PropTypes from 'prop-types';

function LinkedCardDescription({ children }) {
    return (
        <Text font="georgia" className="text-14 text-16_md text-center mb-16">
            {children}
        </Text>
    );
}

LinkedCardDescription.propTypes = {
    children: PropTypes.node.isRequired
};

export default LinkedCardDescription;
