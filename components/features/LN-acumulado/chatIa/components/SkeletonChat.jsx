import React from 'react';
import { Skeleton } from '@ln/ds-common-skeleton';
import Divider from '../../../ui/ln/divider/default';

export function SkeletonChat() {
    return (
        <div data-tw>
            <div className="mb-16 pt-8 pb-16 xl:pt-6">
                <div className="md:grid md:grid-cols-12 xl:grid-cols-16 gap-responsive pb-32">
                    <div className="gap-responsive md:col-span-8 xl:col-span-10">
                        <Skeleton className="h-52 md:h-43 w-full" />
                        <div className="flex gap-responsive pt-16">
                            {['llaves', 'fixture'].map(id => (
                                <Skeleton className="w-full h-80" key={id} />
                            ))}
                        </div>
                    </div>
                </div>
                <h2 className="font-primary font-w-semibold text-base-default text-subheading-sm xl:pb-16">
                    LA NACION IA
                </h2>
                <div className="relative flex flex-column pt-16 xl:pt-0 xl:grid xl:grid-cols-16 gap-16">
                    <div className="xl:col-span-10">
                        <Skeleton className="h-204 sm:h-132 w-full xl:hidden mb-16 xl:mb-0" />
                        <Skeleton className="h-92 sm:h-80 w-full" />
                        <div className="flex flex-column md:flex-row gap-16 pt-16">
                            {['question-1', 'question-2', 'question-3'].map(
                                id => (
                                    <Skeleton
                                        className="w-full h-72"
                                        key={id}
                                    />
                                )
                            )}
                        </div>
                        <div className="flex flex-col gap-16 pt-16">
                            <Divider color="muted" />
                            <div>
                                <Skeleton className="-mb-8 w-full h-56 sm:h-28" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
