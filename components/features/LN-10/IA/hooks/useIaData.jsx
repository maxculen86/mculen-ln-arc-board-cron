import { useMemo } from 'react';
import useTermica from '../../../../private/common/hooks/useTermica';
import get from '../../../../private/common/utils/get';
import { handleTabsEvent } from '../helpers';

const useIaData = (globalContent, hideSummary, hideGlossary) => {
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
                    callback: () => handleTabsEvent('resumen_nota'),
                    data: summaryData
                },
                shouldShowGlossary && {
                    id: 'glossary',
                    title: 'Glosario',
                    callback: () => handleTabsEvent('glosario'),
                    data: glossaryData
                }
            ].filter(Boolean),
        [shouldShowSummary, shouldShowGlossary, summaryData, glossaryData]
    );

    return { iaData, shouldShowSummary, shouldShowGlossary };
};

export default useIaData;
