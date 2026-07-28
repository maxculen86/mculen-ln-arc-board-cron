import React from 'react';
import { getVariantBarrier } from '../emptyState/helpers';
import { SkeletonMenuSemanal } from '../skeletons/MenuSemanal/foodit';
import { EmptyStateDS } from '../../../ui/foodit/emptyState/default';

export function EmptyStateComponent({ userType }) {
    const isLoading = userType === 'loading';

    return (
        <div className="min-h-344">
            {isLoading ? (
                <SkeletonMenuSemanal />
            ) : (
                <EmptyStateDS variant={getVariantBarrier(userType)} />
            )}
        </div>
    );
}
