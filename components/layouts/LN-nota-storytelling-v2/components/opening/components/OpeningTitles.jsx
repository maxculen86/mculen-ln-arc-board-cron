import React from 'react';
import { cx } from '@ln/ds-cva';

const defaultBaseClassname = 'font-primary text-display-md';

function OpeningTitles({ h1Props, h2Props, baseClassName }) {
    if (!h1Props?.text && !h2Props?.text) return null;

    const base = baseClassName || defaultBaseClassname;
    const h1ClassName = cx(base, 'font-w-extrabold', h1Props?.className);
    const h2ClassName = cx(base, h2Props?.className);

    return (
        <div className="flex flex-col">
            {h1Props?.text && <h1 className={h1ClassName}>{h1Props.text}</h1>}
            {h2Props?.text && <h2 className={h2ClassName}>{h2Props.text}</h2>}
        </div>
    );
}

export default OpeningTitles;
