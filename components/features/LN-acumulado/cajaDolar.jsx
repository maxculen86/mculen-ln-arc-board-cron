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
import checkHydrateOnly from '../../private/LN/common/utils/checkHydrateOnly';

const { layoutsName = {} } = config || {};

const CajaDolar = ({ id }) => {
    const { contextPath, deployment, outputType, layout, globalContent = {} } =
        useAppContext() || {};
    const { node_type: nodeType = '', _id = '' } = globalContent;
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

    if (checkHydrateOnly({ nodeType, layout })) {
        return (
            <StaticContent>
                {(() => {
                    return dolarComponent;
                })()}
            </StaticContent>
        );
    }

    return shouldShowDollar && !isAmp ? (
        <Static id={id} htmlOnly persistent>
            {dolarComponent}
        </Static>
    ) : (
        <></>
    );
};

CajaDolar.label = 'LN Acumulado Caja Dolar';

CajaDolar.propTypes = {
    id: PropTypes.string.isRequired
};

export default CajaDolar;
