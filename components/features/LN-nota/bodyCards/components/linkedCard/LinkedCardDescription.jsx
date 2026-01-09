import React from 'react';
import { Text } from '@ln/contenidos-ui-text';

function LinkedCardDescription({ children }) {
    return (
        <Text className="text-18 prumo prumo-slab prumo-light leading-130 text-20_md">
            {children}
        </Text>
    );
}

export default LinkedCardDescription;
