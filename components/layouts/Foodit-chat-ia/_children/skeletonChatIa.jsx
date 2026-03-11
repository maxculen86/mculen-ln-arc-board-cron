import React from 'react';
import { Skeleton } from '@ln/common-ui-skeleton';

export function SkeletonChatIa() {
    return (
        <div className="w-full">
            <div className="flex flex-col gap-16 max-w-[802px] mx-auto">
                <div className="flex justify-end">
                    <Skeleton width={256} height={58} />
                </div>
                <div className="flex justify-start">
                    <Skeleton width={300} height={93} />
                </div>
                <div className="max-w-[802px]">
                    <Skeleton width="100%" height={137} />
                </div>
            </div>
        </div>
    );
}
