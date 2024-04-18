import React from 'react';
import SkeletonCard from '../Card/foodit';
import { Skeleton } from '@ln/common-ui-skeleton';

export const SkeletonResultdata = () => {
    const cards = [];
    for (let i = 0; i < 10; i++) {
        cards.push(
            <SkeletonCard className="col-span-4 col-span-4_md" isResultdata />
        );
    }
    return (
        <div className="flex flex-column gap-24">
            <div className="flex jc-between">
                <Skeleton
                    width={178}
                    height={60}
                    className="rounded-4 sm-only"
                />
                <Skeleton
                    width={413}
                    height={32}
                    className="rounded-4 sm-none"
                />
                <Skeleton
                    width={34}
                    height={34}
                    className="rounded-4 sm-only"
                />
                <Skeleton
                    width={42}
                    height={42}
                    className="rounded-4 md-only"
                />
            </div>
            <div className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32">
                {cards}
            </div>
        </div>
    );
};
