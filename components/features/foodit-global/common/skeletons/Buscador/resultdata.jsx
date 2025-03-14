import React from 'react';
import { Skeleton } from '@ln/common-ui-skeleton';
import SkeletonCard from '../Card/foodit';

export function SkeletonResultdata() {
    const cards = [];
    for (let i = 0; i < 10; i += 1) {
        cards.push(
            <SkeletonCard className="col-span-4 col-span-4_md" isResultdata />
        );
    }
    return (
        <div data-testid="skeleton-loader" className="flex flex-column gap-24">
            <div className="flex jc-between">
                <div className="flex flex-column gap-24 sm-only">
                    <Skeleton width={178} height={60} className="rounded-4" />
                    <Skeleton width={328} height={16} className="rounded-4" />
                </div>
                <div className="flex ai-center w-100 jc-between gap-24">
                    <Skeleton
                        width={413}
                        height={32}
                        className="rounded-4 sm-none"
                    />
                    <Skeleton
                        width={300}
                        height={16}
                        className="rounded-4 md-only"
                    />
                    <Skeleton
                        width={209}
                        height={16}
                        className="rounded-4 lg-only"
                    />
                </div>
            </div>
            <div className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32">
                {cards}
            </div>
        </div>
    );
}
