import { useAppContext } from 'fusion:context';
import useTermica from '../../../../private/common/hooks/useTermica';
import get from '../../../../private/common/utils/get';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';
import { useIaSummaryState } from '../../common/iaSummary/hooks/useIaSummaryState';
import { useIaSummaryActions } from '../../common/iaSummary/hooks/useIaSummaryActions';
import {
    openIaSummary,
    isIaSummaryAvailable
} from '../../common/iaSummary/helpers';

const useIaSummary = ({
    globalContent,
    suscription,
    openBarrier,
    hideSummary = false
}) => {
    const { renderables = [] } = useAppContext();

    const summaryData = get(
        globalContent,
        'promo_items.summary.embed.config.arrayBullets',
        []
    );

    const isThermalSummaryEnabled = useTermica('resumen_nota');

    // Validación unificada + el override puntual de este feature (hideSummary
    // sólo aplica al botón del DS-Toolbar, no al resto de los triggers).
    const shouldShowSummary =
        isIaSummaryAvailable({
            renderables,
            summaryData,
            isThermalSummaryEnabled
        }) && !hideSummary;

    // Estado compartido: el panel se monta una vez y lee el mismo store.
    const { isOpen } = useIaSummaryState();
    const { close } = useIaSummaryActions();

    const closeEvent = {
        event: 'e_linkclick',
        action: 'toolbar',
        category: 'nota',
        label: 'cerrar_resumen'
    };

    const onOpen = () =>
        openIaSummary({
            suscription,
            openBarrier,
            event: {
                event: 'e_linkclick',
                action: 'toolbar',
                category: 'nota',
                label: 'resumen_nota'
            },
            closeEvent
        });

    const onClose = () => {
        close();

        addEventToDataLayerV2(closeEvent);
    };

    return {
        shouldShowSummary,
        isOpen,
        summaryData,
        onOpen,
        onClose
    };
};

export default useIaSummary;
