import React, { useId } from 'react';
import { Skeleton } from '@ln/common-ui-skeleton';

export function SkeletonShoppingList() {
    return (
        <section data-testid="skeleton-shopping-list">
            <div>
                <Skeleton className="rounded-4" width="256px" height="38px" />
                <div className="sm-none absolute top-100px right-0">
                    <Skeleton
                        className="rounded-4"
                        width="153px"
                        height="40px"
                    />
                </div>
            </div>
            <Skeleton className="mt-24 rounded-4" width="100%" height="478px" />
            {Array.from({ length: 5 }).map(() => (
                <Skeleton
                    key={useId()}
                    className="mt-24 rounded-4"
                    width="100%"
                    height="100px"
                />
            ))}
        </section>
    );
}
