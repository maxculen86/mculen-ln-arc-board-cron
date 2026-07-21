import React from 'react';
import { useAppContext } from 'fusion:context';

function Observable() {
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
}
export default Observable;
