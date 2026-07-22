import React from 'react';
import { Text } from '@ln/common-ui-text';

export function Epigraph({ credits, caption, className, ...r }) {
    if (!credits && !caption) return <></>;

    return (
        <figcaption className="flex ai-center flex-wrap gap-8 row-gap-4" {...r}>
            {credits && (
                <Text className="text-12 uppercase white-space-nowrap">
                    {credits}
                </Text>
            )}
            {caption && (
                <Text className="text-14 text-light-600">{caption}</Text>
            )}
        </figcaption>
    );
}

export default Epigraph;
