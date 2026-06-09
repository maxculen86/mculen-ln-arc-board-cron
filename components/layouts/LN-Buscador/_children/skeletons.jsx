import React from 'react';
import { Skeleton } from '@ln/ds-common-skeleton';

export function SearchSkeleton() {
    return (
        <section className="col-span-8 md:col-span-12 grid grid-cols-8 md:grid-cols-12 gap-24">
            <div className="col-span-8 md:col-span-8">
                <Skeleton className="w-full h-48" />
            </div>

            <div className="col-span-8 md:col-span-12">
                <Skeleton className="w-full h-20" />
            </div>

            <section className="col-span-8 md:col-span-12 grid grid-cols-8 md:grid-cols-12 gap-32">
                <div className="col-span-8 md:col-span-4">
                    <div className="flex flex-col gap-12 w-full">
                        <Skeleton className="border border-neutral-200 w-full aspect-3/2 bg-[url('/pf/resources/images/ln-placeholder.svg')] bg-no-repeat bg-center bg-[length:67px]" />
                        <div>
                            <Skeleton className="h-96 w-full" />
                        </div>
                    </div>
                </div>
                {Array.from({ length: 12 }, (_, i) => (
                    <div
                        key={i}
                        className="relative isolate col-span-8 md:col-span-4"
                    >
                        <div className="flex md:flex-col md:flex-col-reverse gap-12 w-full">
                            <Skeleton className="w-full h-96" />
                            <div className="w-124 h-124 shrink-0 md:w-full md:h-auto">
                                <Skeleton className="border border-neutral-200 block w-full aspect-square md:aspect-[3/2] bg-[url('/pf/resources/images/ln-placeholder.svg')] bg-no-repeat bg-center bg-[length:50px] md:bg-[length:67px]" />
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </section>
    );
}
