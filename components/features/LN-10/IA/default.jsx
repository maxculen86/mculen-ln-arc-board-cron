import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { groupCustomFields } from '../../../private/common/utils/propTypesHelper';
import { Collapse } from '../glossary/collapse';
import SummaryNote from '../../../private/LN/common/summaryNote';
import useTermica from '../../../private/common/hooks/useTermica';
import get from '../../../private/common/utils/get';

import '../../../../resources/packages/css/@ln/common-ui-collapse/index.css';

const LnIa = ({ customFields: { hideSummary, hideGlossary } = {} }) => {
    const { globalContent } = useAppContext();

    const glossaryData = get(
        globalContent,
        'promo_items.glossary.embed.config.arrayData',
        []
    );
    const isThermalGlossaryEnabled = useTermica('glosario');

    const arrayBullets = get(
        globalContent,
        'promo_items.summary.embed.config.arrayBullets',
        []
    );
    const isThermalSummaryEnabled = useTermica('resumen_nota');

    if (
        (hideGlossary || !glossaryData.length || !isThermalGlossaryEnabled) &&
        (hideSummary || !isThermalSummaryEnabled)
    ) {
        return null;
    }

    return (
        <>
            {!hideGlossary &&
            glossaryData.length &&
            isThermalGlossaryEnabled ? (
                <Collapse glossaryData={glossaryData} />
            ) : null}

            {!hideSummary && isThermalSummaryEnabled ? (
                <SummaryNote paragraphs={arrayBullets} className="mb-32" />
            ) : null}
        </>
    );
};

LnIa.label = 'LN-IA';

LnIa.propTypes = {
    customFields: PropTypes.shape({
        hideSummary: PropTypes.bool.tag({
            name: 'Ocultar Resumen',
            description: 'Definí la visibilidad del resumen',
            default: false,
            group: groupCustomFields
        }),
        hideGlossary: PropTypes.bool.tag({
            name: 'Ocultar Glosario',
            description: 'Definí la visibilidad del glosario',
            default: false,
            group: groupCustomFields
        })
    })
};

LnIa.defaultProps = {
    customFields: {
        hideSummary: false,
        hideGlossary: false
    }
};

export default LnIa;
