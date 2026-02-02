import { useState } from 'react';
import useTermica from '../../../../private/common/hooks/useTermica';
import get from '../../../../private/common/utils/get';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';

const useIaSummary = ({
    globalContent,
    suscription,
    openBarrier,
    hideSummary = false
}) => {
    const summaryData = get(
        globalContent,
        'promo_items.summary.embed.config.arrayBullets',
        []
    );

    const isThermalSummaryEnabled = useTermica('resumen_nota');

    const shouldShowSummary =
        isThermalSummaryEnabled &&
        !hideSummary &&
        Array.isArray(summaryData) &&
        summaryData.length > 0;

    const [isOpen, setIsOpen] = useState(false);

    const openIa = () => {
        if (!suscription) {
            openBarrier?.();
            return;
        }

        setIsOpen(true);

        addEventToDataLayerV2({
            event: 'e_linkclick',
            action: 'toolbar',
            category: 'nota',
            label: 'resumen_nota'
        });
    };

    const closeIa = () => {
        setIsOpen(false);

        addEventToDataLayerV2({
            event: 'e_linkclick',
            action: 'toolbar',
            category: 'nota',
            label: 'cerrar_resumen'
        });
    };

    return {
        shouldShowSummary,
        isOpen,
        summaryData,
        openIa,
        closeIa
    };
};

export default useIaSummary;
