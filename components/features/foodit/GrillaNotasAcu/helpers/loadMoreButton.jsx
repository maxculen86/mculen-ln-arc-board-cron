import { Button } from '@ln/foodit-ui-button';
import React from 'react';

export const LoadMoreButton = ({ clickMoreArticle, loading }) => {
    return (
        <div className="text-center">
            <Button
                title="Ver más"
                onClick={clickMoreArticle}
                variant="secondary"
                size={{ sm: 32, lg: 40 }}
                loading={loading}
            >
                Ver más
            </Button>
        </div>
    );
};
