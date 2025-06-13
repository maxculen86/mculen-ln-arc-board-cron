import React, { useId } from 'react';
import { Skeleton } from '@ln/common-ui-skeleton';

export function SkeletonMenuSemanal() {
    return (
        <div className="w-100">
            <section className="flex flex-column gap-24">
                <Skeleton className="rounded-4" width="100%" height="30px" />
                <Skeleton className="rounded-4" width="100%" height="288px" />
                {Array.from({ length: 2 }).map(() => (
                    <Skeleton
                        key={useId()}
                        className="rounded-4"
                        width="100%"
                        height="62px"
                    />
                ))}
            </section>
        </div>
    );
}
