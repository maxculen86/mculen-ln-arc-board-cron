import React from 'react';
import { useAppContext } from 'fusion:context';

export default function EventsHelpers() {
    const { deployment, contextPath } = useAppContext();

    return (
        <script
            defer
            type="application/javascript"
            src={deployment(
                `${contextPath}/resources/js/common/eventsHelper.min.js`
            )}
        />
    );
}
