import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import ModDolar from '../../private/common/mod-dolar';
import StaticContent from '../../private/common/staticContent';
import filter from '../../../content/filters/LN/services/dolar';
import getAssetsPath from '../../private/common/utils/getAssetsPath';

const CajaDolar = () => {
    const { contextPath, deployment, outputType } = useAppContext() || {};

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

    return (
        <StaticContent>
            {(() => {
                return data ? (
                    <ModDolar
                        imageUrl={imageUrl}
                        data={data}
                        oddOrEven={oddOrEven}
                        fillClass={fillClass}
                        logoByma={getAssetsPath(contextPath)(deployment)(
                            'logo-byma.svg'
                        )}
                        logoIol={getAssetsPath(contextPath)(deployment)(
                            'logo-iol.svg'
                        )}
                        isAmp={outputType === 'amp'}
                    />
                ) : (
                    <></>
                );
            })()}
        </StaticContent>
    );
};

CajaDolar.label = 'LN Acumulado Caja Dolar';

CajaDolar.propTypes = {
    id: PropTypes.string.isRequired
};

export default CajaDolar;
