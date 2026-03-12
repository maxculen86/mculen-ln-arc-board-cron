import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import getAssetsPath from './utils/getAssetsPath';
import Link from './link';
import Text from './text';
import Image from './com-image';
import { formatText } from './utils/sectionUtils';

import '../../../resources/dist/css/ln/components/horoscope-item.css';

function HoroscopeItem({
    classCondition = '',
    periodo = '',
    nombre = 'cancer',
    filenameLogo = 'cancer',
    deployment,
    contextPath,
    chineseYear = ''
}) {
    const baseUrl = `${SITE_LANACION || 'https://www.lanacion.com.ar'}`;

    return (
        <article className={`horoscope-item ${classCondition}`}>
            <Link
                href={
                    nombre === 'Horóscopo Chino'
                        ? `https://www.lanacion.com.ar/horoscopo/horoscopo-chino-${chineseYear}/`
                        : `${baseUrl}/horoscopo/${formatText(nombre)}/`
                }
                title={`Ir al horóscopo de ${nombre}`}
            >
                <div className="container-svg">
                    <Image
                        src={getAssetsPath(contextPath)(deployment)(
                            `horoscope-logos/${formatText(filenameLogo)}.svg`
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
}

export default HoroscopeItem;
