import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { groupCustomFields } from '../../../private/common/utils/propTypesHelper';
import get from '../../../private/common/utils/get';
import SummaryNote from '../../../private/LN/common/summaryNote';
import useTermica from '../../../private/common/hooks/useTermica';

const Resumen = ({ customFields: { hide } = {} }) => {
    const { globalContent } = useAppContext();
    const arrayBullets = get(
        globalContent,
        'promo_items.summary.embed.config.arrayBullets',
        []
    );
    const isThermalSummaryEnabled = useTermica('resumen_nota');

    if (hide || !isThermalSummaryEnabled) {
        return null;
    }

    return <SummaryNote paragraphs={arrayBullets} className="mb-32" />;
};

Resumen.label = 'LN-Resumen-Nota';

Resumen.propTypes = {
    customFields: PropTypes.shape({
        hide: PropTypes.bool.tag({
            name: 'Ocultar',
            description: 'Definí la visibilidad del resumen',
            default: false,
            group: groupCustomFields
        })
    })
};

Resumen.defaultProps = {
    customFields: {
        hide: false
    }
};

export default Resumen;
