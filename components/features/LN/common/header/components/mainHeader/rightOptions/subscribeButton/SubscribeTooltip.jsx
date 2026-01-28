import React from 'react';
import TooltipPromotions from '../TooltipPromotions';

function SubscribeTooltip({
    children,
    termicaValues = {},
    isActiveTermicaSubscribe = false,
    isHome = false,
    ...props
}) {
    const { tooltip_text: tooltipText } = termicaValues;

    const shouldShowTooltip = Boolean(
        isActiveTermicaSubscribe && tooltipText && isHome
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

export default SubscribeTooltip;
