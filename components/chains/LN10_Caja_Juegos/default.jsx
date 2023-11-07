import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';

import StaticContent from '../../private/common/staticContent';
import get from '../../private/common/utils/get';
import BuildRoof from '../utils/_BuildRoof/default';
import { useRoofData } from '../utils/_helpers';
import config from '../../../properties/sites/la-nacion-ar';

const { layoutsName = {} } = config || {};

const CajaJuegos = ({ customFields, children }) => {
    const { globalContent = {}, layout } = useAppContext() || {};
    const { logoId, link, hideTitle, hideCaja } = customFields;

    const roofData = useRoofData({
        logoId,
        link,
        hideTitle
    });

    const shouldShowGame =
        layout === layoutsName.Infografia
            ? get(globalContent, 'label.mostrar_caja_juegos.text', '') ===
              'Mostrar'
            : true;

    return shouldShowGame && !hideCaja ? (
        <StaticContent>
            <BuildRoof {...roofData} />
            <div className="grid grid-cols-8 grid-cols-12_m grid-cols-12_lg grid-cols-12_xl gap-16">
                {children}
            </div>
        </StaticContent>
    ) : (
        <></>
    );
};

CajaJuegos.label = 'LN10 Caja Juegos';

CajaJuegos.propTypes = {
    customFields: PropTypes.shape({
        logoId: PropTypes.string.tag({
            name: 'Logo',
            description: 'Ingrese aquí el id de Photo Center de la imagen',
            defaultValue: '',
            group: 'Techo'
        }),
        link: PropTypes.url.tag({
            label: 'Url',
            description:
                'Ingrese la url que redirige al hacer click al titulo. El formato debe empezar con https://',
            defaultValue: '',
            group: 'Techo'
        }),
        hideTitle: PropTypes.boolean.tag({
            name: 'Ocultar techo',
            description: 'Marque para ocultar el techo',
            defaultValue: true,
            group: 'Techo'
        }),
        hideCaja: PropTypes.boolean.tag({
            name: 'Ocultar Caja',
            description: 'Marque para ocultar la caja',
            defaultValue: false,
            hidden: false
        })
    })
};

export default CajaJuegos;
