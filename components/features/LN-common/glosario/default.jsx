import React from 'react';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import { groupCustomFields } from '../../../private/common/utils/propTypesHelper';

// TO DO: aplicar la logica y los test correspondientes cuando producto nos baje la definicion

const Glossary = ({ customFields: { hide } = {} }) => {
    if (hide) {
        return null;
    }

    return (
        <Static id="LN-Glosario" htmlOnly>
            <div>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Quidem, illum esse laboriosam ex, in earum ab placeat iste
                blanditiis cum, nihil error numquam vero ipsam sit maiores hic
                ad unde.
            </div>
        </Static>
    );
};

Glossary.label = 'LN-Glosario';

Glossary.propTypes = {
    customFields: PropTypes.shape({
        hide: PropTypes.bool.tag({
            name: 'Ocultar',
            description: 'Definí la visibilidad del resumen',
            default: false,
            group: groupCustomFields
        })
    })
};

Glossary.defaultProps = {
    customFields: {
        hide: false
    }
};

export default Glossary;
