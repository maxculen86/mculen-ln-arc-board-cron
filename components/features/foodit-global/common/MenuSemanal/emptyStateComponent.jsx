import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '@ln/foodit-ui-spinner';
import EmptyState from '../emptyState/foodit';
import { getVariantBarrier } from '../emptyState/helpers';

export function EmptyStateComponent({ userType }) {
    const isLoading = userType === 'loading';

    return (
        <div className="flex jc-center ai-center min-h-344">
            {isLoading ? (
                <Spinner variant="secondary" />
            ) : (
                <EmptyState
                    variant={getVariantBarrier(userType)}
                    direction="column"
                />
            )}
        </div>
    );
}
EmptyStateComponent.propTypes = {
    userType: PropTypes.string.isRequired
};
