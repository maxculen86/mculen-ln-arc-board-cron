import React from 'react';
import PropTypes from 'prop-types';
import getAssetsPath from './utils/getAssetsPath';
import Text from './text/index';
import Link from './com-link';
import Image from './com-image';

import '../../../resources/dist/css/ln/components/daily-horoscope.css';

const DailyHoroscope = ({ classCondition, data, deployment, contextPath }) => {
    const {
        nombre = '',
        periodo = '',
        autor = '',
        detalle = '',
        elementos = {}
    } = data;
    const quitarTildes = string => {
        return string
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    };
    return (
        <article className={`daily-horoscope ${classCondition}`}>
            <header className="daily-horoscope-header">
                <div className="container-svg">
                    <Image
                        src={getAssetsPath(contextPath)(deployment)(
                            `horoscope-logos/${quitarTildes(nombre)}.svg`
                        )}
                        alt={nombre}
                        width="100%"
                        height="100%"
                    />
                </div>
                <div>
                    <Text tag="h2" extraClass="title" size="--m">
                        Horóscopo de
                        <strong> {nombre} HOY</strong>
                    </Text>
                    <Text tag="time" extraClass="text periodo" size="--twoxs">
                        {periodo}
                    </Text>
                    <Text tag="p" extraClass="text" size="--fourxs">
                        Por{' '}
                        <Link
                            link="https://www.lanacion.com.ar/autor/renata-dossi-11743/"
                            title=""
                            classCondition="--author"
                        >
                            {autor}
                        </Link>
                    </Text>
                </div>
            </header>
            <main className="daily-horoscope-main">
                <Text tag="p" size="--twoxs">
                    {detalle}
                </Text>
                <Text tag="p" size="--twoxs">
                    <strong>Amor: </strong>
                    {elementos.Amor}
                </Text>
                <Text tag="p" size="--twoxs">
                    <strong>Riqueza: </strong>
                    {elementos.Riqueza}
                </Text>
                <Text tag="p" size="--twoxs">
                    <strong>Bienestar: </strong>
                    {elementos.Bienestar}
                </Text>
            </main>
        </article>
    );
};

DailyHoroscope.propTypes = {
    classCondition: PropTypes.string,
    data: PropTypes.shape({
        nombre: PropTypes.string,
        detalle: PropTypes.string,
        periodo: PropTypes.string,
        autor: PropTypes.string,
        elementos: PropTypes.shape({
            Amor: PropTypes.string,
            Riqueza: PropTypes.string,
            Bienestar: PropTypes.string
        })
    }).isRequired,
    contextPath: PropTypes.string.isRequired,
    deployment: PropTypes.func.isRequired
};

DailyHoroscope.defaultProps = {
    classCondition: ''
};

export default DailyHoroscope;
