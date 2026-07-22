import React from 'react';
import { Skeleton } from '@ln/common-ui-skeleton';
import SkeletonCard from '../Card/foodit';
import { SkeletonRoof } from '../Roof/foodit';

export function SkeletonCarousel() {
    return (
        <div>
            <SkeletonRoof />
            <div
                className="media-scroller relative flex flex-column gap-16 hide-mobile"
                data-scroller="container"
            >
                <ul className="relative --full-width" data-scroller="track">
                    <li data-scroller="element">
                        <SkeletonCard className="h-100" />
                    </li>
                    <li data-scroller="element">
                        <SkeletonCard className="h-100" />
                    </li>
                    <li data-scroller="element">
                        <SkeletonCard className="h-100" />
                    </li>
                    <li data-scroller="element">
                        <SkeletonCard className="h-100" />
                    </li>
                </ul>
                <div className="mx-auto" data-scroller="progress">
                    <Skeleton height={5} width={144} className="rounded-24" />
                </div>
            </div>
        </div>
    );
}
