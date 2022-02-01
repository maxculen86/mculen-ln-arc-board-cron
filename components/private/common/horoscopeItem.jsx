import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import PropTypes from 'prop-types';
import getAssetsPath from './utils/getAssetsPath';
import '../../../resources/dist/css/ln/components/horoscope-item.css';
import Link from './link';
import Text from './text';
import Image from './com-image';

const HoroscopeItem = ({
    classCondition,
    periodo,
    nombre,
    filenameLogo,
    deployment,
    contextPath
}) => {
    const baseUrl = `${SITE_LANACION || 'https://www.lanacion.com.ar'}`;
    const quitarTildes = string => {
        return string
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    };

    return (
        <article className={`horoscope-item ${classCondition}`}>
            <Link
                href={
                    nombre === 'Horóscopo Chino'
                        ? 'https://www.lanacion.com.ar/horoscopo/horoscopo-chino-2022/'
                        : `${baseUrl}/horoscopo/${quitarTildes(nombre)}/`
                }
                title={`Ir al detalle de ${nombre}`}
            >
                <div className="container-svg">
                    <Image
                        src={getAssetsPath(contextPath)(deployment)(
                            `horoscope-logos/${quitarTildes(filenameLogo)}.svg`
                        )}
                        alt={nombre}
                        width="100%"
                        height="100%"
                    />
                </div>
                <div className="container-text">
                    <Text tag="h2" extraClass="title" size="--twoxs">
                        {nombre}
                    </Text>
                    {periodo && (
                        <Text tag="time" extraClass="text" size="--fivexs">
                            {periodo}
                        </Text>
                    )}
                </div>
            </Link>
        </article>
    );
};

HoroscopeItem.propTypes = {
    classCondition: PropTypes.string,
    filenameLogo: PropTypes.string,
    nombre: PropTypes.string,
    periodo: PropTypes.string,
    contextPath: PropTypes.string.isRequired,
    deployment: PropTypes.func.isRequired
};

HoroscopeItem.defaultProps = {
    classCondition: '',
    filenameLogo: 'cancer',
    nombre: 'cancer',
    periodo: ''
};

export default HoroscopeItem;
