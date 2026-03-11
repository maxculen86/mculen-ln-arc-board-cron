import React from 'react';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import Static from 'fusion:static';
import ModDolar from './components/mod-dolar';
import filter from '../../../../content/filters/LN/services/dolar';
import getAssetsPath from '../../../private/common/utils/getAssetsPath';
import get from '../../../private/common/utils/get';
import config from '../../../../properties/sites/la-nacion-ar';
import getFillClass from './_helpers';

const { layoutsName = {} } = config || {};

function CajaDolar({ id: featureId }) {
    const {
        contextPath,
        deployment,
        layout,
        globalContent = {}
    } = useAppContext() || {};
    const { _id = '', type = '' } = globalContent;
    const shouldShowDollar =
        layout === layoutsName.Noticia || layout === layoutsName.LiveBlog
            ? get(globalContent, 'label.mostrar_caja_dolar.text', '') ===
              'Mostrar'
            : true;

    const response =
        useContent({
            source: 'dolarSource',
            filter,
            staticMode: true
        }) || {};

    const { data } = response;
    const oddOrEven = data && (data.length % 2 ? '--odd' : '--even');

    const fillClass = getFillClass(data);

    const dolarComponent = data ? (
        <ModDolar
            _id={_id}
            data={data}
            oddOrEven={oddOrEven}
            fillClass={fillClass}
            logoByma={getAssetsPath(contextPath)(deployment)('logo-byma.svg')}
            logoIol={getAssetsPath(contextPath)(deployment)('logo-iol.svg')}
        />
    ) : (
        // TODO: Se desactiva esta regla en esta linea dado que al devolver null dentro de un static, el componente se rompe. Refactorizar componente para evitar guardar este componente en una variable.
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <></>
    );

    return (
        shouldShowDollar && (
            <Static id={featureId}>
                {type === 'story' && (
                    <h2 className="com-title --font-primary --xl --font-extra">
                        Cotización del dólar de hoy
                    </h2>
                )}
                {dolarComponent}
            </Static>
        )
    );
}

CajaDolar.label = 'LN Acumulado Caja Dolar';

export default CajaDolar;
