import React from 'react';
import { useAppContext } from 'fusion:context';
import { cx } from '@ln/ds-cva';
import useTermica from '../../../private/common/hooks/useTermica';
import get from '../../../private/common/utils/get';
import ContainerValidation from '../../../private/common/containerValidation';
import IaSummary from '../../LN/common/iaSummary/default';
import { closeIaSummary } from '../../LN/common/iaSummary/helpers';
import siteConfig from '../../../../properties/sites/la-nacion-ar';

const { layoutsName = {} } = siteConfig || {};

const LAYOUTS_WITH_OWN_SPACING = [
    layoutsName.StoryTellingV2,
    layoutsName.NotaOpinion
];

function LnIa() {
    const { globalContent, layout } = useAppContext();

    const summaryData = get(
        globalContent,
        'promo_items.summary.embed.config.arrayBullets',
        []
    );
    const isThermalSummaryEnabled = useTermica('resumen_nota');

    const shouldShowSummary = isThermalSummaryEnabled && summaryData.length > 0;

    if (!shouldShowSummary) {
        return null;
    }

    const needsSpacing = !LAYOUTS_WITH_OWN_SPACING.includes(layout);

    // TODO: eliminar <ContainerValidation> cuando se implemente el refactor del layout foto al 100%
    return (
        <ContainerValidation layout={layout}>
            <IaSummary
                className={cx(needsSpacing && 'mb-32')}
                summaryData={summaryData}
                onClose={closeIaSummary}
            />
        </ContainerValidation>
    );
}

LnIa.label = 'LN-IA';

export default LnIa;
