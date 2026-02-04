import React from 'react';
import TooltipPromotions from '../TooltipPromotions';

function UpsellingTooltip({
    children,
    tooltipText = '',
    isActiveTermicaUpselling = false,
    isHome = false,
    ...props
}) {
    const shouldShowTooltip = Boolean(
        isActiveTermicaUpselling && tooltipText && isHome
    );

    return (
        <TooltipPromotions
            defaultOpen={shouldShowTooltip}
            content={tooltipText}
            {...props}
        >
            {children}
        </TooltipPromotions>
    );
}

export default UpsellingTooltip;
