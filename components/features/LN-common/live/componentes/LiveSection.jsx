import React from 'react';
import { cx } from '@ln/cva';
import { sectionVariants } from '../styles/sectionStyle';

function LiveSection({ children, section, className = '', ...r }) {
    const sectionClassName = cx(sectionVariants({ section }), className);

    return (
        <div className={sectionClassName} {...r}>
            {children}
        </div>
    );
}

export default LiveSection;
