/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { groupCustomFields } from '../../../private/common/utils/propTypesHelper';
import StaticContent from '../../../private/common/staticContent';
import get from '../../../private/common/utils/get';
import SummaryNote from '../../../private/LN/nota/apertura/summaryNote';

const Resumen = ({ customFields: { hide } = {} }) => {
    const { globalContent } = useAppContext();
    const arrayBullets = get(
        globalContent,
        'promo_items.summary.embed.config.arrayBullets',
        []
    );

    return !hide ? (
        <>
            <StaticContent>
                <SummaryNote paragraphs={arrayBullets} />
            </StaticContent>
        </>
    ) : (
        <></>
    );
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
