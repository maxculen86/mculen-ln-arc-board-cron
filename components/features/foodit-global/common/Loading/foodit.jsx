import React from 'react';
import { Spinner } from '@ln/common-ui-spinner';

function LoadingFoodit() {
    return (
        <div className="text-center">
            <Spinner className="text-secondary-positive" />
        </div>
    );
}

export default LoadingFoodit;
