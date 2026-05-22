import React from 'react';
import { cx } from '@ln/ds-cva';

const baseClassname = 'font-primary text-display-sm';

function OpeningTitles({ h1Props, h2Props }) {
    if (!h1Props?.text && !h2Props?.text) return null;

    const h1ClassName = cx(
        baseClassname,
        'font-w-extrabold',
        h1Props?.className
    );
    const h2ClassName = cx(baseClassname, h2Props?.className);

    return (
        <div className="flex flex-col">
            {h1Props?.text && <h1 className={h1ClassName}>{h1Props.text}</h1>}
            {h2Props?.text && <h2 className={h2ClassName}>{h2Props.text}</h2>}
        </div>
    );
}

export default OpeningTitles;
