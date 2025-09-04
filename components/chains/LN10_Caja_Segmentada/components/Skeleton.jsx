/* eslint-disable react/prop-types */
import React from 'react';
import { Bngrid } from '@ln/contenidos-ui-bngrid';
import { Skeleton } from '@ln/common-ui-skeleton';

function SkeletonCard() {
    return (
        <article className="flex flex-column gap-12" aria-busy="true">
            <Skeleton className="w-100 ratio-3-2 rounded-4" />
            <Skeleton className="w-100 rounded-4" height={32} />
            <Skeleton className="w-100 rounded-4 mb-8" height={16} />
        </article>
    );
}

function SkeletonCustomNode() {
    return (
        <article className="flex flex-column gap-8 as-article" aria-busy="true">
            <div className="flex gap-8">
                <Skeleton width={16} height={16} className="rounded-circle" />
                <Skeleton height={16} width={100} />
            </div>
            <div className="flex pl-24 flex-column gap-8 mb-8">
                <Skeleton width={115} height={16} />
                <Skeleton width={135} height={16} />
                <Skeleton width={100} height={16} />
            </div>
            <div className="flex gap-8 mb-8">
                <Skeleton width={16} height={16} className="rounded-circle" />
                <Skeleton height={16} width={90} />
            </div>
            <hr className="mb-8" />
            <Skeleton height={36} width={150} className="rounded-4" />
        </article>
    );
}

export function SkeletonSegmentedBox() {
    return (
        <section className="flex flex-column mt-72">
            <div className="flex jc-between py-24 border border-top border-1-5">
                <Skeleton className="rounded-4" height={40} width={150} />
                <Skeleton
                    className="rounded-4 sm-only"
                    height={40}
                    width={150}
                />
                <div className="flex gap-24 sm-none ai-center">
                    <Skeleton className="rounded-4" height={16} width={110} />
                    <Skeleton className="rounded-4" height={16} width={110} />
                    <Skeleton className="rounded-4" height={16} width={110} />
                </div>
            </div>
            <Bngrid
                gridType="logo_3_grid"
                gridStyle="foodit"
                itemProps={{ 0: { className: 'sm-none' } }}
            >
                <SkeletonCustomNode />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </Bngrid>
        </section>
    );
}
