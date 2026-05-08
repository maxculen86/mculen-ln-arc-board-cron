import React from 'react';
import { Skeleton } from '@ln/ds-common-skeleton';
import Divider from '../../../../features/ui/ln/divider/default';

export function SkeletonChat() {
    return (
        <div data-tw>
            <div className="mb-16 pt-8 pb-16 xl:pt-6">
                <h2 className="font-secondary text-body-lg font-bold xl:pb-16">
                    LA NACION IA
                </h2>
                <div className="relative flex flex-column pt-16 xl:pt-0 xl:grid xl:grid-cols-16 gap-16">
                    <div className="xl:col-span-11">
                        <Skeleton className="h-[204px] sm:h-[132px] w-full xl:hidden mb-16 xl:mb-0" />
                        <Skeleton className="h-[92px] sm:h-[80px] w-full" />
                        <div className="flex flex-column md:flex-row gap-16 pt-16">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <Skeleton className="w-full h-[72px]" key={i} />
                            ))}
                        </div>
                        <div className="flex flex-col gap-16 pt-16">
                            <Divider color="muted" />
                            <div>
                                <Skeleton className="-mb-8 w-full h-[56px] sm:h-[28px]" />
                            </div>
                        </div>
                    </div>
                    <div className="hidden xl:flex xl:col-span-5">
                        <Skeleton className="w-full h-[182px]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
