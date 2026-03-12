import React from 'react';
import { Spinner } from '@ln/common-ui-spinner';
import EmptyState from '../emptyState/foodit';
import { getVariantBarrier } from '../emptyState/helpers';

export function EmptyStateComponent({ userType, loading }) {
    return (
        <div className="flex jc-center ai-center">
            {loading ? (
                <Spinner className="text-secondary-positive" />
            ) : (
                <EmptyState
                    variant={getVariantBarrier(userType)}
                    direction="column"
                />
            )}
        </div>
    );
}
