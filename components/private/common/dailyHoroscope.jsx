import React from 'react';
import { removeAccents } from './utils/dailyHoroscopeHelper';
import getAssetsPath from './utils/getAssetsPath';
import Text from './text/index';
import Link from './com-link';
import Image from './com-image';

import '../../../resources/dist/css/ln/components/daily-horoscope.css';

function DailyHoroscope({
    classCondition = '',
    data,
    deployment,
    contextPath
}) {
    const {
        nombre = '',
        periodo = '',
        autor = '',
        detalle = '',
        elementos = {}
    } = data;

    return (
        <article className={`daily-horoscope ${classCondition}`}>
            <header className="daily-horoscope-header">
                <div className="container-svg">
                    <Image
                        src={getAssetsPath(contextPath)(deployment)(
                            `horoscope-logos/${removeAccents(nombre)}.svg`
                        )}
                        alt={nombre}
                        width="100%"
                        height="100%"
                    />
                </div>
                <div>
                    <Text
                        tag="h2"
                        extraClass="title --font-primary"
                        size="--l"
                        weight="--font-medium"
                    >
                        Horóscopo de
                        <strong> {nombre} HOY</strong>
                    </Text>
                    <Text tag="time" extraClass="text periodo" size="--twoxs">
                        {periodo}
                    </Text>
                    {autor && (
                        <Text tag="p" extraClass="text" size="--fourxs">
                            Por{' '}
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <Link
                                link="https://www.lanacion.com.ar/autor/renata-dossi-11743/"
                                title=""
                                classCondition="--author"
                            >
                                {autor}
                            </Link>
                        </Text>
                    )}
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
}

export default DailyHoroscope;
