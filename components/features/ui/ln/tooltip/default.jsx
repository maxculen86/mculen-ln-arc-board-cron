import React, { useEffect } from 'react';
import { Tooltip as CommonTooltip } from '@ln/ds-common-tooltip';

/**
 * @typedef {import('@ln/ds-common-tooltip').TooltipRootProps} TooltipRootProps
 */

// TODO: quitar TailwindScope (customWrapper) al finalizar la migración data-tw.
function TailwindScope({ children, show, onExitComplete }) {
    useEffect(() => {
        if (!show) onExitComplete?.();
    }, [show, onExitComplete]);

    return (
        <div data-tw style={{ display: 'contents' }}>
            {children}
        </div>
    );
}

/**
 * @param {TooltipRootProps} props
 */
function Tooltip({ ...props }) {
    return <CommonTooltip {...props} />;
}

const TooltipContent = React.forwardRef(
    ({ customWrapper = TailwindScope, ...props }, ref) => (
        <CommonTooltip.Content
            ref={ref}
            customWrapper={customWrapper}
            {...props}
        />
    )
);

TooltipContent.displayName = 'Tooltip.Content';

export default Tooltip;

Tooltip.Trigger = CommonTooltip.Trigger;
Tooltip.Content = TooltipContent;
