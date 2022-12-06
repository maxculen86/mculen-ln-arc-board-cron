import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import Static from 'fusion:static';
import ModDolar from '../../private/common/mod-dolar';
import filter from '../../../content/filters/LN/services/dolar';
import getAssetsPath from '../../private/common/utils/getAssetsPath';

const CajaDolar = ({ id: featureId }) => {
    const { contextPath, deployment, outputType } = useAppContext() || {};

    const response =
        useContent({
            source: 'dolarSource',
            staticMode: true,
            filter
        }) || {};

    const { data, imageUrl } = response;

    const oddOrEven = data && (data.length % 2 ? '--odd' : '--even');

    let fillClass = '';
    const extraClass = ['', '--minusThree', '--minusTwo', '--minusOne'];

    data &&
        (data.length < 4
            ? (fillClass = '--fewElem')
            : (fillClass = data && extraClass[data.length % 4]));

    const logoByma = getAssetsPath(contextPath)(deployment)('logo-byma.svg');
    const logoIol = getAssetsPath(contextPath)(deployment)('logo-iol.svg');
    const isAmp = outputType === 'amp';

    return (
        <Static id={featureId}>
            {(() => {
                return data ? (
                    <ModDolar
                        imageUrl={imageUrl}
                        data={data}
                        oddOrEven={oddOrEven}
                        fillClass={fillClass}
                        logoByma={logoByma}
                        logoIol={logoIol}
                        isAmp={isAmp}
                    />
                ) : (
                    <></>
                );
            })()}
        </Static>
    );
};

CajaDolar.label = 'LN Acumulado Caja Dolar';

CajaDolar.propTypes = {
    id: PropTypes.string.isRequired
};

export default CajaDolar;
