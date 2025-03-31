import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '@ln/foodit-ui-spinner';
import EmptyState from '../emptyState/foodit';
import { getVariantBarrier } from '../emptyState/helpers';

export function EmptyStateComponent({ userType }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userType !== 'loading') setLoading(false);
    }, [userType]);

    return (
        <div className="flex jc-center ai-center min-h-344">
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
}
EmptyStateComponent.propTypes = {
    userType: PropTypes.string.isRequired
};
