/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { groupCustomFields } from '../../../private/common/utils/propTypesHelper';
import StaticContent from '../../../private/common/staticContent';
import get from '../../../private/common/utils/get';

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
                <div>
                    <ul>
                        <li>hola 1</li>
                        <li>hola 2</li>
                        <li>hola 3</li>
                    </ul>
                </div>
            </StaticContent>
        </>
    ) : (
        <></>
    );
};
Resumen.label = 'Resumen nota';

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
