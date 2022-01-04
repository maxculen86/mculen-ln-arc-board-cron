import React from 'react';
import PropTypes from 'prop-types';

import Text from './text/index';
import Link from './com-link';
import Image from './com-image';

import '../../../resources/dist/css/ln/components/daily-horoscope.css';

const DailyHoroscope = ({ classCondition, data }) => {
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
                        src={`http://arc.lanacion.com.ar/pf/resources/images/horoscope-logos/${quitarTildes(
                            data.nombre
                        )}.svg?d=%24LATEST`}
                        alt={data.nombre}
                        width="100%"
                        height="100%"
                    />
                </div>
                <div>
                    <Text tag="h2" extraClass="title" size="--m">
                        Horóscopo de <strong>{data.nombre} HOY</strong>
                    </Text>
                    <Text tag="time" extraClass="text periodo" size="--twoxs">
                        {data.periodo}
                    </Text>
                    <Text tag="p" extraClass="text" size="--fourxs">
                        Por{' '}
                        <Link
                            link="https:www.lanacion.com.ar/autores/RenataDossi"
                            title=""
                            classCondition="--author"
                        >
                            {data.autor}
                        </Link>
                    </Text>
                </div>
            </header>
            <main className="daily-horoscope-main">
                <Text tag="p" size="--twoxs">
                    {data.detalle}
                </Text>
                <Text tag="p" size="--twoxs">
                    <strong>Amor: </strong>
                    {data.elementos.Amor}
                </Text>
                <Text tag="p" size="--twoxs">
                    <strong>Riqueza: </strong>
                    {data.elementos.Riqueza}
                </Text>
                <Text tag="p" size="--twoxs">
                    <strong>Bienestar: </strong>
                    {data.elementos.Bienestar}
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
    }).isRequired
};

DailyHoroscope.defaultProps = {
    classCondition: ''
};

export default DailyHoroscope;
