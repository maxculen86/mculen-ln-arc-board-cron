import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { groupCustomFields } from '../../../private/common/utils/propTypesHelper';
import { IaTools } from './common/iaTools';
import useIaData from './hooks/useIaData';
import '../../../../resources/packages/css/@ln/common-ui-collapse/index.css';

function LnIa({
    customFields: { hideSummary = false, hideGlossary = false } = {}
}) {
    const { globalContent } = useAppContext();
    const { iaData, shouldShowSummary, shouldShowGlossary } = useIaData(
        globalContent,
        hideSummary,
        hideGlossary
    );

    if (!shouldShowSummary && !shouldShowGlossary) {
        return null;
    }

    return <IaTools iaData={iaData} />;
}

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
    }).isRequired
};

export default LnIa;
