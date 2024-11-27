import { useEffect } from 'react';
import { InitCtrlGrp } from '@ln/segmentacion-control-group';
import { API_V3_GROUP, DATADOG_CONFIG } from 'fusion:environment';

const useInitControlGroup = () => {
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
};

export default useInitControlGroup;
