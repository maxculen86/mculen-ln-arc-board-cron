import React, { useEffect, useState } from 'react';
import Tooltip from '../../../../../../ui/ln/tooltip/default';
import { useHeaderContext } from '../../../context';

function TooltipPromotions({
    children,
    content,
    defaultOpen = false,
    placement = 'bottom',
    ...props
}) {
    const { isSentinelInView = true, isHome = false } = useHeaderContext();
    const headerChangedColor = !isSentinelInView;
    const [isOpen, setIsOpen] = useState(defaultOpen);

    useEffect(() => {
        if (headerChangedColor) setIsOpen(false);
    }, [headerChangedColor]);

    if (!content || !isHome) return children;

    return (
        <Tooltip
            open={isOpen}
            onOpenChange={setIsOpen}
            closeOnClickOutside={false}
            placement={placement}
            strategy="fixed"
            {...props}
        >
            <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
            <Tooltip.Content color="black">
                <span
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </Tooltip.Content>
        </Tooltip>
    );
}

export default TooltipPromotions;
