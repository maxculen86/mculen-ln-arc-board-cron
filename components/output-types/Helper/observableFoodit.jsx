import React from 'react';
import { useAppContext } from 'fusion:context';

const ObservableFoodit = () => {
    const { contextPath, deployment } = useAppContext();

    return (
        <script
            type="application/javascript"
            src={deployment(`${contextPath}/resources/js/observable.min.js`)}
        />
    );
};
export default ObservableFoodit;
