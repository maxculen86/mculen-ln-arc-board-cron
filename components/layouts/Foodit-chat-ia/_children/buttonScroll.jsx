import React from 'react';
import { Button } from '@ln/ds-common-button';
import { cx } from '@ln/ds-cva';
import Icon from '../../../features/ui/foodit/icon/default';
import { useViewportDirection } from './hooks/helpers';

export function ButtonScroll({ composerSentinelRef }) {
    const composerPos = useViewportDirection(composerSentinelRef, {
        root: null,
        threshold: 0
    });

    const showBottomButton = composerPos === 'below';

    const _classNameButton = cx(
        'fixed bottom-16 left-0 right-0 z-[1000] flex justify-center',
        'transition-all duration-300 ease-out',
        showBottomButton
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8 pointer-events-none'
    );
    return (
        <div className={_classNameButton}>
            <Button
                isIconOnly
                variant="outline"
                className="rounded-full bg-white-default border border-secondary-positive"
                onClick={() =>
                    composerSentinelRef.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'end'
                    })
                }
            >
                <Icon
                    size={20}
                    className="text-secondary-positive"
                    name="arrow-down"
                />
            </Button>
        </div>
    );
}
