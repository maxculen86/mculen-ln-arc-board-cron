import React from 'react';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import { useAppContext } from 'fusion:context';
import { v4 as uuidv4 } from 'uuid';
import { groupCustomFields } from '../../../private/common/utils/propTypesHelper';
import get from '../../../private/common/utils/get';

const Glossary = ({ customFields: { hide } = {} }) => {
    if (hide) {
        return null;
    }

    const { globalContent } = useAppContext();
    const glossary = get(
        globalContent,
        'promo_items.glossary.embed.config.arrayData',
        []
    );

    //TODO: EL COMPONENTE LO SIGUEN DESDE FRONT
    return (
        <Static id="LN-Glosario" htmlOnly>
            <ul>
                {glossary.map(item => (
                    <li key={uuidv4()}>
                        <p>{item.key}</p>
                        <p>{item.value}</p>
                    </li>
                ))}
            </ul>
        </Static>
    );
};

Glossary.label = 'LN-Glosario';

Glossary.propTypes = {
    customFields: PropTypes.shape({
        hide: PropTypes.bool.tag({
            name: 'Ocultar',
            description: 'Definí la visibilidad del glosario',
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
