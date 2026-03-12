import React from 'react';

import '../../../resources/dist/css/ln/modules/mod-figcaption.css';
import { cx } from '@ln/cva';

function ComFigcaption({ children, className = '' }) {
    if (!children) return null;
    const _className = cx(className, 'mod-figcaption');
    return <figcaption className={_className}>{children}</figcaption>;
}

export default ComFigcaption;
