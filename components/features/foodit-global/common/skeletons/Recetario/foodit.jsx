import React, { useId } from 'react';
import { Skeleton } from '@ln/common-ui-skeleton';
import SkeletonCard from '../Card/foodit';

export function SkeletonRecetario() {
    return (
        <div className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32">
            <aside className="sm-none col-span-4_md">
                <Skeleton className="rounded-4" width="100%" height="100%" />
            </aside>
            <section className="col-span-8 col-span-12_lg min-h-344">
                <div className="mb-24">
                    <Skeleton height={24} width="200px" />
                </div>
                <div className="grid grid-cols-8 grid-cols-8_md grid-cols-12_lg gap-32">
                    {Array.from({ length: 8 }).map(() => (
                        <div key={useId()} className="col-span-8 col-span-4_md">
                            <SkeletonCard />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
