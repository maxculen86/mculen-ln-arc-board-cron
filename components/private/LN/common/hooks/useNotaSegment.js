import { useEffect, useState } from 'react';
import getGaClientId from '../utils/segmentation/getGaClientId';
import computeSegment from '../utils/segmentation/computeSegment';
import {
    removeSegmentoNota,
    upsertSegmentoNota
} from '../utils/segmentation/segmentoNotaStorage';

const useNotaSegment = ({
    experimentName,
    testDigits = [],
    controlDigits = []
} = {}) => {
    const [segment, setSegment] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let cleanup = () => {};

        if (!experimentName) {
            setSegment(null);
            setReady(true);
        } else if (testDigits.length === 0 && controlDigits.length === 0) {
            removeSegmentoNota(experimentName);
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

                if (computed) upsertSegmentoNota(experimentName, computed);
                else removeSegmentoNota(experimentName);

                setSegment(computed);
                setReady(true);
            };

            run();

            cleanup = () => {
                cancelled = true;
            };
        }

        return cleanup;
    }, [experimentName, testDigits, controlDigits]);

    return { segment, ready };
};

export default useNotaSegment;
