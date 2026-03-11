import React from 'react';
import EmptyState from '../emptyState/foodit';
import { getVariantBarrier } from '../emptyState/helpers';
import { SkeletonMenuSemanal } from '../skeletons/MenuSemanal/foodit';

export function EmptyStateComponent({ userType }) {
    const isLoading = userType === 'loading';

    return (
        <div className="flex jc-center ai-center min-h-344">
            {isLoading ? (
                <SkeletonMenuSemanal />
            ) : (
                <EmptyState
                    variant={getVariantBarrier(userType)}
                    direction="column"
                />
            )}
        </div>
    );
}
