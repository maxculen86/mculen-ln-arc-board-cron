import React from 'react';
import { useAppContext } from 'fusion:context';

function DsPromoEventsScript() {
    const { deployment, contextPath } = useAppContext();
    return (
        <script
            defer
            id="script-ds-promo-events"
            src={deployment(
                `${contextPath}/resources/js/LN/dsPromoEventsScript.min.js`
            )}
        />
    );
}

export default DsPromoEventsScript;
