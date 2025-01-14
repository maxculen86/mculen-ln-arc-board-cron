import { Button } from '@ln/foodit-ui-button';
import PropTypes from 'prop-types';
import React from 'react';

export function LoadMoreButton({ clickMoreArticle, loading = false }) {
    return (
        <div className="text-center">
            <Button
                title="Ver más"
                onClick={clickMoreArticle}
                variant="secondary"
                size={40}
                loading={loading}
            >
                Ver más
            </Button>
        </div>
    );
}

LoadMoreButton.propTypes = {
    clickMoreArticle: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

LoadMoreButton.defaultProps = {
    loading: false
};
