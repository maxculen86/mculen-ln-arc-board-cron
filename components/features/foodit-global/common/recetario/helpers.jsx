import React from 'react';
import EmptyState from '../emptyState/foodit';
import { Spinner } from '@ln/foodit-ui-spinner';
import { getVariantBarrier } from '../emptyState/helpers';

export const EmptyStateComponent = ({ userType, loading }) => {
    return (
        <div className="flex jc-center ai-center">
            {loading ? (
                <Spinner variant="secondary" />
            ) : (
                <EmptyState
                    variant={getVariantBarrier(userType)}
                    direction="column"
                />
            )}
        </div>
    );
};
