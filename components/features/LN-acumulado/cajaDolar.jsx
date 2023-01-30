import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import Static from 'fusion:static';
import ModDolar from '../../private/common/mod-dolar';
import StaticContent from '../../private/common/staticContent';
import filter from '../../../content/filters/LN/services/dolar';
import getAssetsPath from '../../private/common/utils/getAssetsPath';
import get from '../../private/common/utils/get';
import config from '../../../properties/sites/la-nacion-ar';

const { layoutsName = {} } = config || {};

const CajaDolar = ({ id }) => {
    const { contextPath, deployment, outputType, layout, globalContent } =
        useAppContext() || {};
    const shouldShowDollar =
        get(globalContent, 'label.mostrar_caja_dolar.text', '') === 'Mostrar';

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
            imageUrl={imageUrl}
            data={data}
            oddOrEven={oddOrEven}
            fillClass={fillClass}
            logoByma={getAssetsPath(contextPath)(deployment)('logo-byma.svg')}
            logoIol={getAssetsPath(contextPath)(deployment)('logo-iol.svg')}
            isAmp={outputType === 'amp'}
        />
    ) : (
        <></>
    );

    if (layout === layoutsName.Noticia) {
        return shouldShowDollar ? (
            <Static id={id} htmlOnly persistent>
                {dolarComponent}
            </Static>
        ) : (
            <></>
        );
    }

    return (
        <StaticContent>
            {(() => {
                return dolarComponent;
            })()}
        </StaticContent>
    );
};

CajaDolar.label = 'LN Acumulado Caja Dolar';

CajaDolar.propTypes = {
    id: PropTypes.string.isRequired
};

export default CajaDolar;
