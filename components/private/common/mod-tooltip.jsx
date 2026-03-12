import React, { useEffect } from 'react';
import ComText from './text';

import '../../../resources/dist/css/ln/modules/mod-tooltip.css';

function ModTooltip({ label, className = '', handleTimeout = null }) {
    useEffect(() => {
        const hideTimeout = handleTimeout
            ? setTimeout(() => {
                  handleTimeout();
              }, 2750)
            : null;
        return () => clearTimeout(hideTimeout);
    }, [handleTimeout]);

    const classCondition = className ? ` --${className}` : '';
    return (
        <div className={`mod-tooltip${classCondition}`}>
            <ComText size="--sixxs">{label}</ComText>
        </div>
    );
}

export default ModTooltip;
