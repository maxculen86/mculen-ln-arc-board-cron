import React from 'react';
import { Skeleton } from '@ln/common-ui-skeleton';

export function SkeletonRoof() {
    return (
        <div className="flex ai-center jc-between ai-end_md gap-24 mb-24">
            <Skeleton className="rounded-4 h-28 h-37_md w-240" />
            <div className="flex gap-8 ai-center">
                <Skeleton className="rounded-4 h-24 w-24 h-16_md w-51_md as-end_md" />
            </div>
        </div>
    );
}
