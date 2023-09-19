import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import ModDolar from '../../private/common/mod-dolar';
import StaticContent from '../../private/common/staticContent';
import filter from '../../../content/filters/LN/services/dolar';
import getAssetsPath from '../../private/common/utils/getAssetsPath';
import get from '../../private/common/utils/get';
import config from '../../../properties/sites/la-nacion-ar';

const { layoutsName = {} } = config || {};

// TODO hacer refactor de componente, unificar para acumulado y nota
const CajaDolar = ({ id }) => {
    const { contextPath, deployment, outputType, layout, globalContent = {} } =
        useAppContext() || {};
    const { _id = '', type = '' } = globalContent;
    const isAmp = outputType === 'amp';
    const shouldShowDollar =
        layout === layoutsName.Noticia
            ? get(globalContent, 'label.mostrar_caja_dolar.text', '') ===
              'Mostrar'
            : true;

    const response =
        useContent({
            source: 'dolarSource',
            filter,
            staticMode: true
        }) || {};

    const { data, imageUrl } = response;
    const oddOrEven = data && (data.length % 2 ? '--odd' : '--even');
    const extraClass = ['', '--minusThree', '--minusTwo', '--minusOne'];

    let fillClass = '';

    data &&
        (data.length < 4
            ? (fillClass = '--fewElem')
            : (fillClass = data && extraClass[data.length % 4]));

    const dolarComponent = data ? (
        <ModDolar
            _id={_id}
            imageUrl={imageUrl}
            data={data}
            oddOrEven={oddOrEven}
            fillClass={fillClass}
            logoByma={getAssetsPath(contextPath)(deployment)('logo-byma.svg')}
            logoIol={getAssetsPath(contextPath)(deployment)('logo-iol.svg')}
            isAmp={isAmp}
        />
    ) : (
        <></>
    );

    return shouldShowDollar && !isAmp ? (
        <StaticContent>
            {type === 'story' && (
                <h2 className="com-title --font-primary --xl --font-extra">
                    Cotización del dólar de hoy
                </h2>
            )}
            {dolarComponent}
        </StaticContent>
    ) : (
        <></>
    );
};

CajaDolar.label = 'LN Acumulado Caja Dolar';

CajaDolar.propTypes = {
    id: PropTypes.string.isRequired
};

export default CajaDolar;
