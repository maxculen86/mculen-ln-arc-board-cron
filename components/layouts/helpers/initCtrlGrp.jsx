import React, { useEffect } from 'react';
import { API_V3_GROUP, DATADOG_CONFIG } from 'fusion:environment';
import { InitCtrlGrp } from '@ln/segmentacion-control-group';

function InitControlGroup() {
    useEffect(() => {
        const urlApi = API_V3_GROUP;
        const cookieName = 'controlGroupV3';
        const gaIdRetries = null;
        const defaultQuota = null;
        const { clientTokenLogs } =
            (DATADOG_CONFIG && DATADOG_CONFIG['la-nacion-ar']) || {};
        InitCtrlGrp(
            urlApi,
            clientTokenLogs,
            cookieName,
            gaIdRetries,
            defaultQuota
        );
    }, []);

    return <div className="none" />;
}
export default InitControlGroup;
