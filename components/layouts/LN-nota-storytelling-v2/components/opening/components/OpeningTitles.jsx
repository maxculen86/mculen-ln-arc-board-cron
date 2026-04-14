import React from 'react';
import { cx } from '@ln/ds-cva';

function OpeningTitles({ h1Props, h2Props }) {
    if (!h1Props?.text && !h2Props?.text) return null;

    const h1ClassName = cx(
        'prumo prumo-extra text-white text-display-md',
        h1Props?.className
    );
    const h2ClassName = cx(
        'prumo text-white text-display-md',
        h2Props?.className
    );

    return (
        <>
            {h1Props?.text && <h1 className={h1ClassName}>{h1Props.text}</h1>}
            {h2Props?.text && <h2 className={h2ClassName}>{h2Props.text}</h2>}
        </>
    );
}

export default OpeningTitles;
