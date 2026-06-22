import { useEffect, useState } from 'react';
import getGaClientId from '../utils/segmentation/getGaClientId';
import computeSegment from '../utils/segmentation/computeSegment';
import {
    removeSegmentoNota,
    upsertSegmentoNota,
    STORAGE_KEY
} from '../utils/segmentation/segmentoNotaStorage';

const useNotaSegment = ({
    experimentName,
    testDigits = [],
    controlDigits = [],
    syncStorage = true,
    storageKey = STORAGE_KEY
} = {}) => {
    const [segment, setSegment] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let cleanup = () => {};

        if (!experimentName) {
            setSegment(null);
            setReady(true);
        } else if (testDigits.length === 0 && controlDigits.length === 0) {
            if (syncStorage) removeSegmentoNota(experimentName, storageKey);
            setSegment(null);
            setReady(true);
        } else {
            let cancelled = false;
            setSegment(null);
            setReady(false);

            const run = async () => {
                const clientId = await getGaClientId();
                if (cancelled) return;

                const computed = clientId
                    ? computeSegment(clientId, { testDigits, controlDigits })
                    : null;

                if (syncStorage) {
                    if (computed)
                        upsertSegmentoNota(
                            experimentName,
                            computed,
                            storageKey
                        );
                    else removeSegmentoNota(experimentName, storageKey);
                }

                setSegment(computed);
                setReady(true);
            };

            run();

            cleanup = () => {
                cancelled = true;
            };
        }

        return cleanup;
    }, [experimentName, testDigits, controlDigits, syncStorage, storageKey]);

    return { segment, ready };
};

export default useNotaSegment;
