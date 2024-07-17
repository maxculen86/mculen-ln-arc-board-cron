import React from 'react';
import { useAppContext } from 'fusion:context';

const ObservableFoodit = () => {
    const { contextPath, deployment } = useAppContext();

    return (
        <script
            type="application/javascript"
            src={deployment(
                `${contextPath}/resources/js/common/observable.min.js`
            )}
            defer
        />
    );
};
export default ObservableFoodit;
