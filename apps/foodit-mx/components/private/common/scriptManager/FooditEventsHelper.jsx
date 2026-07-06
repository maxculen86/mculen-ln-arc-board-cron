import React from 'react';
import { useAppContext } from 'fusion:context';

export default function FooditEventsHelper() {
    const { deployment, contextPath } = useAppContext();

    return (
        <script
            defer
            type="application/javascript"
            src={deployment(
                `${contextPath}/resources/js/common/fooditEventsHelper.min.js`
            )}
        />
    );
}
