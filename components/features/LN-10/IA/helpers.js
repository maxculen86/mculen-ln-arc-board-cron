import { useEffect, useState, useMemo } from 'react';
import get from '../../../private/common/utils/get';
import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';
import useTermica from '../../../private/common/hooks/useTermica';

export const handleTabsEvent = (label = '') => {
    addEventToDataLayerV2({
        event: 'e_linkclick',
        action: 'IA',
        category: 'nota_ln9',
        label
    });
};

export const handleIaVisibility = observable => {
    const [isVisible, setIsVisible] = useState(false);

    const handleClose = () => {
        observable.publish('iaClosed', { closed: true });
        addEventToDataLayerV2({
            event: 'e_linkclick',
            action: 'IA',
            category: 'nota_ln9',
            label: 'cerrar_ia'
        });
        setIsVisible(false);
    };

    useEffect(() => {
        const handleShowIa = data =>
            data?.show !== undefined && setIsVisible(data.show || false);

        observable.subscribe('showIa', handleShowIa);

        return () => {
            observable.unsubscribe('showIa', handleShowIa);
            handleClose();
        };
    }, [observable]);

    return { isVisible, handleClose };
};

export const useIaData = (globalContent, hideSummary, hideGlossary) => {
    const summaryData = get(
        globalContent,
        'promo_items.summary.embed.config.arrayBullets',
        []
    );
    const glossaryData = get(
        globalContent,
        'promo_items.glossary.embed.config.arrayData',
        []
    );

    const isThermalGlossaryEnabled = useTermica('glosario');
    const isThermalSummaryEnabled = useTermica('resumen_nota');

    const shouldShowSummary =
        !hideSummary && summaryData.length > 0 && isThermalSummaryEnabled;
    const shouldShowGlossary =
        !hideGlossary && glossaryData.length > 0 && isThermalGlossaryEnabled;

    const iaData = useMemo(
        () =>
            [
                shouldShowSummary && {
                    id: 'summary',
                    title: 'Resumen de lectura',
                    callback: () => handleTabsEvent('summary'),
                    data: summaryData
                },
                shouldShowGlossary && {
                    id: 'glossary',
                    title: 'Glosario',
                    callback: () => handleTabsEvent('glossary'),
                    data: glossaryData
                }
            ].filter(Boolean),
        [shouldShowSummary, shouldShowGlossary, summaryData, glossaryData]
    );

    return { iaData, shouldShowSummary, shouldShowGlossary };
};
