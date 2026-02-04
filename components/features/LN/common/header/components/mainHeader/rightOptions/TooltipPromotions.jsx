import React, { useRef, useState } from 'react';
import { Popper } from '@ln/ds-common-popper';
import { cx } from '@ln/ds-cva';

function TooltipPromotions({
    children,
    content,
    defaultOpen = false,
    placement = 'bottom',
    ...props
}) {
    // TODO: componente sin definicion, por eso se uso directamente el popper, al definirse pasar al facade
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const tooltipContentRef = useRef(null);

    if (!content) return children;

    return (
        <Popper
            open={isOpen}
            onOpenChange={e => setIsOpen(e)}
            closeOnClickOutside={false}
            placement={placement}
            {...props}
        >
            <Popper.Trigger>{children}</Popper.Trigger>
            <Popper.Content
                className={cx(
                    'bg-[#272727] text-base-foreground p-8 rounded-4 text-12'
                )}
                ref={tooltipContentRef}
            >
                <div
                    className="absolute w-8 h-8 bg-[#272727] rotate-45 -top-4 left-1/2 -translate-x-1/2"
                    aria-hidden="true"
                />
                <span
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                        __html: content
                    }}
                />
            </Popper.Content>
        </Popper>
    );
}

export default TooltipPromotions;
